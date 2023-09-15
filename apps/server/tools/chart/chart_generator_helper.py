import re
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

TEMPLATE = """
User wants to visualize "{user_prompt}". JSON data is "{data}".
Based on user prompt and JSON data, write Python code in a triple backtick Markdown code block

Notes:
- JSON data is string JSON. pandas can read it with pd.read_json
- First, think step by step what you want to do and write it down in English.
- Then generate valid Python code in a code block
- Make sure all code is valid
- it be run in a Jupyter Python 3 kernel environment.
- Define every variable before you use it.
- For data munging, you can use
    'numpy', # numpy==1.24.3
    'dateparser' #dateparser==1.1.8
    'pandas', # matplotlib==1.5.3
    'geopandas' # geopandas==0.13.2
    - For pdf extraction, 
- For pdf extraction, you can use
    'PyPDF2', # PyPDF2==3.0.1
    'pdfminer', # pdfminer==20191125
    'pdfplumber', # pdfplumber==0.9.0
- For data visualization, you can use
        'matplotlib', # matplotlib==3.7.1
    - Be sure to generate charts with matplotlib. If you need geographical charts, use geopandas with the geopandas.datasets module. 
    - I'll give give you query result as method parameters.
    - Consider query result field types when you are doing data munging.
    - Method name must be "query_runner"
    - Method must return a response Image as base64 encoded string
    - Try background of image as transparent it's possible.

1. Please output only code
2. Please do not use any other external packages to avoid ModuleNotFoundError.
"""

def generate_chart_code_chain(openai_api_key: str) -> LLMChain:
    """Generate code for chart generation."""

    llm = ChatOpenAI(openai_api_key=openai_api_key,temperature=0, model_name="gpt-4")
    prompt = PromptTemplate(input_variables=["data", "user_prompt"], template=TEMPLATE)
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