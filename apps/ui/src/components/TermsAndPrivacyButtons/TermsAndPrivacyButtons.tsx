import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import TypographyQuaternary from 'components/Typography/Quaternary'

const TermsAndPrivacyButtons = ({ isPublic }: { isPublic?: boolean }) => {
  return (
    <StyledWrapper>
      {isPublic && (
        <>
          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_TERMS_LINK)}>
            <TypographyQuaternary
              value='Terms of Use'
              type={Typography.types.label}
              size={Typography.sizes.xss}
              as={'a'}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
            />
          </button>

          <StyledDivider />

          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_PRIVACY)}>
            <TypographyQuaternary
              value='Privacy Policy'
              type={Typography.types.label}
              size={Typography.sizes.xss}
              as={'a'}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
            />
          </button>
        </>
      )}

      {!isPublic && (
        <>
          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_TWITTER_LINK)}>
            <TypographyQuaternary
              value='Twitter'
              type={Typography.types.label}
              size={Typography.sizes.xss}
              as={'a'}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
            />
          </button>

          <StyledDivider />

          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_DISCORD_LINK)}>
            <TypographyQuaternary
              value='Discord'
              type={Typography.types.label}
              size={Typography.sizes.xss}
              as={'a'}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
            />
          </button>

          <StyledDivider />

          <button onClick={() => openLinkTab(import.meta.env.REACT_APP_YOUTUBE_LINK)}>
            <TypographyQuaternary
              value='Youtube'
              type={Typography.types.label}
              size={Typography.sizes.xss}
              as={'a'}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
            />
          </button>
        </>
      )}
    </StyledWrapper>
  )
}

export default TermsAndPrivacyButtons

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: fit-content;
`
const StyledDivider = styled.div`
  width: 1px;
  height: 10px;
  background: ${({ theme }) => theme.typography.contentQuaternary};
`
