import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'
import CheckIcon from '@l3-lib/ui-core/dist/icons/Check'
import BulletIcon from '@l3-lib/ui-core/dist/icons/Bullet'
import CloseIcon from '@l3-lib/ui-core/dist/icons/CloseSmall'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyTertiary from 'components/Typography/Tertiary'

type DatasourceCardProps = {
  name: string
  description: string
  status: string
  onEditClick: () => void
  onDeleteClick: () => void
  imageSrc: string
}

const getStatusIcon = (status: string) => {
  if (status === 'Ready') {
    return <CheckIcon />
  } else if (status === 'Indexing') {
    return <BulletIcon />
  } else if (status === 'Failed') {
    return <CloseIcon />
  }
}

const DatasourceCard = ({
  name,
  description,
  status,
  onEditClick,
  onDeleteClick,
  imageSrc,
}: DatasourceCardProps) => {
  let shortDescription = description || ''
  if (shortDescription.length > 45) {
    shortDescription = `${description.slice(0, 45)}...`
  }

  const statusIcon = getStatusIcon(status)

  return (
    <StyledCard>
      <StyledBodyWrapper>
        <StyledImg src={imageSrc} />
        <StyledTextWrapper>
          <StyledNameWrapper>
            <TypographyPrimary value={name} type={Typography.types.P} size={Typography.sizes.md} />
          </StyledNameWrapper>
          <TypographySecondary
            value={shortDescription}
            type={Typography.types.P}
            size={Typography.sizes.sm}
          />
        </StyledTextWrapper>
      </StyledBodyWrapper>

      <StyledCardFooter>
        <StyledStatus>
          {statusIcon}

          <TypographyTertiary
            value={status}
            type={Typography.types.P}
            size={Typography.sizes.xss}
          />
        </StyledStatus>

        <StyledButtonsWrapper>
          <IconButton
            onClick={onDeleteClick}
            icon={() => <Delete />}
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            ariaLabel='Delete'
          />
          <IconButton
            onClick={onEditClick}
            icon={() => <Edit />}
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            ariaLabel='Edit'
          />
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledCard>
  )
}

export default DatasourceCard

const StyledCard = styled.div`
  position: relative;
  width: 250px;
  min-width: 250px;
  height: 170px;
  min-height: 170px;
  border: ${({ theme }) => theme.body.border};
  background: rgba(0, 0, 0, 0.2);
  /* background: rgba(0, 0, 0, 0.4); */

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */

  padding: 10px;
  padding-bottom: 0px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 2px;
  margin-top: auto;
`

const StyledBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
  padding: 8px 10px;

  height: 100%;
  overflow: hidden;
  line-height: 14px;
  text-align: center;
`
const StyledImg = styled.img`
  border-radius: 8px;
  width: 48px;
  height: 48px;
  object-fit: contain;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledNameWrapper = styled.div`
  margin-top: auto;
  text-align: center;
`

const StyledCardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  /* padding-top: 5px; */

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
