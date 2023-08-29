import React, { useRef } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import Button from '@l3-lib/ui-core/dist/Button'
import DataGrid from 'components/DataGrid'

import columnConfig from './columnConfig'
import { useWebhook } from './useWebhook'
import CreateWebhookModal from './createWebhookModal'
import { StyledHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import { StyledGroupContainer, StyledTableValue } from 'components/Layout/LayoutStyle'

const Webhook = () => {
  const gridRef = useRef({})

  const config = columnConfig()

  const { openCreateWebhookModal, webhooks } = useWebhook()

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='inner_navigation'>
          <StyledGroupContainer mt='20'>
            <StyledHeaderGroup>
              <StyledTableValue>Webhooks</StyledTableValue>

              {/* <Button kind={Button.kinds.TERTIARY} size={Button.sizes.LARGE}>
          <StyledLabelTypography
            value='Import test endpoint > 1'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
        </Button> */}
              <Button
                kind={Button.kinds.PRIMARY}
                size={Button.sizes.MEDIUM}
                leftIcon={Add}
                onClick={openCreateWebhookModal}
              >
                <StyledLabelTypography
                  value='Add endpoint'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </Button>
            </StyledHeaderGroup>
          </StyledGroupContainer>
        </div>
      </div>
      <DataGrid
        ref={gridRef}
        data={webhooks?.items || []}
        columnConfig={config}
        headerHeight={130}
        // groupPanel={groupPanel}

        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />

      <CreateWebhookModal />
    </StyledGroupContainer>
  )
}

export default Webhook

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledHeadingWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 530px;
  height: 32px;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  top: 65px;
`
const StyledTertiaryButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
`

const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
const StyledPrimaryButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  float: right;
  justify-content: center;
  align-items: center;
  width: 195px;
  height: 56px;
`

const StyledGridWrapper = styled.div`
  display: flex;
  // position: relative;
  width: 100%;
  min-width: 100%;
  // height: 1000px;
`
