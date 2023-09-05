import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Tags from '@l3-lib/ui-core/dist/Tags'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

type AgentCardProps = {
  name: string
  description: string
  headerText?: string
  headerTag?: string
  onEditClick?: () => void
  onDeleteClick?: () => void
  onViewClick: () => void
}

const AgentCard = ({
  name,
  description,
  headerText,
  headerTag,
  onDeleteClick,
  onEditClick,
  onViewClick,
}: AgentCardProps) => {
  return (
    <StyledAgentCard>
      <StyledCardHeader>
        <div>
          {headerText && (
            <Typography
              value={headerText}
              type={Typography.types.P}
              size={Typography.sizes.sm}
              customColor={'rgba(255,255,255, 0.8)'}
            />
          )}
        </div>

        <div>{headerTag && <Tags label={headerTag} readOnly size='small' />}</div>
      </StyledCardHeader>
      <StyledCardBody>
        <StyledAvatarWrapper>
          <Avatar
            size={Avatar.sizes.LARGE}
            src={
              'https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/2/2022_2$largeimg_287503261.png'
            }
            type={Avatar.types.IMG}
            // ariaLabel='Hadas Fahri'
          />
        </StyledAvatarWrapper>
        <StyledBodyTextWrapper>
          <Typography
            value={name}
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
          <Typography
            value={description}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255, 0.8)'}
          />
        </StyledBodyTextWrapper>
      </StyledCardBody>
      <StyledCardFooter>
        {onViewClick && (
          <Button onClick={onViewClick} size={Button.sizes.SMALL}>
            View
          </Button>
        )}
        <StyledButtonsWrapper>
          {onEditClick && (
            <IconButton
              onClick={onEditClick}
              icon={() => <Edit />}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
            />
          )}
          {onDeleteClick && (
            <IconButton
              onClick={onDeleteClick}
              icon={() => <Delete />}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
            />
          )}
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledAgentCard>
  )
}

export default AgentCard

const StyledAgentCard = styled.div`
  width: 330px;
  min-width: 330px;
  height: 180px;
  min-height: 180px;

  padding: 15px;
  padding-bottom: 10px;

  border-radius: 10px;
  /* background: rgba(0, 0, 0, 0.5); */
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledCardHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: auto;
  padding-bottom: 5px;

  height: 20px;
  /* margin-bottom: 10px; */
`

const StyledCardBody = styled.div`
  width: 100%;
  height: 100%;

  margin-top: auto;

  display: flex;

  gap: 20px;
  /* align-items: center; */
  /* flex-direction: column; */
  /* justify-content: center; */
  padding: 0 15px;

  overflow: hidden;
`

const StyledCardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  padding-top: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 2px;

  margin-left: auto;
`
const StyledBodyTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */

  overflow: hidden;

  padding-top: 5px;
`
const StyledAvatarWrapper = styled.div`
  width: fit-content;
`
