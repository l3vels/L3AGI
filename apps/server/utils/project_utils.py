from models.project import ProjectModel
from typing import List, Optional
from l3_types.project_types import ProjectResponse, ProjectInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(project_model: ProjectModel) -> ProjectResponse:
    project_data = {}
    
    # Extract attributes from ProjectModel using annotations of Project
    for key in ProjectResponse.__annotations__.keys():
        if hasattr(project_model, key):
            target_type = ProjectResponse.__annotations__.get(key)
            project_data[key] = convert_value_to_type(value=getattr(project_model, key), target_type=target_type)

    return ProjectResponse(**project_data)


def convert_projects_to_project_list(projects: List[ProjectModel]) -> List[ProjectResponse]:
    return [convert_model_to_response(project_model) for project_model in projects]