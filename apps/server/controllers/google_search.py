from typing import List

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from serpapi.google_search import GoogleSearch

router = APIRouter()


# Assuming you have a function to fetch the secret API key
def get_secret_api_key():
    # Your implementation to get the API key
    return "be37de5344aaa3f5444f1083f4f303a11cce32bd84456a7387a52efeab006e88"


@router.post("/suggestions")
def autocomplete_search(q: str, api_key: str = Depends(get_secret_api_key)):
    """
    Perform autocomplete search using Serpapi.

    Args:
        q (str): The query string for autocomplete search.
        api_key (str): Serpapi API key.

    Returns:
        List[str]: List of autocomplete suggestions.
    """
    params = {"engine": "google_autocomplete", "q": q, "api_key": api_key}

    search = GoogleSearch(params)
    results = search.get_dict()
    suggestions = results["suggestions"]
    return JSONResponse(content=suggestions)
