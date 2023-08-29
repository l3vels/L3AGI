import styled from 'styled-components'
import { StyledInnerGroup, StyledMainWrapper, StyledSectionTitle } from '../homeStyle.css'

import keyIcon from '../assets/key_icon.svg'
import logIcon from '../assets/log_icon.svg'
import sdkIcon from '../assets/sdk_icon.svg'
import StaticArrowSvg from '../assets/StaticArrowSvg'

const document_arr = [
  { name: 'SDKs', icon: sdkIcon, background: 'pink', url: 'https://docs.l3vels.xyz/docs/sdks' },
  {
    name: 'API Keys',
    icon: keyIcon,
    background: 'blue',
    url: 'https://docs.l3vels.xyz/docs/api-keys',
  },
  {
    name: 'API Logs',
    icon: logIcon,
    background: 'yellow',
    url: 'https://docs.l3vels.xyz/docs/api-logs',
  },
]

const DocumentationCard = ({ data }: any) => {
  return (
    <StyledCardBody onClick={() => window.open(data.url, 'blank')}>
      <StyledLeftSide>
        <StyledIconContainer bgColor={data.background}>
          <img src={data.icon} alt='key' />
        </StyledIconContainer>
        <StyledSpan>{data.name}</StyledSpan>
      </StyledLeftSide>
      <StaticArrowSvg fill='#fff' />
    </StyledCardBody>
  )
}

const Documentation = () => {
  return (
    <StyledMainWrapper>
      <StyledSectionTitle> Documentation</StyledSectionTitle>
      <StyledInnerGroup>
        {document_arr.map(item => (
          <DocumentationCard key={item.name} data={item} />
        ))}
      </StyledInnerGroup>
    </StyledMainWrapper>
  )
}

export default Documentation

const StyledCardBody = styled.div`
  padding: 4px 27px 4px 16px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const StyledLeftSide = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const StyledIconContainer = styled.div<{ bgColor?: string }>`
  display: grid;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: ${p => (p.bgColor ? `var(--color-gradient-${p.bgColor})` : p.bgColor)};
  border-radius: 2px;
`

const StyledSpan = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  color: #ffffff;
`
