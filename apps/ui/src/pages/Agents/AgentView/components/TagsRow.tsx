import styled, { useTheme } from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import Tags from 'share-ui/components/Tags/Tags'

import TypographySecondary from 'components/Typography/Secondary'

type TagsRowProps = {
  items: string[]
  title: string
}

const TagsRow = ({ items, title }: TagsRowProps) => {
  const theme = useTheme()

  return (
    <StyledRow>
      <TypographySecondary value={title} type={Typography.types.LABEL} size={Typography.sizes.sm} />

      <StyledContainer>
        {items.map((item: string, index: number) => {
          return (
            <Tags
              key={index}
              label={item}
              color={theme.body.tagColor}
              readOnly
              size={Tags.sizes?.SMALL}
              outlined
            />
          )
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
