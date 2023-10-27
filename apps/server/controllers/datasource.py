from concurrent.futures import ThreadPoolExecutor
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from sqlalchemy import MetaData, create_engine, text

from datasources.base import DatasourceType
from datasources.get_datasources import get_all_datasources
from exceptions import DatasourceNotFoundException
from models.config import ConfigModel
from models.datasource import DatasourceModel
from typings.auth import UserAccount
from typings.config import ConfigQueryParams
from typings.datasource import (DatasourceInput, DatasourceOutput,
                                DatasourceSQLTableOutput)
from utils.auth import authenticate
from utils.datasource import (convert_datasources_to_datasource_list,
                              convert_model_to_response)

router = APIRouter()


@router.post("", status_code=201, response_model=DatasourceOutput)
def create_datasource(
    datasource: DatasourceInput, auth: UserAccount = Depends(authenticate)
) -> DatasourceOutput:
    """
    Create a new datasource with configurations.

    Args:
        datasource (DatasourceInput): Data for creating a new datasource with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        DatasourceOutput: Created datasource object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_datasource = DatasourceModel.create_datasource(
        db, datasource=datasource, user=auth.user, account=auth.account
    )
    return convert_model_to_response(
        DatasourceModel.get_datasource_by_id(db.session, db_datasource.id, auth.account)
    )


@router.put(
    "/{id}", status_code=200, response_model=DatasourceOutput
)  # Changed status code to 200
def update_datasource(
    id: str, datasource: DatasourceInput, auth: UserAccount = Depends(authenticate)
) -> DatasourceOutput:
    """
    Update an existing datasource with configurations.

    Args:
        id (str): ID of the datasource to update.
        datasource (DatasourceInput): Data for updating the datasource with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        DatasourceOutput: Updated datasource object.
    """
    try:
        db_datasource = DatasourceModel.update_datasource(
            db, id=id, datasource=datasource, user=auth.user, account=auth.account
        )
        return convert_model_to_response(
            DatasourceModel.get_datasource_by_id(
                db.session, db_datasource.id, auth.account
            )
        )

    except DatasourceNotFoundException:
        raise HTTPException(status_code=404, detail="Datasource not found")


@router.get("/data-loaders", response_model=List[object])
def get_data_loaders(auth: UserAccount = Depends(authenticate)) -> List[object]:
    """
    Get all tools by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[Object]: List of tools associated with the account.
    """

    return get_all_datasources()


@router.get("", response_model=List[DatasourceOutput])
def get_datasources(
    auth: UserAccount = Depends(authenticate),
) -> List[DatasourceOutput]:
    """
    Get all datasources by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[DatasourceOutput]: List of datasources associated with the account.
    """
    db_datasources = DatasourceModel.get_datasources(db=db, account=auth.account)
    return convert_datasources_to_datasource_list(db_datasources)


@router.get("/sql/tables", response_model=List[DatasourceSQLTableOutput])
def get_sql_tables(
    source_type: Optional[str] = None,
    host: Optional[str] = None,
    port: Optional[int] = None,
    user: Optional[str] = None,
    password: Optional[str] = None,
    name: Optional[str] = None,
    id: Optional[str] = None,
    auth: UserAccount = Depends(authenticate),
):
    """
    Get all SQL database table names and counts for a datasource by its ID or by provided credentials.
    """

    if id:
        datasource = DatasourceModel.get_datasource_by_id(
            db.session, datasource_id=id, account=auth.account
        )

        if not datasource or datasource.is_deleted:
            raise HTTPException(
                status_code=404, detail="Datasource not found"
            )  # Ensure consistent case in error messages

        configs = ConfigModel.get_configs(
            db, ConfigQueryParams(datasource_id=id), account=auth.account
        )

        config = {}

        for cfg in configs:
            config[cfg.key] = cfg.value

        user = config.get("user")
        password = config.get("pass")
        host = config.get("host")
        port = config.get("port")
        name = config.get("name")

        source_type = datasource.source_type
    else:
        if not all([source_type, host, port, user, password, name]):
            raise HTTPException(
                status_code=400,
                detail="All parameters must be provided when id is not given",
            )

    if source_type == DatasourceType.POSTGRES.value:
        prefix = "postgresql+psycopg2"
    elif source_type == DatasourceType.MYSQL.value:
        prefix = "mysql+pymysql"
    else:
        raise HTTPException(status_code=400, detail="Invalid source_type")

    uri = f"{prefix}://{user}:{password}@{host}:{port}/{name}"

    engine = create_engine(uri)
    meta = MetaData()
    meta.reflect(bind=engine)

    tables = meta.tables.keys()
    result = []

    def get_table_count(table):
        with engine.connect() as conn:
            count = conn.execute(text(f"SELECT COUNT(*) FROM {table}")).scalar()
            return {
                "id": table,
                "name": table,
                "count": count,
            }

    with ThreadPoolExecutor() as executor:
        result = list(executor.map(get_table_count, tables))

    return result


@router.get("/{id}", response_model=DatasourceOutput)
def get_datasource_by_id(
    id: str, auth: UserAccount = Depends(authenticate)
) -> DatasourceOutput:
    """
    Get a datasource by its ID.

    Args:
        id (str): ID of the datasource.
        auth (UserAccount): Authenticated user account.

    Returns:
        DatasourceOutput: Datasource associated with the given ID.
    """
    db_datasource = DatasourceModel.get_datasource_by_id(
        db.session, datasource_id=id, account=auth.account
    )

    if not db_datasource or db_datasource.is_deleted:
        raise HTTPException(
            status_code=404, detail="Datasource not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_datasource)


@router.delete("/{datasource_id}", status_code=200)  # Changed status code to 204
def delete_datasource(datasource_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a datasource by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        datasource_id (str): ID of the datasource to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        DatasourceModel.delete_by_id(
            db, datasource_id=datasource_id, account=auth.account
        )
        return {"message": "Datasource deleted successfully"}

    except DatasourceNotFoundException:
        raise HTTPException(status_code=404, detail="Datasource not found")
