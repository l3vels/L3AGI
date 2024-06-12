class AppBaseException(Exception):
    pass


class AgentException(AppBaseException):
    pass


class AgentNotFoundException(AgentException):
    pass


class ConfigException(AppBaseException):
    pass


class InvalidConfigException(ConfigException):
    pass


class DatasourceException(AppBaseException):
    pass


class DatasourceNotFoundException(DatasourceException):
    pass


class ToolException(AppBaseException):
    pass


class ToolNotFoundException(DatasourceException):
    pass


class ToolEnvKeyException(AppBaseException):
    pass


class ConfigException(AppBaseException):
    pass


class ConfigNotFoundException(DatasourceException):
    pass


class AccountException(AppBaseException):
    pass


class AccountNotFoundException(DatasourceException):
    pass


class UserException(AppBaseException):
    pass


class UserNotFoundException(DatasourceException):
    pass


class RoleException(AppBaseException):
    pass


class RoleNotFoundException(DatasourceException):
    pass


class UserAccountException(AppBaseException):
    pass


class UserAccountNotFoundException(DatasourceException):
    pass


class ProjectException(AppBaseException):
    pass


class AuthenticationException(AppBaseException):
    pass


class ProjectNotFoundException(DatasourceException):
    pass


class TeamException(AppBaseException):
    pass


class TeamNotFoundException(DatasourceException):
    pass


class TeamAgentException(AppBaseException):
    pass


class TeamAgentNotFoundException(DatasourceException):
    pass


class ApiKeyException(AppBaseException):
    pass


class ApiKeyNotFoundException(DatasourceException):
    pass


class InvalidLLMApiKeyException(AppBaseException):
    pass


class PlannerEmptyTasksException(AppBaseException):
    pass


class ChatException(AppBaseException):
    pass


class ChatNotFoundException(DatasourceException):
    pass


class ScheduleException(AppBaseException):
    pass


class ScheduleNotFoundException(DatasourceException):
    pass


class RunNotFoundException(AppBaseException):
    pass


class FineTuningNotFoundException(AppBaseException):
    pass


class TranscriberException(AppBaseException):
    pass


class SynthesizerException(AppBaseException):
    pass


class UserAccessNotFoundException(DatasourceException):
    pass


class TemplateNotFoundException(DatasourceException):
    pass


class UserAccountAccessException(AppBaseException):
    pass
