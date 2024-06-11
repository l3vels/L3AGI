import React from 'react'

import styled from 'styled-components'
import Agents from 'pages/Agents'
import { AuthContext } from 'contexts'
import DiscoverTeamAgents from 'pages/Discover/components/DiscoverTeamAgents'
import TeamOfAgents from 'pages/TeamOfAgents'
import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents'
import { useAgents } from 'pages/Agents/useAgents'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import DiscoverSystemAgents from 'pages/Discover/components/DiscoverSystemAgents'
import { StyledHeaderGroup, StyledSectionWrapper } from './homeStyle.css'
import HeadingPrimary from 'components/Heading/Primary'
import Heading from 'share-ui/components/Heading/Heading'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledCardsWrapper } from 'pages/Agents/Agents'
import { SUBNETS } from 'pages/Subnets/constants'
import ApiCard from 'pages/Subnets/ApiCard'

import PodsMainCard from 'pages/Pods/PodsMainCard'
import { useNavigate } from 'react-router-dom'
import LogsPanel from 'pages/Subnets/panels/LogsPanel/LogsPanel'
import SDKs from 'pages/Subnets/SDKs'
import { useAppModeContext } from 'context/AppModeContext'

const Home = () => {
  const { user } = React.useContext(AuthContext)
  const navigate = useNavigate()

  const domainEnv = import.meta.env
  const isDatura = domainEnv.REACT_APP_ENV === 'datura'

  const { teamOfAgents } = useTeamOfAgents()
  const { agentsData } = useAgents()

  const { getHomeModules } = useGetAccountModule()

  const teamModules = getHomeModules('team')
  const agentModules = getHomeModules('agent')

  const TEMP_DATA = [
    {
      name: 'RTX 4090',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '28 vCPU',
      id: 1,
      uptime: '11d',
      cpu: { utl: 10, mem: 50 },
      gpu: { utl: 50, mem: 20 },
    },
    {
      name: 'RTX 6000 Ada',
      price: '$2.01/hr',
      ram: '32 GB RAM',
      vram: '150 GB RAM',
      cram: '32 vCPU',
      id: 5,
      uptime: '1d',
      cpu: { utl: 5, mem: 0 },
      gpu: { utl: 10, mem: 10 },
    },
    {
      name: 'H100 PCIe',
      price: '$0.74/hr',
      ram: '48 GB RAM',
      vram: '125 GB RAM',
      cram: '32 vCPU',
      id: 14,
      uptime: '20d',
      cpu: { utl: 70, mem: 20 },
      gpu: { utl: 10, mem: 80 },
    },
  ]

  const { computeMode, subnetMode } = useAppModeContext()

  return (
    <>
      {user ? (
        <StyledWrapper>
          {isDatura ? (
            <>
              {computeMode && (
                <>
                  <StyledSectionWrapper>
                    <StyledHeaderGroup className='header_group'>
                      <StyledMainHeaderWrapper>
                        <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Pods`} />
                      </StyledMainHeaderWrapper>
                    </StyledHeaderGroup>

                    <ComponentsWrapper noPadding>
                      <StyledCardsWrapper>
                        {TEMP_DATA.slice(0, 3).map(data => {
                          return (
                            <PodsMainCard
                              key={data.name}
                              name={data.name}
                              description={`${data.cram} ${data.ram}`}
                              teamAgents={[]}
                              onViewClick={() => navigate('/pods/create-pod')}
                              price={data.price}
                              uptime={data.uptime}
                              cpu={data.cpu}
                              gpu={data.gpu}
                            />
                          )
                        })}
                      </StyledCardsWrapper>
                    </ComponentsWrapper>
                  </StyledSectionWrapper>

                  <StyledSectionWrapper>
                    <StyledHeaderGroup>
                      <StyledMainHeaderWrapper>
                        <HeadingPrimary type={Heading.types?.h1} size='xss' value={`SDKs`} />
                      </StyledMainHeaderWrapper>
                    </StyledHeaderGroup>

                    <ComponentsWrapper>
                      <SDKs />
                    </ComponentsWrapper>
                  </StyledSectionWrapper>
                </>
              )}

              {subnetMode && (
                <>
                  <StyledSectionWrapper>
                    <StyledHeaderGroup className='header_group'>
                      <StyledMainHeaderWrapper>
                        <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Subnet APIs`} />
                      </StyledMainHeaderWrapper>
                    </StyledHeaderGroup>

                    <ComponentsWrapper noPadding>
                      <StyledCardsWrapper>
                        {SUBNETS[1].apis.map(api => {
                          return (
                            <ApiCard
                              key={api.name}
                              name={api.name}
                              description={api.description}
                              avatar={api.logo}
                              onViewClick={() => navigate('/subnets')}
                            />
                          )
                        })}
                      </StyledCardsWrapper>
                    </ComponentsWrapper>
                  </StyledSectionWrapper>

                  <StyledSectionWrapper>
                    <StyledHeaderGroup>
                      <StyledMainHeaderWrapper>
                        <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Latest Logs`} />
                      </StyledMainHeaderWrapper>
                    </StyledHeaderGroup>

                    <ComponentsWrapper>
                      <LogsPanel />
                    </ComponentsWrapper>
                  </StyledSectionWrapper>
                </>
              )}
            </>
          ) : (
            <>
              {teamModules?.list &&
                (teamOfAgents?.length > 0 ? <TeamOfAgents isHome /> : <DiscoverTeamAgents />)}

              {agentModules?.list && agentsData?.length > 0 ? (
                <Agents isHome />
              ) : (
                <DiscoverSystemAgents />
              )}
            </>
          )}
        </StyledWrapper>
      ) : (
        <>
          <DiscoverTeamAgents />
          <DiscoverSystemAgents />
        </>
      )}
    </>
  )
}

export default Home

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`
const StyledMainHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
