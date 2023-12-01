import random
import re
from typing import Optional, Type

import requests
from bs4 import BeautifulSoup
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from tools.base import BaseTool

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
]


class WebScraperSchema(BaseModel):
    url: str = Field(
        ...,
        description="The URL to scrape data from.",
    )


class WebScraperTool(BaseTool):
    name = "Web Scraper"

    slug = "webScraper"

    description = (
        "This tool extracts data from webpages, "
        "ideal for retrieving specific information from a website."
    )

    args_schema: Type[WebScraperSchema] = WebScraperSchema

    tool_id = "705357f8-cd24-45ed-aa7e-7ecd65852d4e"

    def _run(
        self, url: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Scrape the webpage and return the results."""
        content = self.extract_with_bs4(url)
        max_length = len(" ".join(content.split(" ")[:600]))
        return content[:max_length]

    def extract_with_bs4(self, url):
        """
        Extract the text from a webpage using the BeautifulSoup4 method.

        Args:
            url (str): The URL of the webpage to extract from.

        Returns:
            str: The extracted text.
        """
        headers = {"User-Agent": random.choice(USER_AGENTS)}

        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                for tag in soup(
                    [
                        "script",
                        "style",
                        "nav",
                        "footer",
                        "head",
                        "link",
                        "meta",
                        "noscript",
                    ]
                ):
                    tag.decompose()

                main_content_areas = soup.find_all(
                    ["main", "article", "section", "div"]
                )
                if main_content_areas:
                    main_content = max(main_content_areas, key=lambda x: len(x.text))
                    content_tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "a"]
                    content = " ".join(
                        [
                            (tag.text.strip() + " " + tag.get("href", ""))
                            if tag.name == "a"
                            else tag.text.strip()
                            for tag in main_content.find_all(content_tags)
                        ]
                    )
                else:
                    content = " ".join(
                        [
                            (tag.text.strip() + " " + tag.get("href", ""))
                            if tag.name == "a"
                            else tag.text.strip()
                            for tag in soup.find_all(
                                ["p", "h1", "h2", "h3", "h4", "h5", "h6"]
                            )
                        ]
                    )

                content = re.sub(r"\t", " ", content)
                content = re.sub(r"\s+", " ", content)
                return content
            elif response.status_code == 404:
                return "Error: 404. Url is invalid or does not exist. Try with valid url..."
            else:
                print(
                    f"Error while extracting text from HTML (bs4): {response.status_code}"
                )
                return f"Error while extracting text from HTML (bs4): {response.status_code}"

        except Exception as err:
            print(f"Unknown error while extracting text from HTML (bs4): {str(err)}")
            return ""
