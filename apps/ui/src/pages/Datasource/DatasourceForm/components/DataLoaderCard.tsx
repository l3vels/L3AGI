import styled, { css } from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type DataLoaderCardProps = {
  title: string
  onClick: () => void
  isSelected: boolean
  isActive: boolean
  iconSrc: string
}

const DataLoaderCard = ({ title, onClick, isSelected, isActive, iconSrc }: DataLoaderCardProps) => {
  return (
    <StyledDataLoaderCard
      onClick={() => {
        if (isActive) {
          onClick()
        }
      }}
      isSelected={isSelected}
      isActive={isActive}
    >
      <StyledIcon src={iconSrc} />
      <TypographyPrimary value={title} type={Typography.types.LABEL} size={Typography.sizes.md} />
    </StyledDataLoaderCard>
  )
}

export default DataLoaderCard

const StyledDataLoaderCard = styled.div<{ isSelected: boolean; isActive: boolean }>`
  width: 150px;
  min-width: 150px;
  height: 45px;
  min-height: 45px;

  border-radius: 8px;
  border: 2px solid transparent;

  /* box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1); */

  background: ${({ theme }) => theme.body.replyBoxBgColor};

  display: flex;
  /* justify-content: space-between; */
  align-items: center;

  gap: 10px;

  padding: 10px;

  cursor: pointer;

  ${p =>
    !p.isActive &&
    css`
      opacity: 0.6;
    `}

  ${p =>
    p.isSelected &&
    css`
      border: 2px solid ${({ theme }) => theme.body.dataLoaderCardBorder};
    `};
`
const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 8px;

  object-fit: cover;
`
