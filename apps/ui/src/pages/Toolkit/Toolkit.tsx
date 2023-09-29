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
import { useToolView } from './ToolView/useToolView'
import { useEffect, useState } from 'react'

const Toolkit = ({ isPublic }: { isPublic?: boolean }) => {
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
          <StyledSectionTitle>Toolkits</StyledSectionTitle>
          <StyledSectionDescription>
            Discover the complete range of tools available for your agents and teams.
          </StyledSectionDescription>
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
                  subTitle={!tool.is_active && !isPublic ? 'Coming Soon' : ''}
                  onClick={() => {
                    if (isPublic) return
                    navigate(`/toolkits/${tool.slug}`)
                    // openModal({ name: 'toolkit-modal', data: { toolSlug: tool.slug } })
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

const StyledCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;
  overflow-y: auto;

  max-height: calc(100vh - 250px);
  padding-left: 20px;

  gap: 10px;
`
