import sentry_sdk
import strawberry
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi_sqlalchemy import DBSessionMiddleware
from strawberry.fastapi import GraphQLRouter

from config import Config
from controllers.agent import router as agent_router
from controllers.api_key import router as api_key_router
from controllers.auth import router as user_router
from controllers.chat import router as chat_router
from controllers.configuration import router as config_router
from controllers.datasource import router as datasource_router
from controllers.file import router as file_router
from controllers.fine_tuning import router as fine_tuning_router
from controllers.integrations import router as integrations_router
from controllers.llm import router as llm_router
from controllers.model import router as model_router
from controllers.run import router as run_router
from controllers.schedule import router as schedule_router
from controllers.team import router as team_router
from controllers.team_agent import router as team_agent_router
from controllers.tool import router as tool_router
from controllers.voice import router as voice_router
from controllers.workspace import router as workspace_router
from models import *  # noqa: F403
from models.db import Base, engine  # noqa: F401
from resolvers.account import AccountMutation, AccountQuery
from resolvers.context import get_context
from resolvers.user import UserMutation, UserQuery
from typings.auth import AuthJWTSettings

app = FastAPI()


@strawberry.type
class Query(AccountQuery, UserQuery):
    pass


@strawberry.type
class Mutation(AccountMutation, UserMutation):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
app.include_router(graphql_app, prefix="/graphql")

if Config.ENV != "local" and Config.SENTRY_DSN:
    sentry_sdk.init(
        dsn=Config.SENTRY_DSN,
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production,
        traces_sample_rate=1.0,
    )


app.add_middleware(DBSessionMiddleware, db_url=Config.DB_URI)

# Base.metadata.create_all(bind=engine)


# origins = [
#     "http://localhost:3000",
#     "http://localhost:4000",
#     "http://localhost:7000",
#     "https://l3vels.xyz",
#     'https://.*\.l3agi\.com',
#     "https://l3agi.com",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https://l3vels\.xyz|https://.*\.l3vels\.xyz|https://l3agi\.com|https://.*\.l3agi\.com|http://localhost:[0-9]+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@AuthJWT.load_config
def get_config():
    return AuthJWTSettings()


# exception handler for authjwt
# in production, you can tweak performance using orjson response
@app.exception_handler(AuthJWTException)
def jwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})


app.include_router(user_router, prefix="/auth")
app.include_router(workspace_router, prefix="/workspace")
app.include_router(team_router, prefix="/team")
app.include_router(team_agent_router, prefix="/team-of-agents")
app.include_router(agent_router, prefix="/agent")
app.include_router(config_router, prefix="/config")
app.include_router(datasource_router, prefix="/datasource")
app.include_router(run_router, prefix="/run")
app.include_router(tool_router, prefix="/tool")
app.include_router(llm_router, prefix="/llm")
app.include_router(chat_router, prefix="/chat")
app.include_router(file_router, prefix="/file")
app.include_router(model_router, prefix="/model")
app.include_router(schedule_router, prefix="/schedule")
app.include_router(api_key_router, prefix="/api-key")
app.include_router(integrations_router, prefix="/integrations")
app.include_router(fine_tuning_router, prefix="/fine-tuning")
app.include_router(voice_router, prefix="/voice")


@app.get("/")
def root():
    return f"Server is running on {Config.ENV} environment"


print("Server is running on 4000 port")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)
