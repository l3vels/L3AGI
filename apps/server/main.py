from dotenv import load_dotenv

load_dotenv(override=False)

import uvicorn
import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.responses import JSONResponse
from typings.auth import AuthJWTSettings
from config import Config
from models.db import Base, engine


from controllers.auth import router as user_router
from controllers.project import router as project_router
from controllers.team import router as team_router
from controllers.team_agent import router as team_agent_router

from controllers.agent import router as agent_router
from controllers.configuration import router as config_router
from controllers.datasource import router as datasource_router
from controllers.tool import router as tool_router
from controllers.llm import router as llm_router
from resolvers.account import AccountQuery, AccountMutation
from resolvers.user import UserQuery, UserMutation
from controllers.chat import router as chat_router
from strawberry.fastapi import BaseContext, GraphQLRouter
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from strawberry.fastapi import GraphQLRouter
from functools import cached_property
from typings.user import User
import strawberry
from resolvers.context import get_context

VERSION = "0.3.1"

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


if Config.NODE_ENV != "local":
    sentry_sdk.init(
        dsn=Config.SENTRY_DSN,
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production,
        traces_sample_rate=1.0,
    )


app.add_middleware(DBSessionMiddleware, db_url=Config.DB_URI)

# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:8080",
    "http://localhost:4000",
    "https://dashboard-dev.l3vels.xyz",
    "https://dashboard.l3vels.xyz",
    "https://app.l3vels.xyz",
    "https://www.l3vels.xyz",
    "https://l3vels.xyz",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )

app.include_router(user_router, prefix="/auth")
app.include_router(project_router, prefix="/project")
app.include_router(team_router, prefix="/team")
app.include_router(team_agent_router, prefix="/team-agent")
app.include_router(agent_router, prefix="/agent")
app.include_router(config_router, prefix="/config")
app.include_router(datasource_router, prefix="/datasource")
app.include_router(tool_router, prefix="/tool")
app.include_router(llm_router, prefix="/llm")
app.include_router(chat_router, prefix="/chat")



@app.get("/")
def root():
    return f"Version {VERSION} is up!"


print("Project run on 4002 port")
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4002)
