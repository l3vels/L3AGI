from enum import Enum


class TeamOfAgentsType(Enum):
    DEBATES = "Debates"
    AUTHORITARIAN_SPEAKER = "Authoritarian Speaker"
    PLAN_AND_EXECUTE = "Plan and Execute"
    DECENTRALIZED_SPEAKERS = "Decentralized Speakers"

    def __str__(self):
        return self.value
