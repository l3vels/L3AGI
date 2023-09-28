import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { useModal } from 'hooks'

const YOUTUBE_REGEX = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&/
const IMAGE_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
const SETTINGS_REGEX = /\/setting/
const TOOLKIT_REGEX = /\/toolkits\/[^/]+/
// const SETTINGS_REGEX = /\[Settings\]\(\/settings\)/

const AiMessageMarkdown = ({ children }: { children: any }) => {
  const { openModal } = useModal()

  return (
    <StyledReactMarkdown
      children={children}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        table: ({ node, ...props }) => <StyledTable {...props} />,
        a: ({ href, children }) => {
          // console.log('href', href)
          // console.log('children', children)
          if (YOUTUBE_REGEX.test(href as string)) {
            const videoId = (href as string).match(YOUTUBE_REGEX)?.[1]
            return (
              <iframe
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${videoId}`}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            )
          }

          if (IMAGE_REGEX.test(href as string)) {
            const imageUrl = href as string
            return <img src={imageUrl} alt={children as string} />
          }

          if (SETTINGS_REGEX.test(href as string)) {
            return (
              <button onClick={() => openModal({ name: 'settings-modal' })}>
                <StyledText>Settings</StyledText>
              </button>
            )
          }
          if (TOOLKIT_REGEX.test(href as string)) {
            const inputString = href
            const staticPart = '/toolkits/'
            const extractedPart = inputString?.replace(staticPart, '')

            return (
              <button
                onClick={() => {
                  openModal({ name: 'toolkit-modal', data: { toolSlug: extractedPart } })
                }}
              >
                <StyledText>{children}</StyledText>
              </button>
            )
          }

          return <a href={href as string}>{children}</a>
        },
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
    />
  )
}

export default AiMessageMarkdown

const StyledReactMarkdown = styled(ReactMarkdown)`
  color: ${({ theme }) => theme.body.textColorSecondary};
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledTable = styled.table`
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #fff;
    padding: 5px 30px;
    text-align: center;
  }
`
const StyledText = styled.span`
  text-decoration: underline;
`
