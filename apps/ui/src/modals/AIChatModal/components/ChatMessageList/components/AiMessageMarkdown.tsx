import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { useModal } from 'hooks'
import { memo, useEffect, useState } from 'react'
import { t } from 'i18next'
import Loader from 'share-ui/components/Loader/Loader'

const YOUTUBE_REGEX = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&/
const IMAGE_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
// const SETTINGS_REGEX = /\/setting/
const TOOLKIT_REGEX = /\/toolkits\/[^/]+/
const VOICE_REGEX = /\/integrations\/voice\/[^/]+/
const SETTINGS_REGEX = /\/integrations\?setting=([^/]+)/

const INCOMPLETE_URL_REGEX = /https?:\/\/\S*$/

const AiMessageMarkdown = ({ isReply = false, children }: { isReply?: boolean; children: any }) => {
  const { openModal } = useModal()

  const [loadingUrl, setLoadingUrl] = useState(false)

  useEffect(() => {
    // Check if the last part of the children string is an incomplete URL
    const match = children.match(INCOMPLETE_URL_REGEX)
    if (match) {
      // If there's an incomplete URL, start loading
      setLoadingUrl(true)
      // Here you would have logic to determine when the URL is complete
      // For demonstration, let's assume the URL is complete when there are no more tokens coming for 1 second
      const timeoutId = setTimeout(() => {
        setLoadingUrl(false)
      }, 1000) // Wait for 1 second of no new tokens to consider the URL complete

      // Clear the timeout if the component unmounts or the children update before the timeout is reached
      return () => clearTimeout(timeoutId)
    } else {
      // If there's no incomplete URL, ensure loading is not shown
      setLoadingUrl(false)
    }
  }, [children])

  return (
    <StyledReactMarkdown
      isReply={isReply}
      children={children}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        img: ({ node, ...props }) => <StyledImg {...props} />,
        table: ({ node, ...props }) => <StyledTable {...props} />,
        a: ({ href, children }) => {
          if (loadingUrl) {
            return <Loader size={40} />
          }

          if (YOUTUBE_REGEX.test(href as string)) {
            const videoId = (href as string).match(YOUTUBE_REGEX)?.[1]
            return (
              <>
                <br />
                <iframe
                  width='560'
                  height='315'
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
                <br />
              </>
            )
          }

          if (IMAGE_REGEX.test(href as string)) {
            const imageUrl = href as string
            return <StyledImg src={imageUrl} alt={children as string} />
          }

          if (SETTINGS_REGEX.test(href as string)) {
            const regex = /\/integrations\?setting=([^/]+)/
            const match: any = regex.exec(href || '')
            const slug = match[1]

            return (
              <button
                onClick={() =>
                  openModal({ name: 'llm-settings-modal', data: { settingsSlug: slug } })
                }
              >
                <StyledText>here</StyledText>
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

          if (VOICE_REGEX.test(href as string)) {
            const inputString = href
            const staticPart = '/integrations/voice/'
            const extractedPart = inputString?.replace(staticPart, '')

            return (
              <button
                onClick={() => {
                  openModal({ name: 'voice-modal', data: { voiceSlug: extractedPart } })
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
              style={prism as any}
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

export default memo(AiMessageMarkdown)

const StyledReactMarkdown = styled(ReactMarkdown)<{ isReply: boolean }>`
  color: ${({ theme }) => theme.body.textColorPrimary};
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* font-family: 'Circular'; */
  font-weight: 400;

  font-style: normal;
  font-size: 14px;

  white-space: pre-line;

  ${props =>
    props.isReply &&
    css`
      color: ${({ theme }) => theme.body.textColorSecondary};
      font-size: 12px;
    `};
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
const StyledImg = styled.img`
  margin-top: 5px;

  width: 300px;
  height: 300px;

  border-radius: 8px;
`
