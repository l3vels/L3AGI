import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import { StyledTypographyWrapper } from './AgentViewDetailBox'

type TagsRowProps = {
  items: string[]
  title: string
}

const TagsRow = ({ items, title }: TagsRowProps) => {
  return (
    <StyledRow>
      <StyledTypographyWrapper>
        <Typography value={title} type={Typography.types.LABEL} size={Typography.sizes.sm} />
      </StyledTypographyWrapper>

      <StyledContainer>
        {items.map((item: string, index: number) => {
          return <Tags key={index} label={item} readOnly size='small' outlined />
        })}
      </StyledContainer>
    </StyledRow>
  )
}

export default TagsRow

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`
