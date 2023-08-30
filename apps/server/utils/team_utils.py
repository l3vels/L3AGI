from models.user import UserModel
from typing import List, Optional
from l3_types.user_types import UserResponse, UserInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(user_model: UserModel) -> UserResponse:
    user_data = {}
    
    # Extract attributes from UserModel using annotations of User
    for key in UserResponse.__annotations__.keys():
        if hasattr(user_model, key):
            target_type = UserResponse.__annotations__.get(key)
            user_data[key] = convert_value_to_type(value=getattr(user_model, key), target_type=target_type)

    return UserResponse(**user_data)


def convert_users_to_user_list(users: List[UserModel]) -> List[UserResponse]:
    return [convert_model_to_response(user_model) for user_model in users]