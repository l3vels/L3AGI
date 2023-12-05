import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import {
  StyledDivider,
  StyledWrapper,
} from 'components/TermsAndPrivacyButtons/TermsAndPrivacyButtons'

import Typography from 'share-ui/components/typography/Typography'

import Discord from 'share-ui/components/Icon/Icons/components/Discord'
import TwitterLogo from 'assets/tools/twitter.png'
import YoutubeLogo from 'assets/tools/youtube.svg'

import TypographyPrimary from 'components/Typography/Primary'
import { useGetAccountModule } from 'utils/useGetAccountModule'

const MediaButtons = () => {
  const { t } = useTranslation()

  const { getExternalLinksModule } = useGetAccountModule()
  const isLinkModule = getExternalLinksModule()

  return (
    <StyledWrapper>
      {isLinkModule && (
        <>
          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_TWITTER_LINK)}>
            <StyledInnerButtonWrapper>
              <StyledImg src={TwitterLogo} />
              <TypographyPrimary
                value={t('twitter')}
                type={Typography.types.label}
                size={Typography.sizes.xss}
                as={'a'}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              />
            </StyledInnerButtonWrapper>
          </button>

          <StyledDivider />

          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_DISCORD_LINK)}>
            <StyledInnerButtonWrapper>
              <StyledDiscordIcon />
              <TypographyPrimary
                value={t('discord')}
                type={Typography.types.label}
                size={Typography.sizes.xss}
                as={'a'}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              />
            </StyledInnerButtonWrapper>
          </button>

          <StyledDivider />

          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_YOUTUBE_LINK)}>
            <StyledInnerButtonWrapper>
              <StyledImg src={YoutubeLogo} />
              <TypographyPrimary
                value={t('youtube')}
                type={Typography.types.label}
                size={Typography.sizes.xss}
                as={'a'}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              />
            </StyledInnerButtonWrapper>
          </button>
        </>
      )}
    </StyledWrapper>
  )
}

export default MediaButtons

const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
const StyledImg = styled.img`
  width: 10px;
`
const StyledDiscordIcon = styled(Discord)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }

  width: 15px;
`
