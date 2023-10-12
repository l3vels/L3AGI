import re

from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from utils.model import get_llm

TEMPLATE = """
You are expert at generating charts.
Here is JSON data you need to generate chart: 
{data}

Based on this JSON data, write Python code in a triple backtick Markdown code block

Notes:
- First, think step by step what you want to do and write it down in English.
- Load JSON data in valid pandas DataFrame
- Then generate valid Python code in a code block
- Make sure all code is valid
- it be run in a Jupyter Python 3 kernel environment.
- Define every variable before you use it.
- For data munging, you can use
    'numpy', # numpy==1.24.3
    'dateparser' #dateparser==1.1.8
    'pandas', # matplotlib==1.5.3
    'geopandas' # geopandas==0.13.2
- For data visualization, you can use
        'matplotlib', # matplotlib==3.7.1
    - Be sure to generate charts with matplotlib.
    - If you need geographical charts, use geopandas with the geopandas.datasets module.
    - I'll give give you query result as method parameters.
    - Consider query result field types when you are doing data munging.
    - Method name must be "query_runner"
    - "query_runner" should have 0 parameters.
    - Method must return base64 encoded image string
    - Try background of image as transparent it's possible.

1. Please output only code
2. Please do not use any other external packages to avoid ModuleNotFoundError.
3. Use multiple colors for charts.
"""


def generate_chart_code_chain(
    settings: AccountSettings, agent_with_configs: AgentWithConfigsOutput
) -> LLMChain:
    """Generate code for chart generation."""
    llm = get_llm(
        settings,
        agent_with_configs,
    )

    prompt = PromptTemplate(input_variables=["data"], template=TEMPLATE)
    return LLMChain(llm=llm, prompt=prompt)


def extract_code(text: str) -> str:
    """Extract code from Markdown text."""

    # Match triple backtick blocks first
    triple_match = re.search(r"```(?:\w+\n)?(.+?)```", text, re.DOTALL)

    if triple_match:
        return triple_match.group(1).strip()
    else:
        # If no triple backtick blocks, match single backtick blocks
        single_match = re.search(r"`(.+?)`", text, re.DOTALL)
        if single_match:
            return single_match.group(1).strip()
    # If no code blocks found, return original text
    return text
