from typing import List, Optional

from fastapi_sqlalchemy import db

from models.datasource import DatasourceModel
from typings.agent import AgentWithConfigsOutput


class SystemMessageBuilder:
    def __init__(self, agent_with_configs: AgentWithConfigsOutput):
        self.agent = agent_with_configs.agent
        self.configs = agent_with_configs.configs

    def build(self) -> str:
        base_system_message = self.build_base_system_message(self.configs.text)
        role = self.build_role(self.agent.role)
        description = self.build_description(self.agent.description)
        goals = self.build_goals(self.configs.goals)
        instructions = self.build_instructions(self.configs.instructions)
        constraints = self.build_constraints(self.configs.constraints)
        data_sources = self.build_data_sources(self.configs.datasources)

        result = f"{base_system_message}{role}{description}{goals}{instructions}{constraints}{data_sources}"
        return result

    def build_base_system_message(self, text: str) -> str:
        if text is None or text == "":
            return ""

        return f"{text}\n"

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

        instructions = (
            "INSTRUCTIONS: \n"
            + "\n".join(f"- {instruction}" for instruction in instructions)
            + "\n"
        )
        return instructions

    def build_constraints(self, constraints: List[str]):
        if len(constraints) == 0:
            return ""

        constraints = (
            "CONSTRAINTS: \n"
            + "\n".join(f"- {constraint}" for constraint in constraints)
            + "\n"
        )
        return constraints

    def build_data_sources(self, datasource_ids: List[str]):
        """Builds the data sources section of the system message."""
        if len(datasource_ids) == 0:
            return ""

        data_sources = (
            db.session.query(DatasourceModel)
            .filter(DatasourceModel.id.in_(datasource_ids))
            .all()
        )

        result = (
            "DATASOURCES:"
            "Data sources can be: SQL databases and files. You can use tools to get data from them.\n"
            "You can use the following data sources:\n"
        )

        for data_source in data_sources:
            result += f"- Data source Type: {data_source.source_type}, Data source Name: {data_source.name}, Useful for: {data_source.description}, Data source Id for tool: {data_source.id}  \n"

        result += "\n"

        return result
