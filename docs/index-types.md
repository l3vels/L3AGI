# Index Types

This guide describes how each index works with diagrams. We also visually highlight our "Response Synthesis" modes.

Some terminology:

- **Node**: Corresponds to a chunk of text from a Document. LlamaIndex takes in Document objects and internally parses/chunks them into Node objects.
- **Response Synthesis**: Our module which synthesizes a response given the retrieved Node. You can see how to
  [specify different response modes](setting-response-mode) here.
  See below for an illustration of how each response mode works.

## Summary Index

The summary index simply stores Nodes as a sequential chain.

![](https://docs.llamaindex.ai/en/stable/_images/list.png)

### Querying

During query time, if no other query parameters are specified, LlamaIndex simply loads all Nodes in the list into
our Reponse Synthesis module.

![](https://docs.llamaindex.ai/en/stable/_images/list_query.png)

The summary index does offer numerous ways of querying a summary index, from an embedding-based query which
will fetch the top-k neighbors, or with the addition of a keyword filter, as seen below:

![](https://docs.llamaindex.ai/en/stable/_images/list_filter_query.png)

## Vector Store Index

The vector store index stores each Node and a corresponding embedding in a [Vector Store](vector-store-index).

![](https://docs.llamaindex.ai/en/stable/_images/vector_store.png)

### Querying

Querying a vector store index involves fetching the top-k most similar Nodes, and passing
those into our Response Synthesis module.

![](https://docs.llamaindex.ai/en/stable/_images/vector_store_query.png)

## Tree Index

The tree index builds a hierarchical tree from a set of Nodes (which become leaf nodes in this tree).

![](https://docs.llamaindex.ai/en/stable/_images/tree.png)

### Querying

Querying a tree index involves traversing from root nodes down
to leaf nodes. By default, (`child_branch_factor=1`), a query
chooses one child node given a parent node. If `child_branch_factor=2`, a query
chooses two child nodes per parent.

![](https://docs.llamaindex.ai/en/stable/_images/tree_query.png)

For more information, please visit [LlamaIndex docs](https://docs.llamaindex.ai/en/stable/core_modules/data_modules/index/index_guide.html)
