from pydantic import BaseModel


class FileInput(BaseModel):
    name: str
    type: str
    size: int
