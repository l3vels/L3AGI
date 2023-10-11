# L3 AI API

# Setup

We use pipenv for package management

```commandline
pipenv shell
pipenv install
```

**When you change .env file you need to re-run script above**

## Running with Uvicorn (without Docker)

```commandline
uvicorn main:app --reload --port 4000
```

## Running with Docker

### Using Docker Compose

```commandline
cd docker
docker compose up --build
```

### Without Docker Compose

You should build Docker image if you're running it first time or when you add new package to Pipenv

```commandline
docker build -t l3_ai_api -f docker/Dockerfile .
```

Run server with hot reload

```commandline
docker run -p 4000:4000 -v .:/code l3_ai_api
```

## Linting

We use `Ruff` for linting and we run it periodically. To run it locally:

```commandline
ruff check . --ignore E501
```

## Formatting

We use `Black` formatter for Python. We format files before committing.
To run it locally:

```commandline
black .
```

## Migrations

We use `Alembic` for migrations. To create new migration run:

```commandline
alembic revision --autogenerate -m "Migration name"
```

Update database manually

```commandline
alembic upgrade head
```

This will result in creating new migration file in `migrations/versions` folder.

lt --port 4000 --print-requests
ngrok http 4000
