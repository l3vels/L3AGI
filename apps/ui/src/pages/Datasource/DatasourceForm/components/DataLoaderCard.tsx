import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type DataLoaderCardProps = {
  title: string
  onClick: () => void
  isActive: boolean
}

const DataLoaderCard = ({ title, onClick, isActive }: DataLoaderCardProps) => {
  return (
    <StyledDataLoaderCard onClick={onClick} isActive={isActive}>
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

const StyledDataLoaderCard = styled.div<{ isActive: boolean }>`
  width: 150px;
  min-width: 150px;
  height: 50px;
  min-height: 50px;

  border-radius: 8px;
  border: 2px solid transparent;

  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);

  background: rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${p =>
    p.isActive &&
    css`
      border-color: #48ecf0;
    `};
`
