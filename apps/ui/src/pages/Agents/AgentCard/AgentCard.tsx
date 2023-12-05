import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Button from 'share-ui/components/Button/Button'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Typography from 'share-ui/components/typography/Typography'

import MoveArrowRight from 'share-ui/components/Icon/Icons/components/MoveArrowRight'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import {
  StyledChatButtonWrapper,
  StyledDeleteIcon,
  StyledEditIcon,
  StyledEyeOpenIcon,
  StyledInnerButtonWrapper,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'
import { ButtonPrimary } from 'components/Button/Button'
import { textSlicer } from 'utils/textSlicer'
import { AgentWithConfigs } from 'types'

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
  creator?: AgentWithConfigs['agent']['creator']
  avatar?: string
}

const AgentCard = ({
  name,
  description,
  headerTag,
  onDeleteClick,
  onEditClick,
  onViewClick,
  onChatClick,
  onCreateClick,
  creator,
  avatar,
}: AgentCardProps) => {
  const { t } = useTranslation()
  const { shortText: shortDescription } = textSlicer(description, 130)
  const { shortText: shortName } = textSlicer(name, 25)

  let shortHeaderTag
  if (headerTag) {
    const { shortText } = textSlicer(headerTag, 40)
    shortHeaderTag = shortText
  }

  return (
    <StyledAgentCard>
      <StyledCardHeader>
        <StyledAvatarWrapper>
          <AvatarGenerator name={name} size={50} avatar={avatar} />
        </StyledAvatarWrapper>

        <StyledTitleWrapper>
          <TypographyPrimary
            value={shortName}
            type={Typography.types.P}
            size={Typography.sizes.lg}
          />
          <div>
            {headerTag && (
              <TypographySecondary
                value={shortHeaderTag}
                type={Typography.types.P}
                size={Typography.sizes.sm}
              />
            )}
          </div>
        </StyledTitleWrapper>
      </StyledCardHeader>
      <StyledCardBody>
        <StyledBodyTextWrapper>
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
              icon={() => <StyledDeleteIcon />}
              size={Button.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
            />
          )}
          {onEditClick && (
            <IconButton
              onClick={onEditClick}
              icon={() => <StyledEditIcon />}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
            />
          )}
          {onViewClick && (
            <IconButton
              onClick={onViewClick}
              icon={() => (
                <StyledIconWrapper>
                  <StyledEyeOpenIcon />
                </StyledIconWrapper>
              )}
              size={Button.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
            />
          )}
          {onCreateClick && (
            <ButtonPrimary size={Button.sizes?.SMALL} onClick={onCreateClick}>
              {t('create')}
            </ButtonPrimary>
          )}
          {onChatClick && (
            <StyledChatButtonWrapper>
              <ButtonPrimary size={Button.sizes?.SMALL} onClick={onChatClick}>
                <StyledInnerButtonWrapper secondary>
                  {t('chat')}
                  <MoveArrowRight size={14} />
                </StyledInnerButtonWrapper>
              </ButtonPrimary>
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
  height: 190px;
  min-height: 190px;

  padding: 15px;
  padding-bottom: 10px;

  border-radius: 22px;

  /* background: rgba(0, 0, 0, 0.5); */
  background: ${({ theme }) => theme.body.cardBgColor};
  /* border: ${({ theme }) => theme.body.border}; */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover {
    .cardFooter {
      opacity: 1;
    }
  }

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`
const StyledCardHeader = styled.div`
  width: 100%;

  padding: 20px 0;

  display: flex;
  align-items: center;
  gap: 10px;
  /* justify-content: space-between; */

  margin-bottom: 5px;
  /* padding-bottom: 5px; */
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

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
