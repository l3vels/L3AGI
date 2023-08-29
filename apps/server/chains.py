from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, ConversationalRetrievalChain
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Pinecone, SupabaseVectorStore
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import MarkdownTextSplitter

llm = ChatOpenAI(temperature=0, model_name="gpt-4")


# llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")


sqlTemplate = """
    I have PostgresSQL database tables:

    "TABLE asset (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        token_id integer,
        name character varying,
        parent_id character varying,
        properties jsonb,
        attributes jsonb,
        custom_props jsonb,
        config jsonb,
        description text,
        code text,
        price numeric DEFAULT '1'::numeric,
        supply numeric DEFAULT '1'::numeric,
        minted_amount integer DEFAULT 0 NOT NULL,
        "order" integer DEFAULT 0,
        asset_type asset_asset_type_enum DEFAULT 'Main'::asset_asset_type_enum NOT NULL,
        asset_url character varying,
        medias jsonb DEFAULT '[]'::jsonb NOT NULL,
        main_media character varying,
        deleted boolean DEFAULT false NOT NULL,
        account_id uuid NOT NULL,
        game_id uuid NOT NULL,
        collection_id uuid NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        achievements jsonb,
        rewards jsonb,
        ai_analysis jsonb,
        PRIMARY KEY(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
        FOREIGN KEY (collection_id) REFERENCES collection(id)
    );"

    "TABLE game (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        name character varying,
        category game_category_enum NOT NULL,
        logo_image character varying,
        medias jsonb DEFAULT '[]'::jsonb NOT NULL,
        social_links jsonb DEFAULT '[]'::jsonb NOT NULL,
        main_media character varying,
        url character varying,
        web_link character varying,
        discord character varying,
        twitter character varying,
        instagram character varying,
        contact_phone character varying,
        contact_email character varying,
        deleted boolean DEFAULT false NOT NULL,
        account_id uuid NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        description text,
        PRIMARY KEY(id)
    );"

    "Table collection (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        name character varying,
        description character varying,
        logo_image character varying,
        medias jsonb DEFAULT '[]'::jsonb NOT NULL,
        main_media character varying,
        url character varying,
        web_link character varying,
        supply integer,
        custom_property_props jsonb,
        social_links jsonb DEFAULT '[]'::jsonb NOT NULL,
        custom_asset_props jsonb,
        categories jsonb,
        deleted boolean DEFAULT false NOT NULL,
        account_id uuid NOT NULL,
        game_id uuid NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        ai_analysis jsonb,
        metadata_url character varying,
        ipfs_metadata_url character varying,
        is_metadata_updating boolean DEFAULT false NOT NULL,
        PRIMARY KEY(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
    );"

    "TABLE transaction (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        "from" character varying,
        "to" character varying,
        contract_id uuid,
        contract_address character varying,
        blockchain transaction_blockchain_enum NOT NULL,
        chain_name transaction_chain_name_enum NOT NULL,
        chain_id integer,
        environment transaction_environment_enum DEFAULT 'Testnet'::transaction_environment_enum NOT NULL,
        transaction_hash character varying,
        block_number integer,
        "type" character varying,
        method character varying,
        events jsonb,
        tx jsonb,
        tx_receipt jsonb,
        game_id uuid,
        collection_id uuid,
        account_id uuid,
        deleted boolean DEFAULT false NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        from_wallet_id uuid,
        from_player_id uuid,
        to_wallet_id uuid,
        to_player_id uuid,
        webhook_id character varying,
        value numeric, # amount of Ether transferred. For Ethereum and Polygon ether is the native currency.
        transaction_fee numeric, # transaction fee in Ether
        gas_limit numeric,
        gas_used numeric,
        effective_gas_price numeric, # gas price in Ether
        transaction_date timestamptz
        PRIMARY KEY(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
        FOREIGN KEY (collection_id) REFERENCES collection(id)
        FOREIGN KEY (contract_id) REFERENCES contract(id)
        FOREIGN KEY (from_wallet_id) REFERENCES wallet(id)
        FOREIGN KEY (to_wallet_id) REFERENCES wallet(id)
        FOREIGN KEY (to_player_id) REFERENCES player(id)
        FOREIGN KEY (from_player_id) REFERENCES player(id)
        
    );"

    "TABLE transaction_asset (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        amount integer NOT NULL,
        transaction_id uuid NOT NULL,
        player_id uuid NOT NULL,
        asset_id uuid NOT NULL,
        token_id integer NOT NULL,
        game_id uuid NOT NULL,
        collection_id uuid NOT NULL,
        contract_id uuid NOT NULL,
        account_id uuid NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        PRIMARY KEY(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
        FOREIGN KEY (collection_id) REFERENCES collection(id)
        FOREIGN KEY (contract_id) REFERENCES contract(id)
        FOREIGN KEY (asset_id) REFERENCES asset(id)
        FOREIGN KEY (player_id) REFERENCES player(id)        
    );"

    "Table player (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        name character varying,
        username character varying,
        email character varying,
        avatar character varying,
        custom_props jsonb,
        last_seen timestamp without time zone,
        deleted boolean DEFAULT false NOT NULL,
        account_id uuid NOT NULL,
        game_id uuid NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        is_create_wallet boolean,
        last_test_token_received_on timestamp without time zone,
        PRIMARY KEY(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
        FOREIGN KEY (account_id) REFERENCES account(id)
    );"


    "Table player_asset (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        amount integer NOT NULL,
        player_id uuid NOT NULL,
        asset_id uuid NOT NULL,
        collection_id uuid NOT NULL,
        account_id uuid NOT NULL,
        game_id uuid NOT NULL,
        deleted boolean DEFAULT false NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        PRIMARY KEY(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
        FOREIGN KEY (account_id) REFERENCES account(id)
        FOREIGN KEY (game_id) REFERENCES game(id)
        FOREIGN KEY (player_id) REFERENCES player(id)
        FOREIGN KEY (collection_id) REFERENCES collection(id)
        FOREIGN KEY (asset_id) REFERENCES asset(id)
    );"

    "TABLE wallet (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        user_id character varying,
        player_id uuid,
        wallet_type character varying,
        source character varying,
        source_id character varying,
        "label" character varying,
        address character varying,
        protocol character varying,
        network character varying,
        deleted boolean DEFAULT false NOT NULL,
        created_on timestamp without time zone DEFAULT now() NOT NULL,
        modified_on timestamp without time zone DEFAULT now() NOT NULL,
        created_by uuid,
        modified_by uuid,
        account_id uuid NOT NULL,
        config jsonb,
        PRIMARY KEY(id)
        FOREIGN KEY (player_id) REFERENCES player(id)
        FOREIGN KEY (user_id) REFERENCES user(id)
    );"
    
    ---
    Here is enum values separated by a comma:
    
    asset_asset_type_enum (Main, Nested)
    asset_status_enum (Burn, Available, Minted, Paused)
    collection_status_enum	(Active, Draft)
    contract_blockchain_enum (Polygon, Ethereum)
    contract_chain_name_enum (Polygon zkEVM, Ethereum, Goerli, Sepolia, Polygon PoS)
    contract_contract_type_enum	(ERC721, ERC1155)
    contract_environment_enum (Testnet, Mainnet)
    contract_status_enum (Draft, Deployed)
    game_category_enum	(Shooting, Skill Games, Simulation, Sports, Strategy, Vehicle, Sci-Fi, Adventure, Art & Creativity, Board & Card, Multiplayer, Puzzle, Racing, Action, Animal)
    game_status_enum (Draft, Archived, Active)
    log_gql_type_enum (mutation, query)
    log_method_enum	(POST, DELETE, PUT, GET)
    log_source_type_enum (API, Dashboard)
    log_status_enum	(404, 401, 400, 200, 500)
    notification_module_enum (AI Analysis, Collection, Game, Chat)
    notification_type_enum	(METADATA_UPDATED, GAME_CREATED, COLLECTION_CREATED, METADATA_UPDATE_REQUIRED, METADATA_UPDATING, COLLECTION_AND_CONTRACT_SIZE_NOT_EQUAL, CONTRACT_IMPORTED)
    property_property_type_enum	(Object, String, Number, Array)
    transaction_blockchain_enum	(Ethereum, Polygon)
    transaction_chain_name_enum	(Ethereum, Goerli, Sepolia, Polygon PoS, Polygon zkEVM)
    transaction_environment_enum (Mainnet, Testnet)
    transaction_status_enum	(Fail, Success, Pending)
    webhook_events_enum	(All)
    webhook_status_enum	(Active, Disable)
    ---

    I need to write a query for that objective: "{user_prompt}"

    ---

    General rules:
    1. Use "inner join" if possible
    2. Write the best performance query
    3. Use account_id "{account_id}" to filter data, account_id is uuid format
    4. Only write READ queries. Do not write CREATE, UPDATE, DELETE queries.
    5. Keep in mind the token limit. If count of rows is not specified please limit to first 10 items
    6. Select only the columns that are needed for the query
    7. Use only columns, which are defined above for each table
    8. Please your result be SQl query format.
    9. Every table has a column called "deleted" which is a boolean. Please filter every table by "deleted = false" to ensure that you are not fetching deleted records.
    """

class CreateCollectionInputModel(BaseModel):
    name: str = Field(description="Name of the collection")
    categories: list[str] = Field(description="Categories of the collection. It must be list of strings")
    game_name: str = Field(description="Name of the game where to create collection in")

    def to_dict(self):
        return {"name": self.name, "categories": self.categories, "game_name": self.game_name}


create_collection_parser = PydanticOutputParser(pydantic_object=CreateCollectionInputModel)


def parse_create_collection_input_chain() -> LLMChain:
    template = """
    User wants to create collection inside the game. To create collection we need "name" and "categories" of collection and "name" of game.
    game name is string and it's required field
    collection name is string and it is required field
    collection categories is array of strings and at least one category is required.
    Given user prompt {userPrompt}, extract "name" and "categories" and "game_name" from prompt and return JSON.

    Valid categories for collection are "enum CategoryEnum {{
      Vehicles = 'Vehicles',
      Weapons = 'Weapons',
      Bulletproof Vest = 'Bulletproof vest',
      Skins = 'Skins',
      Backpacks = 'Backpacks',
    }}"

    Consider that user may provide category in lowercase and you need to match value from enum and return it. If category is already valid then just use it.
    \n{format_instructions}
    """

    prompt = PromptTemplate(input_variables=["userPrompt"], template=template, partial_variables={
        "format_instructions": create_collection_parser.get_format_instructions()})
    return LLMChain(llm=llm, prompt=prompt)


class ListCollectionsInputModel(BaseModel):
    name: str = Field(description="Name of the game where to list collections from")

    def to_dict(self):
        return {"name": self.name}


list_collections_parser = PydanticOutputParser(pydantic_object=ListCollectionsInputModel)


def parse_list_collections_input_chain() -> LLMChain:
    template = """
    User wants to list collections from the game. To list collections we need "name" of the game
    name is string and it's required field
    Given user prompt {userPrompt}, extract "name" of game from prompt and return JSON.

    \n{format_instructions}
    """

    prompt = PromptTemplate(input_variables=["userPrompt"], template=template, partial_variables={
        "format_instructions": list_collections_parser.get_format_instructions()})
    return LLMChain(llm=llm, prompt=prompt)


def fix_generate_sql_for_report_chain(error, sql) -> LLMChain:
    template = f"""
    I have generated query: "{sql}"
    
    ---
    
    "{error}"
    
    ---
    
    {sqlTemplate}
    
    Can you fix that query and return it
    """
    print(template)
    prompt = PromptTemplate(input_variables=["user_prompt", "account_id"], template=template)
    return LLMChain(llm=llm, prompt=prompt)

def generate_sql_for_report_chain() -> LLMChain:
    prompt = PromptTemplate(input_variables=["user_prompt", "account_id"], template=sqlTemplate)
    return LLMChain(llm=llm, prompt=prompt)


def report_chain():
    text_splitter = MarkdownTextSplitter(chunk_size=1000, chunk_overlap=50)
    texts = text_splitter.split_text("Tables")

    pinecone = Pinecone()
    supabase = SupabaseVectorStore(embedding=OpenAIEmbeddings(), )
    vector_store = pinecone.from_documents(documents=texts, embedding=OpenAIEmbeddings())

    vector_store_retriever = vector_store.as_retriever()
    retrieval_chain = ConversationalRetrievalChain.from_llm(llm=llm, retriever=vector_store_retriever)

    return retrieval_chain


def generate_chart_code_chain() -> LLMChain:
    template = """
    User wants to visualize "{user_prompt}". JSON data is "{json_data}".
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

    prompt = PromptTemplate(input_variables=["user_prompt", "json_data"], template=template)
    return LLMChain(llm=llm, prompt=prompt)