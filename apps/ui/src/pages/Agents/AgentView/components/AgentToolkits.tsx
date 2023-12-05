import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import { toolLogos } from 'pages/Toolkit/constants'
import { useToolsService } from 'services/tool/useToolsService'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

const AgentToolkits = ({ tools }: { tools: string[] }) => {
  const { t } = useTranslation()
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
      <TypographyPrimary
        value={`${t('toolkit')}`}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
      />

      {filteredTools?.map((tool: any, index: number) => {
        const filteredLogos = toolLogos.filter((toolLogo: any) => toolLogo.toolName === tool.name)

        const logoSrc = filteredLogos?.[0]?.logoSrc || ''

        return (
          <StyledToolkit key={index}>
            <StyledImg src={logoSrc} alt='' />

            <StyledMainTextWrapper>
              <TypographyPrimary
                value={tool.name}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
              <TypographySecondary
                value={tool.description}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
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
  background: ${({ theme }) => theme.body.cardBgColor};

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
  display: flex;

  align-items: center;

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
