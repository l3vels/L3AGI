import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Typography from 'share-ui/components/typography/Typography'
import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { textSlicer } from 'utils/textSlicer'

const TempCard = ({
  name,
  description,
  onDeleteClick,
  onEditClick,
}: {
  name: string
  description: string
  onDeleteClick?: () => void
  onEditClick?: () => void
}) => {
  const { shortText: shortName } = textSlicer(name, 20)
  const { shortText: shortdescription } = textSlicer(description, 60)

  return (
    <StyledCard>
      {/* <MemberText name={name} role={description} /> */}

      <TypographyPrimary value={shortName} size={Typography.sizes.lg} />
      <TypographySecondary value={shortdescription} size={Typography.sizes.sm} />

      <StyledButtonsWrapper className='hiddenButtons'>
        {onDeleteClick && (
          <IconButton
            onClick={onDeleteClick}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            // ariaLabel='Delete'
          />
        )}
        {onEditClick && (
          <IconButton
            onClick={onEditClick}
            icon={() => <StyledEditIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            // ariaLabel='Edit'
          />
        )}
      </StyledButtonsWrapper>
    </StyledCard>
  )
}

export default TempCard

const StyledCard = styled.div`
  position: relative;

  width: 300px;
  min-width: 300px;
  height: 130px;
  min-height: 130px;

  padding: 0px 20px;

  background: ${({ theme }) => theme.body.cardBgColor};
  border: ${({ theme }) => theme.body.border};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  justify-content: center;

  :hover {
    .hiddenButtons {
      opacity: 1;
    }
  }
`
const StyledButtonsWrapper = styled.div`
  position: absolute;
  right: 5px;

  opacity: 0;
`
