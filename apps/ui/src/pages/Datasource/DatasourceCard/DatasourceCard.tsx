import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Typography from 'share-ui/components/typography/Typography'
import CheckIcon from 'share-ui/components/Icon/Icons/components/Check'
import BulletIcon from 'share-ui/components/Icon/Icons/components/Bullet'
import CloseIcon from 'share-ui/components/Icon/Icons/components/CloseSmall'

import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyTertiary from 'components/Typography/Tertiary'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'
import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { textSlicer } from 'utils/textSlicer'
import { Nullable } from 'types'

type DatasourceCardProps = {
  name: string
  description: string
  status: string
  error: Nullable<string>
  onEditClick: () => void
  onDeleteClick: () => void
  imageSrc: string
}

export const getStatusIcon = (status: string) => {
  if (status === 'Ready') {
    return <CheckIcon />
  } else if (status === 'Indexing') {
    return <BulletIcon />
  } else if (status === 'Failed') {
    return <CloseIcon />
  }
}

const DatasourceCard = ({
  name,
  description,
  status,
  error,
  onEditClick,
  onDeleteClick,
  imageSrc,
}: DatasourceCardProps) => {
  const { shortText: shortDescription } = textSlicer(description, 45)

  const statusIcon = getStatusIcon(status)

  return (
    <StyledCard>
      <StyledBodyWrapper>
        <StyledImg src={imageSrc} />
        <StyledTextWrapper>
          <StyledNameWrapper>
            <TypographyPrimary value={name} type={Typography.types.P} size={Typography.sizes.md} />
          </StyledNameWrapper>
          <TypographySecondary
            value={shortDescription}
            type={Typography.types.P}
            size={Typography.sizes.sm}
          />
        </StyledTextWrapper>
      </StyledBodyWrapper>

      <StyledCardFooter>
        <Tooltip
          content={error ? <span>{error}</span> : <span>Ready</span>}
          position={Tooltip.positions.BOTTOM}
          showDelay={100}
        >
          <StyledStatus>
            {statusIcon}

            <TypographyTertiary
              value={status}
              type={Typography.types.P}
              size={Typography.sizes.xss}
            />
          </StyledStatus>
        </Tooltip>

        <StyledButtonsWrapper>
          <IconButton
            onClick={onDeleteClick}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Delete'
          />
          <IconButton
            onClick={onEditClick}
            icon={() => <StyledEditIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Edit'
          />
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledCard>
  )
}

export default DatasourceCard

const StyledCard = styled.div`
  position: relative;
  width: 248px;
  min-width: 248px;
  height: 170px;
  min-height: 170px;
  /* border: ${({ theme }) => theme.body.border}; */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  background: ${({ theme }) => theme.body.cardBgColor};
  /* background: rgba(0, 0, 0, 0.4); */

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */

  padding: 10px;
  padding-bottom: 0px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 2px;
  margin-top: auto;
  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`

const StyledBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
  padding: 8px 10px;

  height: 100%;
  overflow: hidden;
  line-height: 14px;
  text-align: center;
`
const StyledImg = styled.img`
  border-radius: 8px;
  width: 48px;
  height: 48px;
  object-fit: contain;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledNameWrapper = styled.div`
  margin-top: auto;
  text-align: center;
`

const StyledCardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  /* padding-top: 5px; */

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 0 2px;
`
