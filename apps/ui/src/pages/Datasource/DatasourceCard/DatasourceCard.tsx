import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

type DatasourceCardProps = {
  name: string
  description: string
  onEditClick: () => void
  onDeleteClick: () => void
  imageSrc: string
}

const DatasourceCard = ({
  name,
  description,
  onEditClick,
  onDeleteClick,
  imageSrc,
}: DatasourceCardProps) => {
  let shortDescription = description
  if (description.length > 70) {
    shortDescription = `${description.slice(0, 70)}...`
  }

  return (
    <StyledCard>
      <StyledBodyWrapper>
        <StyledImg src={imageSrc} />
        <StyledDescriptionWrapper>
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
        </StyledDescriptionWrapper>
      </StyledBodyWrapper>
      <StyledButtonsWrapper>
        <IconButton
          onClick={onEditClick}
          icon={() => <Edit />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
        />
        <IconButton
          onClick={onDeleteClick}
          icon={() => <Delete />}
          size={IconButton.sizes.SMALL}
          kind={IconButton.kinds.TERTIARY}
        />
      </StyledButtonsWrapper>
    </StyledCard>
  )
}

export default DatasourceCard

const StyledCard = styled.div`
  position: relative;
  width: 335px;
  min-width: 335px;
  height: 170px;
  min-height: 170px;

  background: rgba(0, 0, 0, 0.2);

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
  /* width: 100%; */
  /* padding: 5px; */
  /* margin-left: auto; */

  position: absolute;
  bottom: 3px;
  right: 10px;
`
const StyledBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
  padding: 8px 20px;

  height: 100%;
  overflow: hidden;
  line-height: 14px;
  /* text-align: center; */
`
const StyledImg = styled.img`
  border-radius: 8px;
  /* width: 54px; */
  height: 54px;
  object-fit: contain;
`
const StyledDescriptionWrapper = styled.div`
  overflow: hidden;
`
const StyledNameWrapper = styled.div`
  margin-top: auto;
  text-align: center;
`
