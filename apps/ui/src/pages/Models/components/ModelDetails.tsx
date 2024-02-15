import { useParams } from 'react-router-dom'
import { useModelsService } from 'services'

import { MODEL_PROVIDER_LOGOS } from '../constants'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { t } from 'i18next'
import {
  StyledImg,
  StyledInnerWrapper,
  StyledMainTextWrapper,
  StyledTextWrapper,
} from 'pages/Toolkit/ToolView/ToolView'
import TypographySecondary from 'components/Typography/Secondary'
import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'

const ModelDetails = () => {
  const { data: models } = useModelsService()

  const params = useParams()
  const { modelId } = params

  const model = models?.find((model: any) => model.id === modelId)

  const logo = MODEL_PROVIDER_LOGOS.find(logo => logo.provider === model?.provider)
  const logoSrc = logo?.logoSrc || ''

  return (
    <StyledSectionWrapper>
      <StyledInnerWrapper>
        <>
          <StyledImg src={logoSrc} alt='' />
          <StyledTextWrapper>
            <TypographySecondary
              value={t('by')}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />

            <TypographySecondary
              value={model?.provider}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              style={{ textDecoration: 'underline' }}
            />
          </StyledTextWrapper>
          <StyledMainTextWrapper>
            <TypographyPrimary
              value={model?.name}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
            <TypographySecondary
              value={model?.value}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </StyledMainTextWrapper>
        </>
      </StyledInnerWrapper>
    </StyledSectionWrapper>
  )
}

export default ModelDetails
