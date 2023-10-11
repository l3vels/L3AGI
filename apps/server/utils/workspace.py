from models.workspace import WorkspaceModel
from typing import List
from typings.workspace import WorkspaceOutput
from utils.type import convert_value_to_type


def convert_model_to_response(project_model: WorkspaceModel) -> WorkspaceOutput:
    project_data = {}

    # Extract attributes from WorkspaceModel using annotations of Project
    for key in WorkspaceOutput.__annotations__.keys():
        if hasattr(project_model, key):
            target_type = WorkspaceOutput.__annotations__.get(key)
            project_data[key] = convert_value_to_type(
                value=getattr(project_model, key), target_type=target_type
            )

    return WorkspaceOutput(**project_data)


def convert_workspaces_to_workspace_list(
    projects: List[WorkspaceModel],
) -> List[WorkspaceOutput]:
    return [convert_model_to_response(project_model) for project_model in projects]
