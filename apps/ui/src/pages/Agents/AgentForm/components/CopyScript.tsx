import CopyButton from 'components/CopyButton'
import TypographyPrimary from 'components/Typography/Primary'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'

const CopyScript = () => {
  const params = useParams()
  const { agentId } = params

  const appDomainName = import.meta.env.REACT_APP_DOMAIN_NAME

  const script = `
          <script
            type="module"
            id="myWidgetScript"
            src="${appDomainName}/assets/widget.js?widgetId=${agentId}"
            defer
          ></script>`

  return (
    <>
      <StyledTitleWrapper>
        <TypographyPrimary
          value={`Widget script`}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
        <CopyButton onCopyClick={() => navigator.clipboard.writeText(script)} />
      </StyledTitleWrapper>

      <StyledReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || 'language-js')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={atomDark as any}
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
    </>
  )
}

export default CopyScript

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledReactMarkdown = styled(ReactMarkdown)`
  border-radius: 10px;
`
