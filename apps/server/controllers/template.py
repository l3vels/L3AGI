from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.template import TemplateModel
from typings.template import (
    TemplateOutput,
    TemplateInput,
    CreateTemplateOutput
)

router = APIRouter()


@router.get(
    "",
    response_model=list[TemplateOutput],
    status_code=200
)
def get_templates(auth: UserAccount = Depends(authenticate)):
    try:
        data = TemplateModel.get_templates(
            db=db,
            account=auth.account
        )

        data_to_list = [TemplateOutput.from_orm(template) for template in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post(
    "",
    response_model=CreateTemplateOutput,
    status_code=201
)
def create_template(
        input: TemplateInput,
        auth: UserAccount = Depends(authenticate)):
    try:
        pod = TemplateModel.create_template(
            db=db,
            template=input,
            user=auth.user,
            account=auth.account
        )

        if not pod:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Pod not created"
            )

        return {
                "success": True,
                "message": "Template created successfully"
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
