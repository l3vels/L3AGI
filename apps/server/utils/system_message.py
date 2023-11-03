from typing import List, Optional

from typings.agent import AgentWithConfigsOutput


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

    def build(self) -> str:
        base_system_message = self.build_base_system_message(self.configs.text)
        role = self.build_role(self.agent.role)
        description = self.build_description(self.agent.description)
        goals = self.build_goals(self.configs.goals)
        instructions = self.build_instructions(self.configs.instructions)
        constraints = self.build_constraints(self.configs.constraints)
        context = self.build_pre_retrieved_context(self.pre_retrieved_context)

        result = f"{base_system_message}{role}{description}{goals}{instructions}{constraints}{context}"
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
