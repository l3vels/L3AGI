
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.project import ProjectModel
from l3_types.project_types import ProjectResponse, ProjectInput
from utils.auth import authenticate
from l3_types.project_types import ProjectInput
from utils.project_utils import convert_projects_to_project_list, convert_model_to_response
from exceptions import ProjectNotFoundException

router = APIRouter()

