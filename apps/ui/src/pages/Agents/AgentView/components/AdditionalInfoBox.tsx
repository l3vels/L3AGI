import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type AdditionalInfoBoxProps = {
  items: string[]
  title: string
}

const AdditionalInfoBox = ({ items, title }: AdditionalInfoBoxProps) => {
  return (
    <StyledAdditionalInfo>
      <Typography
        value={title}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor={'#FFF'}
      />

      {items.map((item: string, index: number) => {
        return (
          <Typography
            key={index}
            value={items.length === 1 ? item : `${index + 1}. ${item}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255,0.9)'}
          />
        )
      })}
    </StyledAdditionalInfo>
  )
}

export default AdditionalInfoBox

const StyledAdditionalInfo = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 1440px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
