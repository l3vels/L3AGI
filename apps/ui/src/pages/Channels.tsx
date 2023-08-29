import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

const Channels = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{t('channels')}</h1>
    </StyledContainer>
  )
}

export default Channels

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
