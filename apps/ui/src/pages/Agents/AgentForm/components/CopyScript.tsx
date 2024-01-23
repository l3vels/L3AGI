import CopyButton from 'components/CopyButton'
import TypographyPrimary from 'components/Typography/Primary'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'

const CopyScript = () => {
  const script = `
            <script type="module">
            window.widgetData = {
                widgetId: "66c9972f-7e36-41b2-a202-a64d760b6092",
                accountKey: "l3_$cn5NTQwvlmfO8GqUnFD_pluLe-JJuhBVpa6a-P1FGhA",
            };
            </script>
            <script
            type="module"
            src="http://localhost:3000/dist/assets/widget.js"
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
