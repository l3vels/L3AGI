from __future__ import annotations

import re
from typing import TYPE_CHECKING, Dict, List, Optional

from langchain.schema.messages import (AIMessage, BaseMessage, HumanMessage,
                                       SystemMessage)
from langchain_community.chat_message_histories import \
    ZepChatMessageHistory as ZepChatMessageHistoryBase

if TYPE_CHECKING:
    from zep_python import Memory, Message


class ZepChatMessageHistory(ZepChatMessageHistoryBase):
    """Extends Zep chat message history to add author name to metadata for OpenAI"""

    @property
    def messages(self) -> List[BaseMessage]:
        """Retrieve messages from Zep memory"""

        zep_memory: Optional[Memory] = self._get_memory()
        if not zep_memory:
            return []

        messages: List[BaseMessage] = []
        # Extract summary, if present, and messages
        if zep_memory.summary:
            if len(zep_memory.summary.content) > 0:
                messages.append(SystemMessage(content=zep_memory.summary.content))
        if zep_memory.messages:
            msg: Message

            for msg in zep_memory.messages:
                author: str = msg.metadata.get("author")

                metadata: Dict = {
                    "uuid": msg.uuid,
                    "created_at": msg.created_at,
                    "token_count": msg.token_count,
                    "metadata": msg.metadata,
                    "name": re.sub(r"[^a-zA-Z0-9_-]", "", author)[
                        :64
                    ],  # add author for OpenAI chat completions in "name" field
                }
                if msg.role == "ai":
                    messages.append(
                        AIMessage(content=msg.content, additional_kwargs=metadata)
                    )
                else:
                    messages.append(
                        HumanMessage(content=msg.content, additional_kwargs=metadata)
                    )

        return messages
