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
import {
  StyledChatButtonWrapper,
  StyledInnerButtonWrapper,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import TypographySecondary from 'components/Typography/TypographySecondary'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/TypographyTertiary'

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
  avatar?: string
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
  avatar,
}: AgentCardProps) => {
  let shortDescription = description
  if (description.length > 75) {
    shortDescription = `${description.slice(0, 75)}...`
  }

  let shortHeaderTag = headerTag
  if (headerTag && headerTag?.length > 40) {
    shortHeaderTag = `${headerTag.slice(0, 40)}...`
  }

  return (
    <StyledAgentCard>
      <StyledCardHeader>
        <div>
          {headerText && (
            <TypographySecondary
              value={headerText}
              type={Typography.types.P}
              size={Typography.sizes.sm}
            />
          )}
        </div>

        <div>{headerTag && <Tags label={shortHeaderTag} readOnly size='small' outlined />}</div>
      </StyledCardHeader>
      <StyledCardBody>
        <StyledAvatarWrapper>
          <AvatarGenerator name={name} size={50} avatar={avatar} />
        </StyledAvatarWrapper>
        <StyledBodyTextWrapper>
          <TypographyPrimary value={name} type={Typography.types.P} size={Typography.sizes.lg} />

          <TypographySecondary
            value={shortDescription}
            type={Typography.types.P}
            size={Typography.sizes.sm}
          />
        </StyledBodyTextWrapper>
      </StyledCardBody>
      <StyledCardFooter className='cardFooter'>
        {creator && (
          <StyledCreatorWrapper>
            {/* <StyledLogo src={l3Logo} /> */}
            <AvatarGenerator
              name={creator.name}
              size={16}
              textSizeRatio={1.5}
              avatar={creator.avatar}
            />

            <TypographyTertiary
              value={creator.name}
              type={Typography.types.P}
              size={Typography.sizes.xss}
            />
          </StyledCreatorWrapper>
        )}
        <StyledButtonsWrapper>
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
              size={IconButton.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              // ariaLabel='Edit'
            />
          )}
          {onViewClick && (
            <IconButton
              onClick={onViewClick}
              icon={() => (
                <StyledIconWrapper>
                  <StyledEyeOpenIcon size={50} />
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
          {onChatClick && (
            <StyledChatButtonWrapper>
              <Button size={Button.sizes.SMALL} kind={Button.kinds.PRIMARY} onClick={onChatClick}>
                <StyledInnerButtonWrapper secondary>
                  Chat
                  <MoveArrowRight size={14} />
                </StyledInnerButtonWrapper>
              </Button>
            </StyledChatButtonWrapper>
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

  border-radius: 22px;

  /* background: rgba(0, 0, 0, 0.5); */
  background: ${({ theme }) => theme.body.cardBgColor};
  border: ${({ theme }) => theme.body.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover {
    .cardFooter {
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
  opacity: 0;
  transition: opacity 800ms;
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
`

const StyledIconWrapper = styled.div`
  /* color: #000; */
  color: transparent;
`

const StyledCreatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const StyledEyeOpenIcon = styled(EyeOpen)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
