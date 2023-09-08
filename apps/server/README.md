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
uvicorn main:app --reload --port 4002
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
docker run -p 4002:4002 -v .:/code l3_ai_api
```


## Migrations
We use `Alembic` for migrations. To create new migration run:

```commandline
alembic revision --autogenerate -m "Migration name"
```

This will result in creating new migration file in `migrations/versions` folder.

lt --port 4002 --print-requests
ngrok http 4002

