import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Tags from '@l3-lib/ui-core/dist/Tags'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import MoveArrowRight from '@l3-lib/ui-core/dist/icons/MoveArrowRight'

import Avatar from 'react-avatar'

type AgentCardProps = {
  name: string
  description: string
  headerText?: string
  headerTag?: string
  onEditClick?: () => void
  onDeleteClick?: () => void
  onViewClick: () => void
  onChatClick?: () => void
}

const AgentCard = ({
  name,
  description,
  headerText,
  headerTag,
  onDeleteClick,
  onEditClick,
  onViewClick,
  onChatClick,
}: AgentCardProps) => {
  let shortDescription = description
  if (description.length > 70) {
    shortDescription = `${description.slice(0, 70)}...`
  }

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

        <div>{headerTag && <Tags label={headerTag} readOnly size='small' outlined />}</div>
      </StyledCardHeader>
      <StyledCardBody>
        <StyledAvatarWrapper>
          <Avatar name={name} size='60' textSizeRatio={3} round />
          {onChatClick && (
            <StyledChatButton className='chatButton'>
              <Button size={Button.sizes.SMALL} kind={Button.kinds.SECONDARY} onClick={onChatClick}>
                <StyledInnerButtonWrapper>
                  {'Chat'}
                  <StyledIconWrapper>
                    <MoveArrowRight />
                  </StyledIconWrapper>
                </StyledInnerButtonWrapper>
              </Button>
            </StyledChatButton>
          )}
        </StyledAvatarWrapper>
        <StyledBodyTextWrapper>
          <Typography
            value={name}
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
          <Typography
            value={shortDescription}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255, 0.8)'}
          />
        </StyledBodyTextWrapper>
      </StyledCardBody>
      <StyledCardFooter>
        <div>
          <Typography
            value={'L3'}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255, 0.6)'}
          />
        </div>
        <StyledButtonsWrapper className='footerButtons'>
          {onDeleteClick && (
            <IconButton
              onClick={onDeleteClick}
              icon={() => <Delete />}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
            />
          )}
          {onEditClick && (
            <IconButton
              onClick={onEditClick}
              icon={() => <Edit />}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
            />
          )}
          {onViewClick && (
            <Button onClick={onViewClick} size={Button.sizes.SMALL}>
              View
            </Button>
          )}
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledAgentCard>
  )
}

export default AgentCard

const StyledAgentCard = styled.div`
  width: 335px;
  min-width: 335px;
  height: 185px;
  min-height: 185px;

  padding: 15px;
  padding-bottom: 10px;

  border-radius: 10px;
  /* background: rgba(0, 0, 0, 0.5); */
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover {
    .chatButton {
      opacity: 1;
    }
  }
`
const StyledCardHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: auto;
  padding-bottom: 5px;

  min-height: 20px;
  /* margin-bottom: 10px; */
`

const StyledCardBody = styled.div`
  width: 100%;
  height: 100%;

  margin-top: auto;

  display: flex;

  gap: 15px;

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
  gap: 4px;

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
  position: relative;
  text-align: center;
  height: fit-content;

  .sb-avatar {
    font-family: unset !important;
  }
  :hover {
    .chatButton {
      opacity: 1;
    }
  }
`
const StyledChatButton = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);

  opacity: 0;
  transition: opacity 300ms;
`
const StyledIconWrapper = styled.div`
  /* color: #000; */

  height: 16px;
  width: 16px;
`
const StyledInnerButtonWrapper = styled.div`
  display: flex;
  /* align-items: flex-end; */
  color: #fff;
  gap: 5px;
`
