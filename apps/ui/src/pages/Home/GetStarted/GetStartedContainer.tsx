import { ReactNode, useState } from 'react'

import styled, { css } from 'styled-components'

import Heading from 'share-ui/components/Heading/Heading'
import Typography from 'share-ui/components/typography/Typography'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import Connect from 'share-ui/components/Icon/Icons/components/Connect'
import ScrollContainer from 'react-indiana-drag-scroll'
import { SectionDivider } from 'styles/globalStyle.css'
import TypographyTertiary from 'components/Typography/Tertiary'
import HeadingPrimary from 'components/Heading/Primary'

type GetStartedContainerProps = {
  children: ReactNode
  bottomBorder?: boolean
  noText?: boolean
}

const GetStartedContainer = ({
  children,
  bottomBorder = false,
  noText,
}: GetStartedContainerProps) => {
  const [show, setShow] = useState(true)

  return (
    <StyledGetStarted show={show} bottomBorder={bottomBorder}>
      <StyledHeader>
        <StyledColumn>
          <StyledCloseButton onClick={() => setShow(false)}>
            <StyledCloseIcon />
          </StyledCloseButton>
          {!noText && <HeadingPrimary type={Heading.types?.h1} value='Get Started' size='xss' />}
        </StyledColumn>
        {!noText && (
          <StyledColumn>
            <StyledTypographyWrapper>
              <TypographyTertiary
                value='Learns'
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
            </StyledTypographyWrapper>

            <StyledIconWrapper>
              <StyledConnectIcon />
            </StyledIconWrapper>
          </StyledColumn>
        )}
      </StyledHeader>

      <StyledDragScroll>{children}</StyledDragScroll>
      <SectionDivider />
    </StyledGetStarted>
  )
}

export default GetStartedContainer

const StyledGetStarted = styled.div<{ show: boolean; bottomBorder: boolean }>`
  // max-width: 1000px;
  // min-width: 500px;

  display: none;
  ${p =>
    p.show &&
    css`
      display: block;
    `};
  ${p =>
    p.bottomBorder &&
    css`
      padding-bottom: 32px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    `};
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`

const StyledColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`

const StyledIconWrapper = styled.div`
  color: rgba(255, 255, 255, 0.6);
  width: 10px;
`
const StyledDragScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;

  margin-bottom: 20px;
`
const StyledCloseButton = styled.div`
  cursor: pointer;
`
const StyledTypographyWrapper = styled.div`
  color: ${({ theme }) => theme.body.mainNavColor};
`

export const StyledCloseIcon = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledConnectIcon = styled(Connect)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
