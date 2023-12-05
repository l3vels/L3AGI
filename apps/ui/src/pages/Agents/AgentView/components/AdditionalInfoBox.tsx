import styled from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

type AdditionalInfoBoxProps = {
  items: string[]
  title: string
  noCount?: boolean
}

const AdditionalInfoBox = ({ items, title, noCount }: AdditionalInfoBoxProps) => {
  const getCountOfNonEmptyItems = (items: string[]) => {
    const nonEmptyItems = items.filter(item => item.length > 0)
    return nonEmptyItems.length
  }
  const count = getCountOfNonEmptyItems(items)
  let convertedTitle
  if (noCount) {
    convertedTitle = title
  } else if (count === 1) {
    convertedTitle = `1 ${title}`
  } else {
    convertedTitle = `${count} ${title}s`
  }

  if (count === 0) return <div />

  return (
    <StyledAdditionalInfo>
      <TypographyPrimary
        value={convertedTitle}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
      />

      {items.map((item: string, index: number) => {
        return (
          <TypographySecondary
            key={index}
            value={items.length === 1 ? item : `${index + 1}. ${item}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        )
      })}
    </StyledAdditionalInfo>
  )
}

export default AdditionalInfoBox

const StyledAdditionalInfo = styled.div`
  background: ${({ theme }) => theme.body.cardBgColor};

  width: 100%;
  max-width: 1440px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  white-space: pre-line;
`
