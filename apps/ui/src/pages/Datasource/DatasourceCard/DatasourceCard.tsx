import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'
import CheckIcon from '@l3-lib/ui-core/dist/icons/Check'
import Bullet from '@l3-lib/ui-core/dist/icons/Bullet'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

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
    return <Bullet />
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
            <Typography
              value={name}
              type={Typography.types.P}
              size={Typography.sizes.md}
              customColor={'#FFF'}
            />
          </StyledNameWrapper>
          <Typography
            value={shortDescription}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255, 0.7)'}
          />
        </StyledTextWrapper>
      </StyledBodyWrapper>

      <StyledCardFooter>
        <StyledStatus>
          {statusIcon}

          <Typography
            value={status}
            type={Typography.types.P}
            size={Typography.sizes.xss}
            customColor={'rgba(255,255,255, 0.6)'}
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
