import { useParams } from 'react-router-dom'
import { useToolsService } from 'services/tool/useToolsService'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { StyledButtonWrapper } from 'pages/Agents/Agents'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import { toolLogos } from '../constants'

const ToolView = () => {
  const params = useParams()

  const { toolId } = params

  const { data: toolsData } = useToolsService()

  const tool = toolsData?.filter((tool: any) => toolId === tool.toolkit_id)

  if (!tool) return <div />

  const { name, tools } = tool[0]

  const { description } = tools[0]

  console.log('View PAge', tool)

  const toolLogo = toolLogos.filter((toolLogo: any) => toolLogo.toolName === name)

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{name}</StyledSectionTitle>
          {/* <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription> */}
        </div>

        <StyledButtonWrapper>
          <Button onClick={() => {}}>Save</Button>
        </StyledButtonWrapper>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledInnerWrapper>
          <StyledImg src={toolLogo[0].logoSrc} alt='' />
          <Typography
            value={description || ''}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default ToolView

const StyledInnerWrapper = styled.div`
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`
