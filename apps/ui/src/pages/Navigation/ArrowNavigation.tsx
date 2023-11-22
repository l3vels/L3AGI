import styled, { css } from 'styled-components'

import { useNavigate } from 'react-router-dom'

import IconButton from 'share-ui/components/IconButton/IconButton'

import NavigationChevronLeft from 'share-ui/components/Icon/Icons/components/NavigationChevronLeft'
import NavigationChevronRight from 'share-ui/components/Icon/Icons/components/NavigationChevronRight'

type ArrowNavigationProps = {
  onClick?: () => void
}

const ArrowNavigation = ({ onClick }: ArrowNavigationProps) => {
  const navigate = useNavigate()
  const handleLeftNavigation = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  const handleRightNavigation = () => {
    navigate(+1)
  }

  return (
    <StyledColumnContainer>
      <IconButton
        size={IconButton.sizes?.SMALL}
        icon={() => <StyledNavigationChevronLeft size='16' />}
        kind={IconButton.kinds?.TERTIARY}
        onClick={handleLeftNavigation}
      />

      <StyledButtonWrapper isDisabled={onClick ? true : false}>
        <IconButton
          size={IconButton.sizes?.SMALL}
          icon={() => <StyledNavigationChevronRight size='16' />}
          kind={IconButton.kinds?.TERTIARY}
          onClick={handleRightNavigation}
        />
      </StyledButtonWrapper>
    </StyledColumnContainer>
  )
}

export default ArrowNavigation

const StyledColumnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`
const StyledButtonWrapper = styled.div<{ isDisabled: boolean }>`
  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`

const StyledNavigationChevronLeft = styled(NavigationChevronLeft)`
  path {
    color: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledNavigationChevronRight = styled(NavigationChevronRight)`
  path {
    color: ${({ theme }) => theme.body.iconColor};
  }
`
