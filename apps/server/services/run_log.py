from typing import Any, Dict, List, Optional
from uuid import UUID

from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema.agent import AgentAction, AgentFinish
from langchain_core.messages import BaseMessage
from sqlalchemy.orm import Session

from models.run_log import RunLogModel
from tools.get_tools import get_toolkit_id_by_tool_name
from typings.run import RunLogInput, RunLogType


class RunLogsManager:
    def __init__(
        self,
        session: Session,
        run_id: UUID,
        user_id: UUID,
        account_id: UUID,
        agent_id: Optional[UUID],
        team_id: Optional[UUID],
        chat_id: Optional[UUID],
        session_id: Optional[str],
    ):
        self.session = session
        self.run_id = run_id
        self.user_id = user_id
        self.account_id = account_id
        self.agent_id = agent_id
        self.team_id = team_id
        self.chat_id = chat_id
        self.session_id = session_id

    def get_agent_callback_handler(self) -> BaseCallbackHandler:
        callback_handler = AgentCallbackHandler()
        callback_handler.run_logs_manager = self
        return callback_handler

    def get_tool_callback_handler(self) -> BaseCallbackHandler:
        callback_handler = ToolCallbackHandler()
        callback_handler.run_logs_manager = self
        return callback_handler

    def create_run_log(
        self,
        type: RunLogType,
        name: Optional[str] = "",
        messages: Optional[Dict] = [],
        toolkit_id: Optional[UUID] = None,
    ):
        return RunLogModel.create_run_log(
            self.session,
            RunLogInput(
                run_id=self.run_id,
                agent_id=self.agent_id,
                team_id=self.team_id,
                chat_id=self.chat_id,
                name=name,
                type=str(type),
                messages=messages,
                toolkit_id=toolkit_id,
            ),
            self.user_id,
            self.account_id,
        )

    def create_llm_run_log(self, messages: List[BaseMessage]):
        message_mapping = {
            "system": "System",
            "human": "Human",
            "ai": "AI",
        }

        messages = [
            {
                "name": message_mapping[message.type],
                "content": message.content,
                "additional_kwargs": message.additional_kwargs,
                "is_chat_history": message.additional_kwargs.get("uuid") is not None,
            }
            for message in messages
        ]

        return self.create_run_log(
            type=RunLogType.LLM, name=RunLogType.LLM, messages=messages
        )

    def create_tool_run_log(self, name: str, input: str):
        messages = [
            {
                "name": name,
                "content": input,
            }
        ]

        toolkit_id = get_toolkit_id_by_tool_name(name)

        return self.create_run_log(
            type=RunLogType.TOOL,
            name=name,
            messages=messages,
            toolkit_id=UUID(toolkit_id),
        )

    def add_message_to_run_log(self, type: RunLogType, name: str, content: str):
        return RunLogModel.add_message_to_latest_run_log(
            self.session,
            self.run_id,
            type,
            {
                "name": name,
                "content": content,
            },
            self.user_id,
        )


class AgentCallbackHandler(BaseCallbackHandler):
    run_logs_manager: RunLogsManager

    def on_chat_model_start(
        self,
        serialized: Dict[str, Any],
        messages: List[List[BaseMessage]],
        **kwargs: Any,
    ) -> Any:
        """Run when Chat Model starts running."""
        self.run_logs_manager.create_llm_run_log(messages[0])

    def on_agent_action(
        self,
        action: AgentAction,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.add_message_to_run_log(
            type=RunLogType.LLM,
            name="AI",
            content=action.log,
        )

        self.run_logs_manager.create_tool_run_log(
            name=action.tool, input=action.tool_input
        )

    def on_agent_finish(
        self,
        finish: AgentFinish,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.add_message_to_run_log(
            type=RunLogType.LLM,
            name="AI",
            content=finish.log,
        )


class ToolCallbackHandler(BaseCallbackHandler):
    run_logs_manager: RunLogsManager
    run_id: UUID

    def on_tool_error(
        self,
        error: BaseException,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.add_message_to_run_log(
            type=RunLogType.TOOL,
            name="Error",
            content=str(error),
        )

    def on_tool_end(
        self,
        output: str,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.add_message_to_run_log(
            type=RunLogType.TOOL,
            name="Output",
            content=output,
        )
