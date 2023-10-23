import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import { useTranslation } from 'react-i18next'
import { useRunLogsService } from 'services/run'
import Loader from '@l3-lib/ui-core/dist/Loader'

type RunLogsProps = {
  runId: string
}

const RunLogs = ({ runId }: RunLogsProps) => {
  const { t } = useTranslation()
  const { data, loading } = useRunLogsService({ run_id: runId })

  if (loading)
    return (
      <StyledLoaderWrapper>
        <Loader size={40} />
      </StyledLoaderWrapper>
    )

  return (
    <StyledWrapper>
      {data?.map(({ id, input, output, name, type }, index: number) => {
        const isFinalAnswer = name === 'Final Answer'

        const isSystem = type === 'System'
        const isTool = type === 'Tool'

        return (
          <LogCard key={id}>
            <LogTitle>
              {index + 1}. {name}
            </LogTitle>

            {input && (
              <CodeCard>
                <CodeTitle>{t('Input')}</CodeTitle>
                <CodeContent>{input}</CodeContent>
              </CodeCard>
            )}

            {output && (
              <CodeCard>
                <CodeTitle>{t('Output')}</CodeTitle>
                <CodeContent>{output}</CodeContent>
              </CodeCard>
            )}
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
  gap: 20px;
`

const StyledLoaderWrapper = styled.div`
  position: absolute;
  width: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  margin-bottom: 20px;
  margin-left: 5px;
`

const LogCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  background: #fff;
`

const LogTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 18px;
`

const CodeCard = styled.div`
  margin-top: 15px;
  padding: 16px;
  background-color: #f1f1f1;
  border-radius: 10px;
`

const CodeTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 16px;
`

const CodeContent = styled.pre`
  margin: 0;
  padding: 0;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 12px;
`
