import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { DATA_LOADER_IMAGES } from 'pages/Datasource/constants'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'

import Typography from 'share-ui/components/typography/Typography'
import { StyledWrapper } from './AgentToolkits'
import TypographyPrimary from 'components/Typography/Primary'

type AgentDataSourcesProps = {
  datasources: string[]
}

const AgentDatasources = ({ datasources }: AgentDataSourcesProps) => {
  const { t } = useTranslation()
  const { data: dataSources } = useDatasourcesService()

  const filteredDatasources = dataSources?.filter(({ id }) => {
    return datasources?.includes(id)
  })

  if (filteredDatasources?.length === 0) return <div />

  return (
    <StyledWrapper>
      <TypographyPrimary
        value={t('datasources')}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
      />

      <StyledInnerWrapper>
        {filteredDatasources?.map((datasource, index: number) => {
          const filteredLogos = DATA_LOADER_IMAGES.filter(
            loaderImages => loaderImages.sourceName === datasource.source_type,
          )

          const imageSrc = filteredLogos?.[0]?.imageSrc || ''

          return (
            <StyledDatasource key={index}>
              <StyledImg src={imageSrc} />
              <TypographyPrimary
                value={datasource.name}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
            </StyledDatasource>
          )
        })}
      </StyledInnerWrapper>
    </StyledWrapper>
  )
}
export default AgentDatasources

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const StyledDatasource = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(248, 248, 248, 0.1);

  padding: 6px 10px;
  width: fit-content;
  border-radius: 10px;
`
const StyledImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 10px;
`
