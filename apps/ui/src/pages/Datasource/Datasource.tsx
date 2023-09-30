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

const Datasource = () => {
  const { datasources, deleteDatasourceHandler } = useDatasource()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Datasource</StyledSectionTitle>
          <StyledSectionDescription>
            Here is your datasource, a collection of databases, APIs, files, and more.
          </StyledSectionDescription>
        </div>
        <div>
          <ButtonPrimary
            onClick={() => navigate('/datasources/create-datasource')}
            size={Button.sizes.SMALL}
          >
            Add Datasource
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {datasources?.map((datasource: any, index: number) => {
            const filteredLogos = DATA_LOADER_IMAGES.filter(
              (loaderImages: any) => loaderImages.sourceName === datasource.source_type,
            )

            const imageSrc = filteredLogos?.[0]?.imageSrc || ''

            return (
              <DatasourceCard
                key={index}
                name={datasource.name}
                description={datasource.description}
                status={datasource.status}
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
