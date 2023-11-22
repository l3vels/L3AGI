import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from 'share-ui/components/typography/Typography'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import TypographyQuaternary from 'components/Typography/Quaternary'

const TermsAndPrivacyButtons = () => {
  const { t } = useTranslation()
  return (
    <StyledWrapper>
      <>
        <button onClick={() => openLinkTab(import.meta.env.REACT_APP_TERMS_LINK)}>
          <TypographyQuaternary
            value={t('terms-of-use')}
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
            value={t('privacy-policy')}
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
    </StyledWrapper>
  )
}

export default TermsAndPrivacyButtons

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: fit-content;
  min-height: 20px;
`
export const StyledDivider = styled.div`
  width: 1px;
  height: 10px;
  background: ${({ theme }) => theme.typography.contentQuaternary};
`
