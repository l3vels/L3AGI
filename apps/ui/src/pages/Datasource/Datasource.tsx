import Button from 'share-ui/components/Button/Button'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { DATA_LOADER_IMAGES } from './constants'

import DatasourceCard from './DatasourceCard'
import { useDatasource } from './useDatasource'
import { ButtonPrimary } from 'components/Button/Button'
import { t } from 'i18next'
import DatasourceDemoButton from './DatasourceForm/components/DatasourceDemoButton'
import { StyledCombiner } from './DatasourceForm/CreateDatasourceForm'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledLeftColumn,
  StyledMainWrapper,
  StyledRightColumn,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'

import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { useEffect } from 'react'

const Datasource = () => {
  const outlet = useOutlet()
  const params = useParams()

  const { datasourceId } = params

  const { datasources, deleteDatasourceHandler } = useDatasource()

  const navigate = useNavigate()

  useEffect(() => {
    if (datasources?.length > 0) navigate(`/datasources/${datasources?.[0].id}/edit-datasource`)
  }, [datasources])

  return (
    <>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledLeftColumn>
              <ListHeader
                title={t('datasource')}
                onAddClick={() => navigate('/datasources/create-datasource')}
              />
              {datasources?.map((datasource: any) => {
                const filteredLogos = DATA_LOADER_IMAGES.filter(
                  loaderImages => loaderImages.sourceName === datasource.source_type,
                )

                const imageSrc = filteredLogos?.[0]?.imageSrc || ''

                return (
                  <MiniToolCard
                    key={datasource.id}
                    onClick={() => navigate(`/datasources/${datasource.id}/edit-datasource`)}
                    name={datasource.name}
                    logo={imageSrc}
                    picked={datasource.id === datasourceId}
                    onDeleteClick={() => deleteDatasourceHandler(datasource.id)}
                  />
                )
              })}
            </StyledLeftColumn>

            <StyledChatWrapper>{outlet}</StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
    </>
    // <StyledSectionWrapper>
    //   <StyledHeaderGroup className='header_group'>
    //     <div>
    //       <StyledSectionTitle>{`${t('datasource')}`}</StyledSectionTitle>
    //       <StyledCombiner>
    //         <StyledSectionDescription>{`${t('datasource-description')}`}</StyledSectionDescription>
    //         <DatasourceDemoButton />
    //       </StyledCombiner>
    //     </div>
    //     <div>
    //       <ButtonPrimary
    //         onClick={() => navigate('/datasources/create-datasource')}
    //         size={Button.sizes?.SMALL}
    //       >
    //         {t('add-datasource')}
    //       </ButtonPrimary>
    //     </div>
    //   </StyledHeaderGroup>
    //   <ComponentsWrapper noPadding>
    //     <StyledCardsWrapper>
    //       {datasources?.map((datasource, index: number) => {
    //         const filteredLogos = DATA_LOADER_IMAGES.filter(
    //           loaderImages => loaderImages.sourceName === datasource.source_type,
    //         )

    //         const imageSrc = filteredLogos?.[0]?.imageSrc || ''

    //         return (
    //           <DatasourceCard
    //             key={index}
    //             name={datasource.name}
    //             description={datasource.description}
    //             status={datasource.status}
    //             error={datasource.error}
    //             onEditClick={() => navigate(`/datasources/${datasource.id}/edit-datasource`)}
    //             onDeleteClick={() => deleteDatasourceHandler(datasource.id)}
    //             imageSrc={imageSrc}
    //           />
    //         )
    //       })}
    //     </StyledCardsWrapper>
    //   </ComponentsWrapper>
    // </StyledSectionWrapper>
  )
}

export default Datasource
