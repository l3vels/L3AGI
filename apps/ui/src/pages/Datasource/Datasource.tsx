import Button from '@l3-lib/ui-core/dist/Button'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useNavigate } from 'react-router-dom'
import { DATA_LOADER_IMAGES } from './constants'

import DatasourceCard from './DatasourceCard'
import { useDatasource } from './useDatasource'
import { ButtonPrimary } from 'components/Button/Button'
import { t } from 'i18next'
import DatasourceDemoButton from './DatasourceForm/components/DatasourceDemoButton'
import { StyledCombiner } from './DatasourceForm/CreateDatasourceForm'

const Datasource = () => {
  const { datasources, deleteDatasourceHandler } = useDatasource()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('datasource')}`}</StyledSectionTitle>
          <StyledCombiner>
            <StyledSectionDescription>{`${t('datasource-description')}`}</StyledSectionDescription>
            <DatasourceDemoButton />
          </StyledCombiner>
        </div>
        <div>
          <ButtonPrimary
            onClick={() => navigate('/datasources/create-datasource')}
            size={Button.sizes.SMALL}
          >
            {t('add-datasource')}
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {datasources?.map((datasource, index: number) => {
            const filteredLogos = DATA_LOADER_IMAGES.filter(
              loaderImages => loaderImages.sourceName === datasource.source_type,
            )

            const imageSrc = filteredLogos?.[0]?.imageSrc || ''

            return (
              <DatasourceCard
                key={index}
                name={datasource.name}
                description={datasource.description}
                status={datasource.status}
                error={datasource.error}
                onEditClick={() => navigate(`/datasources/${datasource.id}/edit-datasource`)}
                onDeleteClick={() => deleteDatasourceHandler(datasource.id)}
                imageSrc={imageSrc}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Datasource

// const StyledDatasourceCardsWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 16px;

//   height: calc(100vh - 325px);
//   overflow-y: auto;
//   padding: 0 20px;
// `
