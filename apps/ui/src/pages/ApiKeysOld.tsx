import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

const ApiKeysOld = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{t('api-keys')}</h1>
    </StyledContainer>
  )
}

export default ApiKeysOld

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
