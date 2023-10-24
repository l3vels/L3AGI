from datasources.base import DatasourceCategory, DatasourceType
from datasources.file.file import FileDatasource
from datasources.mysql.mysql import MySQLDatasource
from datasources.postgres.postgres import PostgresDatasource

DATASOURCES = [
    FileDatasource(),
    PostgresDatasource(),
    MySQLDatasource(),
]

COMING_SOON = [
    {
        "is_public": True,
        "is_active": False,
        "name": "Crawler",
        "description": "Crawl the web page",
        "category": DatasourceCategory.CRAWLER,
        "source_type": DatasourceType.WEB_PAGE,
    },
    {
        "is_public": True,
        "is_active": False,
        "name": "Shopify",
        "description": "Notion",
        "category": DatasourceCategory.APPLICATION,
        "source_type": DatasourceType.SHOPIFY,
    },
    {
        "is_public": True,
        "is_active": False,
        "name": "Notion",
        "description": "Notion",
        "category": DatasourceCategory.APPLICATION,
        "source_type": DatasourceType.NOTION,
    },
    {
        "is_public": True,
        "is_active": False,
        "name": "Google Analytics",
        "description": "Google Analytics",
        "category": DatasourceCategory.APPLICATION,
        "source_type": DatasourceType.GOOGLE_ANALYTICS,
    },
    {
        "is_public": True,
        "is_active": False,
        "name": "Firebase",
        "description": "Firebase",
        "category": DatasourceCategory.APPLICATION,
        "source_type": DatasourceType.FIREBASE,
    },
]


def get_all_datasources():
    """Return a list of all datasources."""
    result = []

    for datasource in DATASOURCES:
        result.append(
            {
                "is_public": True,
                "is_active": datasource.is_active,
                "name": datasource.name,
                "description": datasource.description,
                "category": datasource.category,
                "source_type": datasource.type,
                "fields": [
                    {
                        "label": env_key.label,
                        "key": env_key.key,
                        "type": str(env_key.key_type),
                        "is_required": env_key.is_required,
                        "is_secret": env_key.is_secret,
                    }
                    for env_key in datasource.get_env_keys()
                ],
            }
        )

    result.extend(COMING_SOON)

    return result
