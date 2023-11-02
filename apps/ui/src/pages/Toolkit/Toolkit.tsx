import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useToolsService } from 'services/tool/useToolsService'

import ToolCard from './components/ToolCard'

import { toolLogos } from './constants'
import { useNavigate } from 'react-router-dom'
import { useToolView } from './ToolView/useToolView'
import { useEffect, useState } from 'react'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

const Toolkit = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()
  const { data: tools } = useToolsService()

  const { refetchConfigs, configsData } = useToolView({})

  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const handleShow = async () => {
    if (configsData) {
      setShow(true)
    } else {
      await refetchConfigs()
      setShow(true)
    }
  }

  useEffect(() => {
    handleShow()
  }, [])

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('toolkit')}`}</StyledSectionTitle>
          <StyledSectionDescription>{t('toolkit-description')}</StyledSectionDescription>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        {show && (
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
                  subTitle={!tool.is_active && !isPublic ? `${t('comingSoon')}` : ''}
                  onClick={() => {
                    if (isPublic) return
                    navigate(`/integrations/toolkit/${tool.slug}`)
                  }}
                  logoSrc={logoSrc}
                />
              )
            })}
          </StyledCardsWrapper>
        )}
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Toolkit
