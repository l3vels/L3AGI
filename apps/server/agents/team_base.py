from enum import Enum

class TeamType(Enum):
    DEBATES = 'Debates'
    AUTHORITARIAN_SPEAKER = 'AUTHORITARIAN_SPEAKER'
    PLAN_EXECUTE = 'PLAN_EXECUTE'
    DECENTRALIZED_SPEAKERS = 'DECENTRALIZED_SPEAKERS'

    def __str__(self):
        return self.value