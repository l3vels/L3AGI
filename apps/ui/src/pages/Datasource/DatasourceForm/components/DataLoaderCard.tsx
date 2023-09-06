import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type DataLoaderCardProps = {
  title: string
  onClick: () => void
  isSelected: boolean
  isActive: boolean
  backgroundImg: string
}

const DataLoaderCard = ({
  title,
  onClick,
  isSelected,
  isActive,
  backgroundImg,
}: DataLoaderCardProps) => {
  return (
    <StyledDataLoaderCard
      bgImg={backgroundImg}
      onClick={() => {
        if (isActive) {
          onClick()
        }
      }}
      isSelected={isSelected}
      isActive={isActive}
    >
      <Typography
        value={title}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor={'#FFF'}
      />
    </StyledDataLoaderCard>
  )
}

export default DataLoaderCard

const StyledDataLoaderCard = styled.div<{ isSelected: boolean; isActive: boolean; bgImg: string }>`
  width: 150px;
  min-width: 150px;
  height: 70px;
  min-height: 70px;

  border-radius: 8px;
  border: 2px solid #5d6a7d;

  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);

  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${p =>
    !p.isActive &&
    css`
      opacity: 0.6;
    `}

  ${p =>
    p.isSelected &&
    css`
      border-color: #48ecf0;
    `};

  background-image: ${p =>
    p.bgImg &&
    `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${p.bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
