from models.user import UserModel
from typing import List
from typings.user import UserOutput
from utils.type import convert_value_to_type


def convert_model_to_response(user_model: UserModel) -> UserOutput:
    user_data = {}

    # Extract attributes from UserModel using annotations of User
    for key in UserOutput.__annotations__.keys():
        if hasattr(user_model, key):
            target_type = UserOutput.__annotations__.get(key)
            user_data[key] = convert_value_to_type(
                value=getattr(user_model, key), target_type=target_type
            )

    return UserOutput(**user_data)


def convert_users_to_user_list(users: List[UserModel]) -> List[UserOutput]:
    return [convert_model_to_response(user_model) for user_model in users]
