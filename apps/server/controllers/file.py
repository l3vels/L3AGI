from fastapi import APIRouter, Depends
from uuid import uuid4
from services.aws_s3 import AWSS3Service
from utils.auth import authenticate
from typings.auth import UserAccount
from typings.file import FileInput

router = APIRouter()


@router.post("", status_code=201)
def generate_presigned_url(file: FileInput, auth: UserAccount = Depends(authenticate)):
    """Generate presigned url for frontend to upload file to S3."""

    name, ext = file.name.rsplit(".", 1)
    key = f"account_{auth.account.id}/files/{name}-{uuid4()}.{ext}"

    signed_url = AWSS3Service.generate_presigned_url(key=key, content_type=file.type)
    public_url = AWSS3Service.get_public_url(key)

    return {
        "signed_url": signed_url,
        "file_url": public_url,
    }
