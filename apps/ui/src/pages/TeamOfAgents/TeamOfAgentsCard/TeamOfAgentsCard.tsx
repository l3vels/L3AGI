import styled, { css } from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import MoveArrowRight from '@l3-lib/ui-core/dist/icons/MoveArrowRight'
import EyeOpen from '@l3-lib/ui-core/dist/icons/EyeOpen'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import Heading from '@l3-lib/ui-core/dist/Heading'

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
  let shortDescription = description || ''
  if (description.length > 150) {
    shortDescription = `${description.slice(0, 150)}...`
  }

  return (
    <StyledCard>
      <StyledMainAvatarWrapper>
        <AvatarGenerator name={name} size={28} isRound={false} avatar={avatar} />
        <StyledCreatorWrapper>
          <AvatarGenerator
            name={creator.name}
            size={16}
            textSizeRatio={1.5}
            avatar={creator.avatar}
          />
          <StyledCreatorNameWrapper>
            <Typography
              value={creator.name}
              type={Typography.types.P}
              size={Typography.sizes.xss}
              // customColor={'rgba(255,255,255, 0.6)'}
            />
          </StyledCreatorNameWrapper>
        </StyledCreatorWrapper>
      </StyledMainAvatarWrapper>
      <StyledBody>
        <StyledTextWrapper>
          <Heading type={Heading.types.h1} value={name} size='medium' />
        </StyledTextWrapper>

        <StyledShortDescription>
          <Typography
            value={shortDescription}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            // customColor={'rgba(255,255,255, 0.8)'}
          />
        </StyledShortDescription>

        {teamAgents?.length > 0 && (
          <StyledRowWrapper>
            <StyledTextWrapper>
              <Typography
                value={'Agents'}
                type={Typography.types.P}
                size={Typography.sizes.md}
                // customColor={'#FFF'}
              />
            </StyledTextWrapper>

            <StyledAvatarsContainer>
              {teamAgents?.map((teamAgents: any) => {
                const { id, agent } = teamAgents

                return (
                  <StyledAvatarWrapper key={id}>
                    <AvatarGenerator name={agent.name} size={25} avatar={agent.avatar} />
                  </StyledAvatarWrapper>
                )
              })}
            </StyledAvatarsContainer>
          </StyledRowWrapper>
        )}

        {teamType && (
          <StyledRowWrapper>
            <StyledTextWrapper>
              <Typography
                value={'Type'}
                type={Typography.types.P}
                size={Typography.sizes.md}
                // customColor={'#FFF'}
              />
            </StyledTextWrapper>
            <StyledShortDescription>
              <Typography
                value={teamType}
                type={Typography.types.P}
                size={Typography.sizes.xss}
                // customColor={'rgba(255,255,255,0.8)'}
              />
            </StyledShortDescription>
          </StyledRowWrapper>
        )}
      </StyledBody>
      <StyledCardFooter>
        <StyledButtonsWrapper>
          {onDeleteClick && (
            <StyledButtonWrapper className='footerButtons'>
              <IconButton
                onClick={onDeleteClick}
                icon={() => <Delete />}
                size={Button.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
                // ariaLabel='Delete'
              />
            </StyledButtonWrapper>
          )}

          {onEditClick && (
            <StyledButtonWrapper className='footerButtons'>
              <IconButton
                onClick={onEditClick}
                icon={() => <Edit />}
                size={Button.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
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
                    <StyledEyeOpenIcon size={50} />
                  </StyledIconWrapper>
                )}
                size={Button.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
                // ariaLabel='View'
              />
            </StyledButtonWrapper>
          )}

          {onChatClick && (
            <StyledChatButtonWrapper>
              <Button size={Button.sizes.SMALL} kind={Button.kinds.PRIMARY} onClick={onChatClick}>
                <StyledInnerButtonWrapper>
                  Chat
                  <MoveArrowRight size={14} />
                </StyledInnerButtonWrapper>
              </Button>
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
  width: 320px;
  min-width: 320px;
  height: 370px;
  min-height: 370px;

  padding: 20px 25px;
  /* padding-top: 30px; */

  border-radius: 10px;
  border: ${({ theme }) => theme.body.border};
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
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
const StyledTextWrapper = styled.div`
  color: ${({ theme }) => theme.body.textColorSecondary};
`
const StyledShortDescription = styled.div`
  color: ${({ theme }) => theme.body.textColorSecondary};
`
const StyledCreatorNameWrapper = styled.div`
  color: ${({ theme }) => theme.body.textColorSecondary};
`
const StyledEyeOpenIcon = styled(EyeOpen)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
