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

const Toolkit = () => {
  const { data: tools } = useToolsService()
  console.log('tools', tools)
  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Toolkits</StyledSectionTitle>
          <StyledSectionDescription>Here are all of your Tools</StyledSectionDescription>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper>
        <StyledCardsWrapper>
          {tools?.map((tool: any, index: number) => {
            const filteredLogos = toolLogos.filter(
              (toolLogo: any) => toolLogo.toolName === tool.name,
            )

            const logoSrc = filteredLogos?.[0]?.logoSrc || ''

            return (
              <ToolCard
                key={index}
                isDisabled={!tool.is_active}
                title={tool.name}
                subTitle={tool.is_active ? '' : 'Coming Soon'}
                onClick={() => navigate(`/tools/${tool.toolkit_id}`)}
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

// const StyledRoot = styled.div`
//   width: 100%;

//   height: calc(100vh - 350px);
// `

const StyledCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 10px;
`
const StyledToolDetails = styled.div``
