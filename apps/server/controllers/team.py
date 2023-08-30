
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.team import TeamModel
from models.team_agent import TeamAgentModel
from l3_types.user_types import UserResponse, UserInput
from utils.auth import authenticate
from l3_types.user_types import UserInput
from utils.user_utils import convert_users_to_user_list, convert_model_to_response
from exceptions import UserNotFoundException

router = APIRouter()

