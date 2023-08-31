
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.project import ProjectModel
from typings.project_types import ProjectOutput, ProjectInput
from utils.auth import authenticate
from typings.project_types import ProjectInput
from utils.project_utils import convert_projects_to_project_list, convert_model_to_response
from exceptions import ProjectNotFoundException

router = APIRouter()

