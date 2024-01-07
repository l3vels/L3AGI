import json
from typing import List
from uuid import UUID

import sentry_sdk
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from fastapi_sqlalchemy import db

from datasources.base import DatasourceEnvKeyType
from datasources.file.file_retriever import FileDatasourceRetriever
from exceptions import ConfigNotFoundException
from models.config import ConfigModel
from models.datasource import DatasourceModel
from typings.account import AccountOutput
from typings.auth import UserAccount
from typings.config import ConfigInput, ConfigOutput, ConfigQueryParams
from typings.datasource import DatasourceStatus
from utils.auth import authenticate, authenticate_by_any
from utils.configuration import (convert_configs_to_config_list,
                                 convert_model_to_response)

router = APIRouter()


# TODO: refactor update method in models to be flexible.
def index_documents(value: str, datasource_id: UUID, account: AccountOutput):
    from models.db import create_session

    session = create_session()

    settings = ConfigModel.get_account_settings(session, account.id)
    datasource = DatasourceModel.get_datasource_by_id(session, datasource_id, account)

    try:
        value = json.loads(value)
        files = value["files"]
        index_type = value["index_type"]
        response_mode = value["response_mode"]
        vector_store = value["vector_store"]
        chunk_size = value["chunk_size"]
        similarity_top_k = value["similarity_top_k"]

        file_urls = [file["url"] for file in files]
        retriever = FileDatasourceRetriever(
            settings,
            index_type,
            response_mode,
            vector_store,
            str(account.id),
            str(
                account.id
            ),  # data source account id. used to read template data source account id
            str(datasource_id),
            None,
            chunk_size,
            similarity_top_k,
        )
        retriever.index_documents(file_urls)

        datasource.status = DatasourceStatus.READY.value
        datasource.error = None
    except Exception as err:
        print(err)
        sentry_sdk.capture_exception(err)
        datasource.status = DatasourceStatus.FAILED.value
        datasource.error = str(err)

    session.add(datasource)
    session.commit()


@router.post("", status_code=201, response_model=ConfigOutput)
async def create_config(
    config: ConfigInput,
    background_tasks: BackgroundTasks,
    auth: UserAccount = Depends(authenticate),
) -> ConfigOutput:
    """
    Create a new config with configurations.

    Args:
        config (ConfigInput): Data for creating a new config with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ConfigOutput: Created config object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_config = ConfigModel.create_config(
        db, config=config, user=auth.user, account=auth.account
    )

    # Save index to storage
    if config.datasource_id and config.key_type == DatasourceEnvKeyType.FILES.value:
        background_tasks.add_task(
            index_documents, config.value, config.datasource_id, auth.account
        )

    return convert_model_to_response(
        ConfigModel.get_config_by_id(db, db_config.id, auth.account)
    )


@router.put(
    "/{id}", status_code=200, response_model=ConfigOutput
)  # Changed status code to 200
def update_config(
    id: str,
    config: ConfigInput,
    background_tasks: BackgroundTasks,
    auth: UserAccount = Depends(authenticate),
) -> ConfigOutput:
    """
    Update an existing config with configurations.

    Args:
        id (str): ID of the config to update.
        config (ConfigInput): Data for updating the config with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ConfigOutput: Updated config object.
    """
    try:
        db_config = ConfigModel.update_config(
            db, id=id, config=config, user=auth.user, account=auth.account
        )

        # Save index to storage
        if config.datasource_id and config.key_type == DatasourceEnvKeyType.FILES.value:
            background_tasks.add_task(
                index_documents, config.value, config.datasource_id, auth.account
            )

        return convert_model_to_response(
            ConfigModel.get_config_by_id(db, db_config.id, auth.account)
        )
    except ConfigNotFoundException:
        raise HTTPException(status_code=404, detail="Config not found")


@router.get("", response_model=List[ConfigOutput])
def get_configs(
    auth: UserAccount = Depends(authenticate_by_any),
    params: ConfigQueryParams = Depends(),
) -> List[ConfigOutput]:
    """
    Get all configs by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ConfigOutput]: List of configs associated with the account.
    """
    # print(params)
    db_configs = ConfigModel.get_configs(db=db, query=params, account=auth.account)
    return convert_configs_to_config_list(db_configs)


@router.get("/{id}", response_model=ConfigOutput)
def get_config_by_id(
    id: str, auth: UserAccount = Depends(authenticate)
) -> ConfigOutput:
    """
    Get a config by its ID.

    Args:
        id (str): ID of the config.
        auth (UserAccount): Authenticated user account.

    Returns:
        ConfigOutput: Config associated with the given ID.
    """
    db_config = ConfigModel.get_config_by_id(db, config_id=id, account=auth.account)

    if not db_config or db_config.is_deleted:
        raise HTTPException(
            status_code=404, detail="Config not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_config)


@router.delete("/{config_id}", status_code=200)  # Changed status code to 204
def delete_config(config_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a config by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        config_id (str): ID of the config to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        ConfigModel.delete_by_id(db, config_id=config_id, account=auth.account)
        return {"message": "Config deleted successfully"}

    except ConfigNotFoundException:
        raise HTTPException(status_code=404, detail="Config not found")
