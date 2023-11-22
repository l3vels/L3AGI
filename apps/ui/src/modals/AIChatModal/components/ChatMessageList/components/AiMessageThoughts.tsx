import styled from 'styled-components'
import Typography from 'share-ui/components/typography/Typography'
import Loader from 'share-ui/components/Loader/Loader'
import AiMessageMarkdown from './AiMessageMarkdown'

type AiMessageThoughtsProps = {
  thoughts: any[]
}

const AiMessageThoughts = ({ thoughts }: AiMessageThoughtsProps) => {
  return (
    <ol>
      {thoughts?.map(({ id, title, result, loading }: any, index: number) => {
        const isLast = index === thoughts.length - 1

        return (
          <StyledThought key={id}>
            <Typography
              value={title}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={loading ? '#fff' : '#78db36'}
            />

            {loading && (
              <StyledLoaderWrapper>
                <Loader size={20} />
              </StyledLoaderWrapper>
            )}
            <br />

            {result && !result.includes('action_input') && !isLast && (
              <StyledThoughtResult>
                <AiMessageMarkdown children={result} />
              </StyledThoughtResult>
            )}
          </StyledThought>
        )
      })}
    </ol>
  )
}

export default AiMessageThoughts

const StyledThought = styled.li`
  color: #fff;
  line-height: 1.6;
  margin: 24px 0;
`

const StyledThoughtResult = styled.div`
  margin-left: 24px;
`
const StyledLoaderWrapper = styled.div`
  margin-top: 20px;
`
