import styled from 'styled-components'

const LOGS = [
  {
    id: 1,
    name: 'PostgreSQL Database Q&A',
    input: 'What are the top 3 minted assets in the game?;407f38b1-4422-4057-a6bc-140e0591756f',
    output: "[('χαλαρώ', 100), ('₲oose Bundle Builder v.1', 100), ('Love is Love', 100)]",
  },
  {
    id: 2,
    name: 'Chart Generator',
    input:
      '{"data": {"Asset": ["χαλαρώ", "₲oose Bundle Builder v.1", "Love is Love"], "Mints": [100, 100, 100]}, "user_prompt": "Give me top 3 minted assets"}',
    output:
      'https://l3-data-dev.s3.amazonaws.com/account_211b5f63-66c9-44b8-a4d6-0b7bf59e1b2b/chat/chart-a65ce8ee-8ac0-4177-99b8-0aacbfeca2ff.png',
  },
  {
    id: 3,
    name: 'Final Answer',
    input: '',
    output:
      "The top 3 minted assets in the game are 'χαλαρώ', '₲oose Bundle Builder v.1', and 'Love is Love', each with 100 mints. Here is the bar chart representation: ![Bar Chart](https://l3-data-dev.s3.amazonaws.com/account_211b5f63-66c9-44b8-a4d6-0b7bf59e1b2b/chat/chart-a65ce8ee-8ac0-4177-99b8-0aacbfeca2ff.png)",
  },
]

const RunLogs = () => {
  return (
    <StyledWrapper>
      {LOGS.map(({ id, name, input, output }) => {
        const isFinalAnswer = name === 'Final Answer'

        return (
          <LogCard key={id}>
            <LogTitle>{isFinalAnswer ? name : `Tool: ${name}`}</LogTitle>
            {
              <CodeCard>
                <CodeTitle>Input</CodeTitle>
                <CodeContent>{input}</CodeContent>
              </CodeCard>
            }
            <CodeCard>
              <CodeTitle>Output</CodeTitle>
              <CodeContent>{output}</CodeContent>
            </CodeCard>
          </LogCard>
        )
      })}
    </StyledWrapper>
  )
}

export default RunLogs

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background: #fff;
`

const LogCard = styled.div`
  border-radius: 10px;
  padding: 15px;
  width: 100%;
`

const LogTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 18px;
`

const CodeCard = styled.div`
  border: 1px solid #ccc;
  margin-top: 15px;
  padding: 10px;
  background-color: #f1f1f1;
`

const CodeTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 14px;
`

const CodeContent = styled.pre`
  margin: 0;
  padding: 0;
  font-family: monospace;
  white-space: pre-wrap;
`
