import { StyledAgentCard } from 'pages/Agents/AgentCard/AgentCard'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'

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
          type={TypographyTypes.LABEL}
          size={TypographySizes.md}
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
