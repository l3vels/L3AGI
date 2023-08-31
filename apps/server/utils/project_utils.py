from models.project import ProjectModel
from typing import List, Optional
from typings.project_types import ProjectOutput, ProjectInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(project_model: ProjectModel) -> ProjectOutput:
    project_data = {}
    
    # Extract attributes from ProjectModel using annotations of Project
    for key in ProjectOutput.__annotations__.keys():
        if hasattr(project_model, key):
            target_type = ProjectOutput.__annotations__.get(key)
            project_data[key] = convert_value_to_type(value=getattr(project_model, key), target_type=target_type)

    return ProjectOutput(**project_data)


def convert_projects_to_project_list(projects: List[ProjectModel]) -> List[ProjectOutput]:
    return [convert_model_to_response(project_model) for project_model in projects]