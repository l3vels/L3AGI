import { useParams } from 'react-router-dom'
import { useModelsService } from 'services'
import styled from 'styled-components'
import ModelCard from './ModelCard'
import { MODEL_PROVIDER_LOGOS } from '../constants'

const ModelDetails = () => {
  const { data: models } = useModelsService()

  const params = useParams()
  const { modelId } = params

  const model = models?.find((model: any) => model.id === modelId)

  const logo = MODEL_PROVIDER_LOGOS.find(logo => logo.provider === model?.provider)
  const logoSrc = logo?.logoSrc || ''

  return (
    <StyledRoot>
      <ModelCard
        title={model?.name}
        author={model?.provider}
        logoSrc={logoSrc}
        isDisabled={false}
      />
    </StyledRoot>
  )
}

export default ModelDetails

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`
