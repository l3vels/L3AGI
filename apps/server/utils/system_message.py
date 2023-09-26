from typing import List, Optional
from typings.agent import AgentWithConfigsOutput
from models.datasource import DatasourceModel
from fastapi_sqlalchemy import db

class SystemMessageBuilder:
    def __init__(self, agent_with_configs: AgentWithConfigsOutput):
        self.agent = agent_with_configs.agent
        self.configs = agent_with_configs.configs

    def build(self) -> str:
        result = ""

        role = self.build_role(self.agent.role)
        description = self.build_description(self.agent.description)
        goals = self.build_goals(self.configs.goals)
        instructions = self.build_instructions(self.configs.instructions)
        constraints = self.build_constraints(self.configs.constraints)
        datasources = self.build_datasources(self.configs.datasources)

        result = f"{role}{description}{goals}{instructions}{constraints}{datasources}"
        return result


    def build_role(self, role: Optional[str]):
        if role is None or role == "":
            return ""
        
        return f"ROLE: {role}\n"
    
    def build_description(self, description: Optional[str]):
        if description is None or description == "":
            return ""
        
        return f"DESCRIPTION: {description}\n"

    def build_goals(self, goals: List[str]):
        if len(goals) == 0:
            return ""
        
        goals = "GOALS: \n" + "\n".join(f"- {goal}" for goal in goals) + "\n"
        return goals
    
    def build_instructions(self, instructions: List[str]):
        if len(instructions) == 0:
            return ""
        
        instructions = "INSTRUCTIONS: \n" + "\n".join(f"- {instruction}" for instruction in instructions) + "\n"
        return instructions
    
    def build_constraints(self, constraints: List[str]):
        if len(constraints) == 0:
            return ""
        
        constraints = "CONSTRAINTS: \n" + "\n".join(f"- {constraint}" for constraint in constraints) + "\n"
        return constraints
    
    def build_datasources(self, datasource_ids: List[str]):
        """Builds the data sources section of the system message."""
        if len(datasource_ids) == 0:
            return ""
        
        datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(datasource_ids)).all()


        result = (
            "Data sources can be: SQL databases and files. You can use tools to get data from them.\n"
            "You can use the following data sources:\n"
        )

        for datasource in datasources:
            result += f"- Datasource Type: {datasource.source_type}, Datasource Name: {datasource.name}, Useful for: {datasource.description}, Datasource Id for tool: {datasource.id}  \n"
        
        result += "\n"

        return result
