import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'
import { Retry } from 'share-ui/components/Icon/Icons'
import NavigationChevronLeft from 'share-ui/components/Icon/Icons/components/NavigationChevronLeft'
import IconButton from 'share-ui/components/IconButton/IconButton'
import styled from 'styled-components'

const ChatWindowHeader = ({
  closeWindow,
  onBackClick,
  restart,
  name,
  avatar,
}: {
  closeWindow: () => void
  onBackClick?: () => void
  restart?: () => void
  name?: string
  avatar?: string
}) => {
  return (
    <StyledChatWindowHeader>
      <StyledButtonWrapper>
        {onBackClick && (
          <IconButton
            onClick={onBackClick}
            icon={() => <NavigationChevronLeft />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            // ariaLabel='Delete'
          />
        )}
        {restart && (
          <IconButton
            onClick={restart}
            icon={() => <Retry />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='New conversation'
          />
        )}
      </StyledButtonWrapper>
      <StyledLogoWrapper>
        {name && <AvatarGenerator name={name} avatar={avatar} size={50} />}
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
const StyledButtonWrapper = styled.div`
  width: 40px;
`
