# Response Modes

1. **Refine Mode**:

   - Best for detailed answers.
   - Processes each text chunk individually with a unique LLM call per Node.
   - Uses the `text_qa_template` for the first chunk, then sequentially refines the answer with `refine_template` for each subsequent chunk.
   - If a chunk is too lengthy, it's split with TokenTextSplitter, creating additional chunks for processing.

2. **Compact Mode (default)**:

   - Essentially, a more efficient version of refine in terms of LLM calls.
   - Similar to refine but begins by concatenating the chunks.
   - Aims to minimize LLM calls by packing as much text as possible within the context window.
   - Splits oversized texts and treats each as a “chunk” for the refine synthesizer.

3. **Tree Summarize Mode**:

   - Ideal for generating summaries.
   - Utilizes the `summary_template` prompt for all chunk concatenations.
   - Sends each chunk/split to the summary_template, with no refining.
   - Recursive: answers from chunks are treated as new chunks until only one chunk remains.

4. **Simple Summarize Mode**:

   - Provides quick summaries but may omit certain details.
   - Directly truncates all text chunks to fit a single LLM prompt.

5. **No Text Mode**:

   - Only retrieves the nodes meant for the LLM without actual LLM querying.
   - Retrieved nodes can be viewed in `response.source_nodes`.

6. **Accumulate Mode**:

   - Suitable when querying each text chunk individually.
   - Uses the given query on every text chunk and accumulates responses into an array.
   - The outcome is a merged string of all responses.

7. **Compact Accumulate Mode**:
   - Merges the approach of the compact mode with the accumulate mode.
   - “Compacts” each LLM prompt and runs the query on each text chunk.

For more information, please visit [LlamaIndex docs](https://docs.llamaindex.ai/en/stable/core_modules/query_modules/query_engine/response_modes.html)
