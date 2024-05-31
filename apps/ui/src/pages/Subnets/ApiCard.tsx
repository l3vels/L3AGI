import styled from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'

import { textSlicer } from 'utils/textSlicer'
import Switcher from './Switcher'

import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledEyeOpenIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import Button from 'share-ui/components/Button/Button'

type ApiCardProps = {
  name: string
  description: string
  headerText?: string
  headerTag?: string
  avatar?: string
  icon?: string
  onViewClick?: () => void
}

const ApiCard = ({ name, description, headerTag, avatar, icon, onViewClick }: ApiCardProps) => {
  const { shortText: shortName } = textSlicer(name, 25)

  let shortHeaderTag
  if (headerTag) {
    const { shortText } = textSlicer(headerTag, 40)
    shortHeaderTag = shortText
  }

  return (
    <StyledApiCard>
      <StyledCardHeader>
        <StyledAvatarWrapper>
          {icon ? <StyledIcon>{icon}</StyledIcon> : <StyledImg src={avatar} />}
        </StyledAvatarWrapper>

        <StyledTitleWrapper>
          <TypographyPrimary
            value={shortName}
            type={Typography.types.P}
            size={Typography.sizes.sm}
          />
        </StyledTitleWrapper>

        <StyledSwitcherWrapper>
          <Switcher />
        </StyledSwitcherWrapper>
      </StyledCardHeader>
      <StyledCardBody>
        <StyledBodyTextWrapper>
          <TypographySecondary
            value={description}
            type={Typography.types.P}
            size={Typography.sizes.sm}
          />
        </StyledBodyTextWrapper>
      </StyledCardBody>

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
    </StyledApiCard>
  )
}

export default ApiCard

export const StyledApiCard = styled.div`
  position: relative;
  width: 335px;
  min-width: 335px;
  height: 170px;
  min-height: 170px;

  padding: 15px;
  padding-bottom: 10px;
  padding-top: 20px;

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
    .footerButtons {
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

  padding-bottom: 12px;

  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 5px;

  min-height: 20px;
`

const StyledCardBody = styled.div`
  width: 100%;
  height: 100%;

  margin-top: auto;

  display: flex;

  gap: 15px;

  overflow: hidden;
`

const StyledBodyTextWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;

  max-height: 70px;
`
const StyledAvatarWrapper = styled.div`
  text-align: center;
  height: fit-content;
`
const StyledIcon = styled.span`
  font-size: 30px;
`

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`
const StyledImg = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;

  border-radius: 8px;
`
const StyledSwitcherWrapper = styled.div`
  margin-left: auto;
`
const StyledIconWrapper = styled.div`
  /* color: #000; */
  color: transparent;
`
const StyledButtonWrapper = styled.div`
  margin-left: auto;
  opacity: 0;
`
