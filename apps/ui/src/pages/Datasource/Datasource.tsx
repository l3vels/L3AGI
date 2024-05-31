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
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
  StyledRightColumn,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'

import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { useEffect } from 'react'
import { useGroups } from 'plugins/contact/pages/Group/useGroups'

import contactIcon from 'assets/icons/contact.png'

const Datasource = () => {
  const outlet = useOutlet()
  const params = useParams()

  const { datasourceId, groupId } = params

  const { datasources, deleteDatasourceHandler } = useDatasource()

  const { groups, deleteGroupHandler } = useGroups()

  const navigate = useNavigate()

  useEffect(() => {
    if (datasources?.length > 0) navigate(`/datasources/${datasources?.[0].id}/edit-datasource`)
    else if (groups?.length > 0) navigate(`/datasources/${groups?.[0].id}/edit-group`)
  }, [datasources])

  return (
    <>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>

            <StyledLeftColumn>
              <ListHeader
                title={t('datasources')}
                multiOption={[
                  {
                    label: `File`,
                    function: () => navigate('/datasources/create-datasource?type=File'),
                  },
                  {
                    label: `MySQL`,
                    function: () => navigate('/datasources/create-datasource?type=MySQL'),
                  },
                  {
                    label: `Postgres`,
                    function: () => navigate('/datasources/create-datasource?type=Postgres'),
                  },
                  {
                    label: `${t('contact')} ${t('group')}`,
                    function: () => navigate('/datasources/create-group'),
                  },
                ]}
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
                    status={datasource.status}
                    error={datasource.error}
                  />
                )
              })}

              {/* <StyledHorizontalDivider />

              <ListHeader
                title={`${t('contact')} ${t('groups')}`}
                onAddClick={() => navigate('/datasources/create-group')}
              /> */}
              {groups?.map((group: any) => {
                return (
                  <MiniToolCard
                    key={group.id}
                    onClick={() => navigate(`/datasources/${group.id}/edit-group`)}
                    name={group.name}
                    logo={contactIcon}
                    picked={group.id === groupId}
                    onDeleteClick={() => deleteGroupHandler(group.id)}
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
