import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Tags from '@l3-lib/ui-core/dist/Tags'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import MoveArrowRight from '@l3-lib/ui-core/dist/icons/MoveArrowRight'

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
              'https://lablab.ai/_next/image?url=https%3A%2F%2Fimagedelivery.net%2FK11gkZF3xaVyYzFESMdWIQ%2F22285de8-b832-420f-4a42-fe5120654400%2Ffull&w=3840&q=100'
            }
            type={Avatar.types.IMG}
            // ariaLabel='Hadas Fahri'
          />
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
            value={description}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255, 0.8)'}
          />
        </StyledBodyTextWrapper>
      </StyledCardBody>
      <StyledCardFooter>
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

  :hover {
    .footerButtons {
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
  gap: 4px;

  margin-left: auto;
  transition: opacity 300ms;
  opacity: 0;
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
  height: fit-content;
  position: relative;
  /* background: red; */

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
  bottom: -25px;
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
