import TypographyPrimary from 'components/Typography/Primary'
import { t } from 'i18next'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import Typography from 'share-ui/components/typography/Typography'
import { StyledCardsWrapper, StyledImg, StyledIntegrationCard } from './IntegrationsDetails'
import { AgentWithConfigs } from 'types'
import { useDatasource } from 'pages/Datasource/useDatasource'
import { DATA_LOADER_IMAGES } from 'pages/Datasource/constants'

const DatasourceDetails = ({ agentData }: { agentData: AgentWithConfigs }) => {
  const datasourceIds = agentData?.configs?.datasources

  const { datasources } = useDatasource()

  const filteredDatasources = datasources?.filter((datasource: any) =>
    datasourceIds?.includes(datasource?.id),
  )

  return (
    <StyledDetailsBox>
      <TypographyPrimary
        value={t('datasources')}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
      />
      <StyledCardsWrapper>
        {filteredDatasources?.map((datasource: any) => {
          const filteredLogos = DATA_LOADER_IMAGES.filter(
            loaderImages => loaderImages.sourceName === datasource.source_type,
          )

          const imageSrc = filteredLogos?.[0]?.imageSrc || ''

          return (
            <StyledIntegrationCard key={datasource.id}>
              <StyledImg src={imageSrc} />

              <TypographyPrimary
                value={datasource.name}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />
            </StyledIntegrationCard>
          )
        })}
      </StyledCardsWrapper>
    </StyledDetailsBox>
  )
}

export default DatasourceDetails
