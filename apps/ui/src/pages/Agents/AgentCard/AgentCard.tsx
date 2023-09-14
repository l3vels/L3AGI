import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Tags from '@l3-lib/ui-core/dist/Tags'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import EyeOpen from '@l3-lib/ui-core/dist/icons/EyeOpen'
import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import MoveArrowRight from '@l3-lib/ui-core/dist/icons/MoveArrowRight'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

type AgentCardProps = {
  name: string
  description: string
  headerText?: string
  headerTag?: string
  onEditClick?: () => void
  onDeleteClick?: () => void
  onViewClick: () => void
  onChatClick?: () => void
  onCreateClick?: () => void
  creator?: any
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
  onCreateClick,
  creator,
}: AgentCardProps) => {
  let shortDescription = description
  if (description.length > 85) {
    shortDescription = `${description.slice(0, 85)}...`
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
          <AvatarGenerator name={name} size={50} />
          {onChatClick && (
            <StyledChatButton className='chatButton'>
              <Button
                size={Button.sizes.SMALL}
                kind={Button.kinds.PRIMARY}
                onClick={onChatClick}
                rightIcon={() => <MoveArrowRight size={14} />}
              >
                <StyledInnerButtonWrapper>Chat</StyledInnerButtonWrapper>
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
        {creator && (
          <StyledCreatorWrapper>
            {/* <StyledLogo src={l3Logo} /> */}
            <AvatarGenerator
              name={creator.name}
              size={16}
              textSizeRatio={1.5}
              avatar={creator.avatar}
            />
            <Typography
              value={creator.name}
              type={Typography.types.P}
              size={Typography.sizes.sm}
              customColor={'rgba(255,255,255, 0.6)'}
            />
          </StyledCreatorWrapper>
        )}
        <StyledButtonsWrapper className='footerButtons'>
          {onDeleteClick && (
            <IconButton
              onClick={onDeleteClick}
              icon={() => <Delete />}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              // ariaLabel='Delete'
            />
          )}
          {onEditClick && (
            <IconButton
              onClick={onEditClick}
              icon={() => <Edit />}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              // ariaLabel='Edit'
            />
          )}
          {onViewClick && (
            <IconButton
              onClick={onViewClick}
              icon={() => (
                <StyledIconWrapper>
                  <EyeOpen size={50} />
                </StyledIconWrapper>
              )}
              size={Button.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              // ariaLabel='View'
            />
          )}
          {onCreateClick && (
            <Button size={Button.sizes.SMALL} kind={Button.kinds.PRIMARY} onClick={onCreateClick}>
              Create
            </Button>
          )}
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledAgentCard>
  )
}

export default AgentCard

export const StyledAgentCard = styled.div`
  position: relative;
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

  /* padding: 0 15px; */

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

  /* padding-top: 5px; */
`
const StyledAvatarWrapper = styled.div`
  /* position: relative; */
  text-align: center;
  height: fit-content;

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
  top: 75px;
  left: 10px;
  /* transform: translateX(-50%); */

  opacity: 0;
  transition: opacity 300ms;
`
const StyledIconWrapper = styled.div`
  /* color: #000; */
  color: transparent;
`
const StyledInnerButtonWrapper = styled.div`
  display: flex;
  /* align-items: flex-end; */
  color: #fff;
  gap: 5px;
`

const StyledCreatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
