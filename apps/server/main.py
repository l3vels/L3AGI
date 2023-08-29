from dotenv import load_dotenv

load_dotenv(override=False)

import uvicorn
import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware

from config import Config
from models.db import Base, engine

from controllers.agent import router as agent_router
from controllers.config import router as config_router
from controllers.datasource import router as datasource_router
from controllers.tool import router as tool_router
from controllers.llm import router as llm_router
from controllers.chat import router as chat_router


VERSION = "0.3.1"

app = FastAPI()

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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agent_router, prefix="/agent")
app.include_router(config_router, prefix="/config")
app.include_router(datasource_router, prefix="/datasource")
app.include_router(tool_router, prefix="/tool")
app.include_router(llm_router, prefix="/llm")
app.include_router(chat_router, prefix="/chat")


@app.get("/")
def root():
    return f"Version {VERSION} is up!"


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4002)
