#!/bin/bash

alembic upgrade head

exec uvicorn main:app --host 0.0.0.0 --port 4000 --reload
