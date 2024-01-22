import re
from typing import List, Optional

from fastapi_sqlalchemy import db

from models.account import AccountModel
from models.agent import AgentModel
from tools.get_tools import get_tool_by_slug
from typings.agent import AgentWithConfigsOutput
from utils.agent import convert_model_to_response


class SystemMessageBuilder:
    def __init__(
        self,
        agent_with_configs: AgentWithConfigsOutput,
        pre_retrieved_context: Optional[str] = "",
    ):
        self.agent = agent_with_configs.agent
        self.configs = agent_with_configs.configs
        self.data_source_pre_retrieval = False
        self.pre_retrieved_context = pre_retrieved_context
        self.agent_with_configs = agent_with_configs

    def build(self) -> str:
        base_system_message = self.build_base_system_message(self.configs.text)
        role = self.build_role(self.agent.role)
        description = self.build_description(self.agent.description)
        goals = self.build_goals(self.configs.goals)
        instructions = self.build_instructions(self.configs.instructions)
        constraints = self.build_constraints(self.configs.constraints)
        context = self.build_pre_retrieved_context(self.pre_retrieved_context)

        account = AccountModel.get_account_by_id(db, self.agent.account_id)

        result = f"{base_system_message}{role}{description}{goals}{instructions}{constraints}{context}"
        result = self.replace_templates(result, account)
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

    def build_pre_retrieved_context(self, text: str):
        if text is None or text == "":
            return ""

        result = "CONTEXT DATA: \n" f"{text}\n"

        return result

    def replace_templates(self, text: str, account: AccountModel) -> str:
        # This pattern will match strings like {{agent.sales.greeting}}, {{greeting}} and {{tools.cal.calendarAvailabilities}}
        pattern = re.compile(
            r"\{\{(agents\.(?P<agent_name>[\w\s]+?)|tools\.(?P<tool_name>[\w\s]+?))\.(?P<field_name>\w+)(\[(?P<index>\d+)\])?\}\}"
        )

        agent_mapping = {}
        tool_mapping = {}

        def replace_match(match):
            agent_name = match.group("agent_name")
            field_name = match.group("field_name")
            tool_name = match.group("tool_name")
            index = match.group("index")

            if tool_name:
                tool = tool_mapping.get(field_name)
                if not tool:
                    tool = get_tool_by_slug(
                        tool_name, field_name, db, account, self.agent_with_configs
                    )
                    tool_mapping[field_name] = tool

                try:
                    result = tool._run(field_name)
                    return result
                except Exception as e:
                    return str(e)

            if agent_name:
                agent = agent_mapping.get(agent_name, None)
                if not agent:
                    # Retrieve the agent if not already retrieved
                    agent = AgentModel.get_agent_by_name(
                        db.session, self.agent.account_id, agent_name
                    )

                    agent_mapping[agent_name] = agent

                agent_with_configs = convert_model_to_response(agent)
                agent_with_configs.system_message = SystemMessageBuilder(
                    agent_with_configs
                ).build()

                source_data = None

                if hasattr(agent_with_configs.agent, field_name):
                    source_data = agent_with_configs.agent
                elif hasattr(agent_with_configs.configs, field_name):
                    source_data = agent_with_configs.configs
                else:
                    source_data = agent_with_configs
            else:
                # Use current agent if no agent name is provided
                source_data = (
                    self.agent if hasattr(self.agent, field_name) else self.configs
                )

            if not source_data:
                return match.group(
                    0
                )  # Return the original text if agent or property not found

            # Retrieve the field value
            value = getattr(source_data, field_name, "")
            if index and isinstance(value, list):
                try:
                    value = value[int(index)]
                except IndexError:
                    value = ""
            elif isinstance(value, list):
                # Format the list for display
                value = f"{field_name.upper()}: \n" + "\n".join(
                    f"- {item}" for item in value
                )

            return str(value)

        return pattern.sub(replace_match, text)
