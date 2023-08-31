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

class AccountException(AppBaseException):
    pass

class AccountNotFoundException(DatasourceException):
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