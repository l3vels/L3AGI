
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.workspace import WorkspaceModel
from typings.workspace import WorkspaceOutput, WorkspaceInput
from utils.auth import authenticate
from typings.workspace import WorkspaceInput
from utils.project import convert_workspaces_to_workspace_list, convert_model_to_response
from exceptions import ProjectNotFoundException

router = APIRouter()

