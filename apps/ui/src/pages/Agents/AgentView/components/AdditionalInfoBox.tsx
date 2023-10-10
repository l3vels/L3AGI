import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

type AdditionalInfoBoxProps = {
  items: string[]
  title: string
}

const AdditionalInfoBox = ({ items, title }: AdditionalInfoBoxProps) => {
  return (
    <StyledAdditionalInfo>
      <TypographyPrimary value={title} type={Typography.types.LABEL} size={Typography.sizes.lg} />

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
`
