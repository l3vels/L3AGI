import { useRef } from 'react'
import { useModal } from 'hooks'
import styled from 'styled-components'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import NavigationChevronRight from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import useApiKeys from './useApiKeys'
import EditApiModal from './EditApiKey'
import ShowApiKeyModal from '../ApiKeys/ShowApiKey/ShowApiKeyModal'
import CreateApiModal from './CreateApiKey/CreateApiModal'
import { FLexSpaceBetween, StyledHeaderGroup } from 'styles/globalStyle.css'
import { StyledGroupContainer, StyledTableValue } from 'components/Layout/LayoutStyle'
import TypographyTertiary from 'components/Typography/Tertiary'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'

const ApiKeys = () => {
  const { apiKeys, handleEditApiKey, handleDeleteApiKey } = useApiKeys()
  const gridRef = useRef({})

  const { openModal } = useModal()

  const openCreateAPIModal = () => {
    openModal({
      name: 'add-api-keys-modal',
    })
  }
  const config = columnConfig({ handleDeleteApiKey, handleEditApiKey })

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='inner_navigation'>
          <StyledColumnContainer>
            <div>
              <StyledHeaderGroup>
                <StyledTableValue>Standard keys</StyledTableValue>
              </StyledHeaderGroup>
              <StyledGroupContainer mt='20'>
                <StyledTypography>
                  <TypographyTertiary
                    value='These keys will allow you to authenticate API request. '
                    type={Typography.types.P}
                    size={Typography.sizes.lg}
                  />
                  <StyledTypographyWrapper>
                    <ButtonTertiary
                      onClick={() => window.open('https://docs.l3agi.com', '_blank')}
                      size={Button.sizes.SMALL}
                    >
                      <TypographyTertiary
                        value=' Learn more'
                        type={Typography.types.P}
                        size={Typography.sizes.lg}
                      />
                    </ButtonTertiary>
                  </StyledTypographyWrapper>
                </StyledTypography>
              </StyledGroupContainer>
            </div>
            <ButtonPrimary onClick={openCreateAPIModal} leftIcon={Add} size={Button.sizes.LARGE}>
              Create secret key
            </ButtonPrimary>
          </StyledColumnContainer>
        </div>
      </div>

      <DataGrid
        ref={gridRef}
        data={apiKeys?.items || []}
        columnConfig={config}
        headerHeight={160}
        // groupPanel={groupPanel}

        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />

      <CreateApiModal />
      <ShowApiKeyModal />
      <EditApiModal />
    </StyledGroupContainer>
  )
}

export default ApiKeys

export const StyledRightSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  float: right;
`
export const StyledRightSideButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  width: 305px;
  height: 20px;
  float: right;
  top: 42px;
  right: 90px;

  margin-left: auto;
  margin-top: auto;
  display: flex;
  position: relative;
  top: 35px;
  right: 70px;
  width: fit-content;
`
export const StyledRightSideIconButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 12px;
  float: right;
  top: 46px;
  right: 53px;
  transform: rotate(90deg);
`
export const StyledLeftSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  // top: 40px;
  // left: 24px;
  @media (max-width: 809px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    bottom: 40px;
  }
`
export const StyledLeftSideHeading = styled(Heading)`
  line-height: 36px !important;
  font-size: 28px !important;
  color: #ffffff;
`

export const StyledTypography = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 28px;
  margin-top: 20px;
  // color: rgba(255, 255, 255, 0.6);
  @media (max-width: 1209px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    top: 60px;
  }
`
export const StyledTypographyWrapper = styled.div`
  border-bottom: 1px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  min-width: 30px;
  height: 20px;
  margin-left: 10px;
  // color: #ffffff;
  @media (max-width: 320px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    right: 65px;
    top: 40px;
    width: fit-content;
  }
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  -webkit-box-pack: end;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: fit-content;
  height: 56px;
`
export const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 900px;
`

const StyledColumnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`
