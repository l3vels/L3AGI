import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import { toolLogos } from 'pages/Toolkit/constants'
import { useToolsService } from 'services/tool/useToolsService'

const AgentToolkits = ({ tools }: { tools: string[] }) => {
  const { data: toolsData } = useToolsService()

  const filteredTools = toolsData?.filter((tool: any) => {
    if (tools?.includes(tool.toolkit_id)) {
      return tool
    } else {
      return
    }
  })

  return (
    <StyledWrapper>
      <Typography
        value={'Toolkits'}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor={'#FFF'}
      />

      {filteredTools?.map((tool: any, index: number) => {
        const filteredLogos = toolLogos.filter((toolLogo: any) => toolLogo.toolName === tool.name)

        const logoSrc = filteredLogos?.[0]?.logoSrc || ''

        return (
          <StyledToolkit key={index}>
            <StyledImg src={logoSrc} alt='' />

            <StyledMainTextWrapper>
              <Typography
                value={tool.name}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'#FFF'}
              />
              <Typography
                value={tool.description}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'rgba(255,255,255,0.8'}
              />
            </StyledMainTextWrapper>
          </StyledToolkit>
        )
      })}
    </StyledWrapper>
  )
}

export default AgentToolkits

export const StyledWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);

  width: 100%;
  max-width: 1440px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledToolkit = styled.div`
  /* padding: 0 20px; */

  display: flex;
  /* flex-direction: column; */
  align-items: center;
  /* justify-content: center; */

  gap: 6px;
`
const StyledImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 10px;
`

const StyledMainTextWrapper = styled.div`
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* gap: 10px; */

  width: 100%;
  max-width: 400px;
`
