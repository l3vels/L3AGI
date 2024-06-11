import Typography from 'share-ui/components/typography/Typography'

import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'

import { textSlicer } from 'utils/textSlicer'
import Switcher from './Switcher'

import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledEyeOpenIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import Button from 'share-ui/components/Button/Button'
import {
  StyledApiCard,
  StyledAvatarWrapper,
  StyledBodyTextWrapper,
  StyledCardHeader,
  StyledIcon,
  StyledImg,
  StyledSwitcherWrapper,
  StyledTitleWrapper,
  StyledCardBody,
  StyledButtonWrapper,
  StyledIconWrapper,
} from './ApiCardStyles'

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
