# L3 AI API

# Setup

We use `Poetry` for package management


First install `Poetry` by following [their installation instructions](https://python-poetry.org/docs/#installing-with-the-official-installer)

Then install dependencies

```commandline
poetry install
```

**When you change .env file you need to restart server**

## Running with Uvicorn

```commandline
poetry run uvicorn main:app --reload --port 4000
```

## Running with Docker

```commandline
cd docker
docker compose up --build
```

## Linting

We use `Ruff` for linting and we run it periodically. To run it locally:

```commandline
poetry run ruff check . --ignore E501
```

## Formatting

We use `Black` formatter for Python. We format files before committing.
To run it locally:

```commandline
poetry run black .
```

## Migrations

We use `Alembic` for migrations. To create new migration run:

```commandline
poetry run alembic revision --autogenerate -m "Migration name"
```

Update database manually

```commandline
poetry run alembic upgrade head
```

This will result in creating new migration file in `migrations/versions` folder.

lt --port 4000 --print-requests
ngrok http 4000