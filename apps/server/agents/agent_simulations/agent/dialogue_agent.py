from typing import Callable, List
from uuid import UUID

from langchain.schema import HumanMessage, SystemMessage
from langchain_community.chat_models import ChatOpenAI

from agents.handle_agent_errors import handle_agent_error
from typings.agent import AgentWithConfigsOutput


class DialogueAgent:
    def __init__(
        self,
        name: str,
        agent_with_configs: AgentWithConfigsOutput,
        system_message: SystemMessage,
        model: ChatOpenAI,
    ) -> None:
        self.name = name
        self.agent_with_configs = agent_with_configs
        self.system_message = system_message
        self.model = model
        self.prefix = f"{self.name}: "
        self.reset()

    def reset(self):
        # todo Need send history of chat @mirian
        self.message_history = ["Here is the conversation so far."]

    def send(self) -> str:
        """
        Applies the chatmodel to the message history
        and returns the message string
        """
        message = self.model(
            [
                self.system_message,
                HumanMessage(content="\n".join(self.message_history + [self.prefix])),
            ]
        )
        return message.content

    def receive(self, name: str, message: str) -> None:
        """
        Concatenates {message} spoken by {name} into message history
        """
        self.message_history.append(f"{name}: {message}")


class DialogueSimulator:
    def __init__(
        self,
        agents: List[DialogueAgent],
        selection_function: Callable[[int, List[DialogueAgent]], int],
        is_memory: bool,
    ) -> None:
        self.agents = agents
        self._step = 0
        self.select_next_speaker = selection_function
        self.is_memory = is_memory

    def reset(self):
        for agent in self.agents:
            agent.reset()

    def inject(self, name: str, message: str):
        """
        Initiates the conversation with a {message} from {name}
        """
        for agent in self.agents:
            agent.receive(name, message)

        # increment time
        self._step += 1

    def step(self) -> tuple[UUID, str, str]:
        message: str

        # 1. choose next speaker
        speaker_idx = self.select_next_speaker(self._step, self.agents)
        speaker = self.agents[speaker_idx]

        try:
            # 2. next speaker sends message
            message = speaker.send()

            # 3. everyone receives message
            # For short memory
            if not self.is_memory:
                for receiver in self.agents:
                    receiver.receive(speaker.name, message)

            # 4. increment time
            self._step += 1
        except Exception as err:
            message = handle_agent_error(err)
            self._step += 1

        return (
            speaker.agent_with_configs.agent.id,
            speaker.agent_with_configs.agent.name,
            message,
        )
