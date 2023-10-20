import { StyledAgentCard } from 'pages/Agents/AgentCard/AgentCard'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from '@l3-lib/ui-core/dist/Typography'

import Add from '@l3-lib/ui-core/dist/icons/Add'
import TypographyPrimary from 'components/Typography/Primary'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'

type CreateAgentButtonCardProps = {
  onClick: () => void
}

const CreateAgentButtonCard = ({ onClick }: CreateAgentButtonCardProps) => {
  const { t } = useTranslation()
  return (
    <StyledAgentCard onClick={onClick}>
      <StyledInnerWrapper>
        <TypographyPrimary
          value={t('from-scratch')}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
        />
        <StyledAddIcon size={60} />
      </StyledInnerWrapper>
    </StyledAgentCard>
  )
}

export default CreateAgentButtonCard

const StyledInnerWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
