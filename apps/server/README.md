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

## Kubectl

kubectl create secret docker-registry l3-container-secret \
 --docker-server=l3container.azurecr.io \
 --docker-username=l3container \
 --docker-password=1uTmLqun1W9Y2a1WQeyZa2esg7Xo0Z0oBZirwSPKRD+ACRBTv0uG \
 --docker-email=edufaraday@outlook.com

az acr show --name l3container.azurecr.io --query loginServer --output tsv

{
"appId": "ecfa2adc-27ec-4d01-889e-7e63c57dee62",
"displayName": "l3container",
"password": "R2-8Q~A4MWzVZJ6uIqKbidzhumsEicUqhmEHRcYW",
"tenant": "f1fd470d-da28-4fc7-91be-29770cc5c9ec"
}

az ad sp create-for-rbac --name http://acr-service-principal --scopes /subscriptions/69f81a00-e579-4207-a1c7-f7ccf77292b3/resourceGroups/l3-k8s_group/providers/Microsoft.ContainerRegistry/registries/<registry> --role acrpull

#Socket local run
https://github.com/localtunnel/localtunnel#installation

## Azure example: https://github.com/Azure/azure-webpubsub/tree/main/samples/javascript/chatapp-aad

lt --port 4002 --print-requests
ngrok http 4002


I have a question on how to analyze my games, 
how to increase the percentage of NFT sales, 
and how to attract more players.


