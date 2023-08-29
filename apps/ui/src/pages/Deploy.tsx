import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Deploy = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{t('deploy')}</h1>
    </StyledContainer>
  )
}

export default Deploy

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
