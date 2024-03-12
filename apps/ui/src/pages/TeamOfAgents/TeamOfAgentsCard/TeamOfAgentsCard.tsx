import styled, { css } from 'styled-components'

import Button from 'share-ui/components/Button/Button'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Typography from 'share-ui/components/typography/Typography'

import Delete from 'share-ui/components/Icon/Icons/components/Delete'
import Edit from 'share-ui/components/Icon/Icons/components/Edit'
import MoveArrowRight from 'share-ui/components/Icon/Icons/components/MoveArrowRight'
import EyeOpen from 'share-ui/components/Icon/Icons/components/EyeOpen'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import Heading from 'share-ui/components/Heading/Heading'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingSecondary from 'components/Heading/Secondary'
import { ButtonPrimary } from 'components/Button/Button'
import { textSlicer } from 'utils/textSlicer'

type TeamOfAgentCardProps = {
  name: string
  description: string
  teamAgents: any[]
  onEditClick?: () => void
  onDeleteClick?: () => void
  onChatClick?: () => void
  onViewClick?: () => void
  creator?: any
  avatar?: string
  teamType?: string
}

const TeamOfAgentCard = ({
  name,
  description,
  teamAgents,
  onDeleteClick,
  onEditClick,
  onChatClick,
  onViewClick,
  creator,
  avatar,
  teamType,
}: TeamOfAgentCardProps) => {
  const { shortText: shortDescription } = textSlicer(description, 120)

  return (
    <StyledCard>
      <StyledMainAvatarWrapper>
        <AvatarGenerator name={name} size={50} isRound={false} avatar={avatar} />
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
      </StyledMainAvatarWrapper>
      <StyledBody>
        <HeadingSecondary type={Heading.types?.h1} value={name} size='xss' />

        <TypographySecondary
          value={shortDescription}
          type={Typography.types.P}
          size={Typography.sizes.sm}
        />

        {teamAgents?.length > 0 && (
          <StyledRowWrapper>
            <TypographyPrimary
              value={'Agents'}
              type={Typography.types.P}
              size={Typography.sizes.md}
            />

            <StyledAvatarsContainer>
              {teamAgents?.map((teamAgents: any) => {
                const { id, agent } = teamAgents

                return (
                  <StyledAvatarWrapper key={id}>
                    <AvatarGenerator name={agent.name} size={40} avatar={agent.avatar} />
                  </StyledAvatarWrapper>
                )
              })}
            </StyledAvatarsContainer>
          </StyledRowWrapper>
        )}

        {teamType && (
          <StyledRowWrapper>
            <TypographyPrimary
              value={'Type'}
              type={Typography.types.P}
              size={Typography.sizes.md}
            />

            <TypographySecondary
              value={teamType}
              type={Typography.types.P}
              size={Typography.sizes.xss}
            />
          </StyledRowWrapper>
        )}
      </StyledBody>
      <StyledCardFooter>
        <StyledButtonsWrapper>
          {onDeleteClick && (
            <StyledButtonWrapper className='footerButtons'>
              <IconButton
                onClick={onDeleteClick}
                icon={() => <StyledDeleteIcon />}
                size={Button.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                // ariaLabel='Delete'
              />
            </StyledButtonWrapper>
          )}

          {onEditClick && (
            <StyledButtonWrapper className='footerButtons'>
              <IconButton
                onClick={onEditClick}
                icon={() => <StyledEditIcon />}
                size={Button.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                // ariaLabel='Edit'
              />
            </StyledButtonWrapper>
          )}

          {onViewClick && (
            <StyledButtonWrapper className='footerButtons'>
              <IconButton
                onClick={onViewClick}
                icon={() => (
                  <StyledIconWrapper>
                    <StyledEyeOpenIcon />
                  </StyledIconWrapper>
                )}
                size={Button.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                // ariaLabel='View'
              />
            </StyledButtonWrapper>
          )}

          {onChatClick && (
            <StyledChatButtonWrapper>
              <ButtonPrimary size={Button.sizes?.SMALL} onClick={onChatClick}>
                <StyledInnerButtonWrapper>
                  Chat
                  <MoveArrowRight size={14} />
                </StyledInnerButtonWrapper>
              </ButtonPrimary>
            </StyledChatButtonWrapper>
          )}
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledCard>
  )
}

export default TeamOfAgentCard

const StyledCard = styled.div`
  position: relative;
  width: 335px;
  min-width: 335px;
  height: 370px;
  min-height: 370px;

  padding: 20px 25px;
  /* padding-top: 30px; */

  border-radius: 22px;
  border: 1px solid transparent;
  /* border: ${({ theme }) => theme.body.border}; */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.body.cardBgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;

  :hover {
    .footerButtons {
      opacity: 1;
    }
  }
`

const StyledCardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  padding-top: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 4px;
  width: 100%;
`
const StyledMainAvatarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledAvatarWrapper = styled.div`
  margin-right: -5px;
  width: fit-content;
`
const StyledButtonWrapper = styled.div`
  opacity: 0;

  transition: opacity 300ms;
  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`
const StyledIconWrapper = styled.div`
  /* color: #000; */
  color: transparent;
`
export const StyledInnerButtonWrapper = styled.div<{ secondary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 10px;
  padding: 10px 18px;

  ${p =>
    p.secondary &&
    css`
      padding: 5px;
    `};
`

const StyledRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  margin-top: auto;
`
const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 8px;
`

const StyledAvatarsContainer = styled.div`
  display: flex;
  align-items: center;
`
export const StyledChatButtonWrapper = styled.div`
  margin-left: auto;
`
const StyledCreatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) =>
    theme.body.backgroundColorPrimary === 'rgb(255, 255, 255)' ? 'red' : 'rgba(0, 0, 0, 0.2)'};
`

export const StyledEyeOpenIcon = styled(EyeOpen)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledDeleteIcon = styled(Delete)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledEditIcon = styled(Edit)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
