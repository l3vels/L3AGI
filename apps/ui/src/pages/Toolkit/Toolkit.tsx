import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useToolsService } from 'services/tool/useToolsService'
import styled from 'styled-components'
import ToolCard from './components/ToolCard'

import { toolLogos } from './constants'
import { useNavigate } from 'react-router-dom'

const Toolkit = ({ isPublic }: { isPublic?: boolean }) => {
  const { data: tools } = useToolsService()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Toolkits</StyledSectionTitle>
          <StyledSectionDescription>
            Discover the complete range of tools available for your agents and teams.
          </StyledSectionDescription>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {tools?.map((tool: any, index: number) => {
            const filteredLogos = toolLogos.filter(
              (toolLogo: any) => toolLogo.toolName === tool.name,
            )

            const logoSrc = filteredLogos?.[0]?.logoSrc || ''

            return (
              <ToolCard
                key={index}
                isReadOnly={isPublic}
                isDisabled={!tool.is_active && !isPublic}
                title={tool.name}
                subTitle={!tool.is_active && !isPublic ? 'Coming Soon' : ''}
                onClick={() => {
                  if (isPublic) return
                  navigate(`/tools/${tool.toolkit_id}`)
                }}
                logoSrc={logoSrc}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Toolkit

const StyledCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;
  overflow-y: scroll;

  height: calc(100vh - 325px);
  padding-left: 20px;

  gap: 10px;
`
