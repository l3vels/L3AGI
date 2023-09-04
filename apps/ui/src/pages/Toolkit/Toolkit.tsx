import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useState } from 'react'
import { useToolsService } from 'services/tool/useToolsService'
import styled from 'styled-components'
import ToolCard from './components/ToolCard'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import { toolLogos } from './constants'

const Toolkit = () => {
  const { data: tools } = useToolsService()
  console.log('tools', tools)

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Tools</StyledSectionTitle>
          <StyledSectionDescription>Here are all of your Tools</StyledSectionDescription>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper>
        <StyledCardsWrapper>
          {tools?.map((tool: any, index: number) => {
            const filteredLogos = toolLogos.filter(
              (toolLogo: any) => toolLogo.toolName === tool.name,
            )
            console.log(filteredLogos)
            const logoSrc = filteredLogos?.[0]?.logoSrc || ''

            return (
              <ToolCard
                key={index}
                title={tool.name}
                subTitle={tool.is_active ? '' : 'Coming Soon'}
                onClick={() => {}}
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
