import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'
import NavigationChevronLeft from 'share-ui/components/Icon/Icons/components/NavigationChevronLeft'
import IconButton from 'share-ui/components/IconButton/IconButton'
import styled from 'styled-components'
import { useDomainConfig } from 'utils/useDomainConfig'

const ChatWindowHeader = ({
  closeWindow,
  onBackClick,
}: {
  closeWindow: () => void
  onBackClick?: () => void
}) => {
  const { getDomainConfig } = useDomainConfig()
  const domainLogo = getDomainConfig('logo')

  return (
    <StyledChatWindowHeader>
      <StyledButtonWrapper>
        <IconButton
          onClick={onBackClick}
          icon={() => <NavigationChevronLeft />}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          // ariaLabel='Delete'
          disabled={!onBackClick}
        />
      </StyledButtonWrapper>
      <StyledLogoWrapper>
        <StyledLogo src={domainLogo} alt='Logo' />
      </StyledLogoWrapper>

      <IconButton
        onClick={closeWindow}
        icon={() => <StyledCloseIcon />}
        size={IconButton.sizes?.SMALL}
        kind={IconButton.kinds?.TERTIARY}
        // ariaLabel='Delete'
      />
    </StyledChatWindowHeader>
  )
}

export default ChatWindowHeader

const StyledChatWindowHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto; /* Left, Center, Right */
  align-items: center; /* Center vertically */

  width: 100%;
  height: 60px;
  border-radius: 10px 10px 0px 0px;

  padding: 5px;
`
const StyledLogoWrapper = styled.div`
  justify-self: center;
`

const StyledLogo = styled.img`
  width: 48px;
  height: 48px;
`
const StyledButtonWrapper = styled.div``
