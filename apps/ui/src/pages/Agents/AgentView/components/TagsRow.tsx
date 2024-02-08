import styled, { useTheme } from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import Tags from 'share-ui/components/Tags/Tags'

import TypographySecondary from 'components/Typography/Secondary'
import { textSlicer } from 'utils/textSlicer'
import CopyButton from 'components/CopyButton'
import { ReactElement } from 'react'
import TypographyPrimary from 'components/Typography/Primary'

type TagsRowProps = {
  items: string[]
  title: string
  customButton?: ReactElement
}

const TagsRow = ({ items, title, customButton }: TagsRowProps) => {
  const theme = useTheme()

  return (
    <StyledRow>
      <StyledTextWrapper>
        <TypographyPrimary
          value={title}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledTextWrapper>

      <StyledWrapper>
        <StyledContainer>
          {items.map((item: string, index: number) => {
            const { shortText: shortName } = textSlicer(item, 35)
            return (
              <Tags
                key={index}
                label={item}
                color={theme.body.tagColor}
                readOnly
                size={Tags.sizes?.SMALL}
              />
            )
          })}
        </StyledContainer>
        {customButton}
      </StyledWrapper>
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
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`
const StyledTextWrapper = styled.div`
  font-weight: 500;
`
