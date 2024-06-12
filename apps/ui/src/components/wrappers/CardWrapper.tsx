import styled from 'styled-components'

const CardWrapper = ({ children }: { children: any }) => {
  return <StyledWrapper>{children}</StyledWrapper>
}

export default CardWrapper

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.body.cardBgColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;

  border-radius: 22px;

  padding: 20px;
`
