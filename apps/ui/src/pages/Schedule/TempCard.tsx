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

      <StyledBody>
        <TypographyPrimary value={shortName} size={Typography.sizes.lg} />
        <TypographySecondary value={shortdescription} size={Typography.sizes.sm} />
      </StyledBody>

      <StyledFooter className='hiddenFooter'>
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
      </StyledFooter>
    </StyledCard>
  )
}

export default TempCard

const StyledCard = styled.div`
  position: relative;

  width: 248px;
  min-width: 248px;
  height: 158px;
  min-height: 158px;

  /* padding: 20px; */

  background: ${({ theme }) => theme.body.cardBgColor};
  border: ${({ theme }) => theme.body.border};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: space-between;

  :hover {
    .hiddenFooter {
      opacity: 1;
    }
  }
`
const StyledButtonsWrapper = styled.div`
  position: absolute;
  right: 5px;

  opacity: 0;
`
const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  width: 100%;

  opacity: 0;
`
const StyledBody = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`
