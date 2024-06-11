import styled from 'styled-components'

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

  background: ${({ theme }) => theme.body.cardBgColor};
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
export const StyledCardHeader = styled.div`
  width: 100%;

  padding-bottom: 12px;

  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 5px;

  min-height: 20px;
`

export const StyledCardBody = styled.div`
  width: 100%;
  height: 100%;

  margin-top: auto;

  display: flex;

  gap: 15px;

  overflow: hidden;
`

export const StyledBodyTextWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;

  max-height: 70px;
`
export const StyledAvatarWrapper = styled.div`
  text-align: center;
  height: fit-content;
`
export const StyledIcon = styled.span`
  font-size: 30px;
`

export const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`
export const StyledImg = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;

  border-radius: 8px;
`
export const StyledSwitcherWrapper = styled.div`
  margin-left: auto;
`
export const StyledIconWrapper = styled.div`
  /* color: #000; */
  color: transparent;
`
export const StyledButtonWrapper = styled.div`
  margin-left: auto;
  opacity: 0;
`
