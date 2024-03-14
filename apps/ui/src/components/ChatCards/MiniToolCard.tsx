import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { StyledAgentWrapper, StyledIconButtonWrapper } from './TeamChatCard'
import MemberText from 'modals/AIChatModal/components/ChatMembers/components/MemberText'
import styled from 'styled-components'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledDeleteIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { Nullable } from 'types'
import { StyledStatus, getStatusIcon } from 'pages/Datasource/DatasourceCard/DatasourceCard'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'
import TypographyTertiary from 'components/Typography/Tertiary'
import Typography from 'share-ui/components/typography/Typography'

type MiniToolCardProps = {
  onClick: () => void
  onViewClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
  picked?: boolean
  name: string
  logo: string
  status?: Nullable<string>
  error?: Nullable<string>
}

const MiniToolCard = ({
  picked = false,
  onClick,
  logo,
  name,
  onDeleteClick,
  status,
  error,
}: MiniToolCardProps) => {
  const handleDelete = (event: any) => {
    event.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  let statusIcon
  if (status) {
    statusIcon = getStatusIcon(status)
  }

  return (
    <StyledAgentWrapper onClick={onClick} picked={picked}>
      <StyledImg src={logo} />

      <MemberText name={name} />

      <StyledIconButtonWrapper className='hiddenButton'>
        {onDeleteClick && (
          <IconButton
            onClick={handleDelete}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Delete'
          />
        )}
      </StyledIconButtonWrapper>

      {status && (
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
      )}
    </StyledAgentWrapper>
  )
}

export default MiniToolCard

const StyledImg = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 8px;
`
