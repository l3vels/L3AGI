import styled, { css } from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import moment from 'moment'
import TypographyTertiary from 'components/Typography/Tertiary'

type NotificationItemProps = {
  onClick: () => void
  image: string
  create_date: Date
  typename: string
  unread: boolean
  showOne: boolean
  description: any
}

const NotificationItem = ({
  onClick,
  image,
  create_date,
  typename,
  unread,
  showOne,
  description,
}: NotificationItemProps) => {
  return (
    <StyledNotification showOne={showOne} className='stack' onClick={onClick}>
      {unread && <StyledReadDot />}

      <StyledImg src={image} />

      <StyledTextWrapper>
        <StyledText>{description}</StyledText>

        <StyledText>
          <TypographyTertiary
            value={moment(create_date).fromNow()}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
          />
          <StyledDot />
          <TypographyTertiary
            value={typename}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
          />
        </StyledText>
      </StyledTextWrapper>
    </StyledNotification>
  )
}

export default NotificationItem

const StyledNotification = styled.div<{ showOne: boolean }>`
  display: flex;

  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 500px;
  height: 78px;

  background: rgba(255, 255, 255, 0.1);
  /* Blur/cake */

  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 16px;

  ${props =>
    props.showOne &&
    css`
      background: rgba(255, 255, 255, 0.3);
      width: 460px;
    `}

  ${props =>
    !props.showOne &&
    css`
      transition: 0.3s ease background;
      &:hover {
        background: rgba(255, 255, 255, 0.4);
        cursor: pointer;
      }
    `}
`

const StyledText = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const StyledTextWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
`
const StyledDot = styled.div`
  width: 4px;
  height: 4px;

  /* Content ++/on color secondary */

  background: rgba(255, 255, 255, 0.8);

  border-radius: 100px;
`

const StyledImg = styled.img`
  width: 60px;
  height: 78px;

  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  border-radius: 16px 0px 16px 16px;

  object-fit: cover;
`

const StyledReadDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  right: 8px;
  top: calc(50% - 8px / 2);

  border-radius: 100px;
  background: linear-gradient(180deg, #eea03c 0%, #e85c29 100%);
`
