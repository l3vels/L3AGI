from typing import Any, Optional
from uuid import UUID

from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema.agent import AgentAction, AgentFinish
from sqlalchemy.orm import Session

from models.run_log import RunLogModel
from typings.run import RunLogInput, RunLogType, UpdateRunLogInput


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
        input: Optional[str] = None,
        name: Optional[str] = None,
        output: Optional[str] = None,
        error: Optional[str] = None,
    ):
        return RunLogModel.create_run_log(
            self.session,
            RunLogInput(
                run_id=self.run_id,
                agent_id=self.agent_id,
                team_id=self.team_id,
                chat_id=self.chat_id,
                name=name,
                input=input,
                output=output,
                error=error,
                type=str(type),
            ),
            self.user_id,
            self.account_id,
        )

    def create_system_run_log(self, input: str):
        return self.create_run_log(type=RunLogType.SYSTEM, input=input)

    def create_tool_run_log(self, input: str, tool_name: str):
        return self.create_run_log(type=RunLogType.TOOL, name=tool_name, input=input)

    def create_final_answer_run_log(self, input: str):
        return self.create_run_log(type=RunLogType.ANSWER, output=input)

    def update_run_log(
        self,
        output: Optional[str] = None,
        error: Optional[str] = None,
    ):
        return RunLogModel.update_latest_run_log(
            self.session,
            self.run_id,
            UpdateRunLogInput(error=error, output=output),
            self.user_id,
        )


class AgentCallbackHandler(BaseCallbackHandler):
    run_logs_manager: RunLogsManager

    def on_llm_new_token(self, token: str, **kwargs) -> None:
        print(f"My custom handler, token: {token}")

    def on_agent_action(
        self,
        action: AgentAction,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.create_tool_run_log(
            input=action.tool_input, tool_name=action.tool
        )

    def on_agent_finish(
        self,
        finish: AgentFinish,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.create_final_answer_run_log(
            input=finish.return_values["output"]
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
        self.run_logs_manager.update_run_log(None, str(error))

    def on_tool_end(
        self,
        output: str,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        self.run_logs_manager.update_run_log(output, None)
