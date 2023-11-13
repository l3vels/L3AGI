import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { AuthContext } from 'contexts'
import { useModal } from 'hooks'
import AgentCard from 'pages/Agents/AgentCard'
import { StyledCardsWrapper } from 'pages/Agents/Agents'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import {
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import TypographySecondary from 'components/Typography/Secondary'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import DiscoverSystemAgents from './components/DiscoverSystemAgents'
import DiscoverTeamAgents from './components/DiscoverTeamAgents'
import DiscoverTemplateAgents from './components/DiscoverTemplateAgents'
import HeadingPrimary from 'components/Heading/Primary'
import { useDiscover } from './useDiscover'

const Discover = () => {
  const { user } = React.useContext(AuthContext)

  const navigate = useNavigate()

  const { openModal } = useModal()

  const { templateAgents } = useDiscover()

  return (
    <StyledRoot>
      
      {/* {<DiscoverSystemAgents />} */}

      <DiscoverTemplateAgents/>

      <DiscoverTeamAgents />


      {/* {!user && <Toolkit isPublic />} */}
    </StyledRoot>
  )
}

export default Discover




export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`

const StyledHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 10px;
`
const StyledHeadingPrimary = styled(HeadingPrimary)`
  font-size: 40px;
`

