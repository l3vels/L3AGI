import { StyledAgentWrapper } from 'components/ChatCards/TeamChatCard'
import CopyButton from 'components/CopyButton'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'

import TypographyPrimary from 'components/Typography/Primary'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import ReactMarkdown from 'react-markdown'
import { useLocation, useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { StyledDetailHeader } from 'routes/components/IntegrationsDetails'
import Book from 'share-ui/components/Icon/Icons/components/Book'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'

const CopyScript = () => {
  const params = useParams()

  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)
  const agentId = urlParams.get('agent') || params.agentId

  const appDomainName = import.meta.env.REACT_APP_DOMAIN_NAME

  const script = `
    <script
      type="module"
      id="myWidgetScript"
      src="${appDomainName}/assets/widget.js?widgetId=${agentId}"
      defer
    ></script>`

  if (!agentId) return <div />

  return (
    <StyledDetailsBox>
      <StyledDetailHeader>
        <TypographyPrimary
          value={`Embed / docs`}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
        />

        <CopyButton onCopyClick={() => navigator.clipboard.writeText(script)} />
      </StyledDetailHeader>

      <StyledReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || 'language-js')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={oneLight as any}
                language={match[1]}
                PreTag='div'
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {script}
      </StyledReactMarkdown>

      <StyledAgentWrapper onClick={() => openLinkTab(import.meta.env.REACT_APP_MAIN_API_DOCS)}>
        <Book />
        <TypographyPrimary
          value={'Core API integration'}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledAgentWrapper>
      <StyledAgentWrapper onClick={() => openLinkTab(import.meta.env.REACT_APP_PR_API_DOCS)}>
        <Book />
        <TypographyPrimary
          value={'Voice API integration'}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledAgentWrapper>
    </StyledDetailsBox>
  )
}

export default CopyScript

const StyledReactMarkdown = styled(ReactMarkdown)`
  border-radius: 10px;

  border: 3px solid ${({ theme }) => theme?.body.textareaBorder};

  font-size: 12px;
`
