// import { FormikProvider, useField } from 'formik'
import styled from 'styled-components'

// import { CustomTable } from 'oldComponents/atoms/CustomTable'
// import { StyledButton, StyledInputContainer, StyledTextField } from './teamsStyle'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import SearchIcon from '@l3-lib/ui-core/dist/icons/SearchOutline'
import Description from '@l3-lib/ui-core/dist/icons/Description'

import AddMemberModal from './CreateTeamModal/CreateTeamModal'

// import { StyledHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import { useRef, useState } from 'react'
import useTeams from './useTeams'
import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingPrimary from 'components/Heading/Primary'

// import useTeams from './useTeams'

const Teams = () => {
  const { t } = useTranslation()
  const { openCreateTeamsModal, assignedUserList, handleDeleteAccountAccess, refetch } = useTeams()

  const gridRef = useRef({})

  const config = columnConfig()
  const { openModal, closeModal } = useModal()

  const deleteRow = async (itemId: string) => {
    await handleDeleteAccountAccess(itemId)
    refetch()
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params.node.data?.id

    const result = [
      ...params.defaultItems,
      {
        // custom item
        name: 'Delete',
        // disabled: true,
        action: () => {
          // console.log('params', params.node.data.id)
          // console.log('params', params)
          const deleteFunc = async () => {
            await deleteRow(itemId)
            closeModal('delete-confirmation-modal')
          }
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: deleteFunc,
              closeModal: () => closeModal('delete-confirmation-modal'),
              label: t('are-you-sure-you-want-to-delete-this-row?'),
              title: t('delete-row'),
            },
          })
        },
      },
    ]

    return result
  }

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledHeaderGroup>
          <StyledHeadingWrapper>
            <HeadingPrimary
              type={Heading.types.h1}
              size={Heading.sizes.lg}
              value={`${assignedUserList.length} Members`}
            />
          </StyledHeadingWrapper>

          <StyledIconButtonWrapper>
            {/* <IconButton
            icon={SearchIcon}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
            // shape='Square'
          />

          <IconButton
            icon={Description}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
            // shape='Square'
          /> */}

            <Button
              kind={Button.kinds.PRIMARY}
              size={Button.sizes.MEDIUM}
              // leftIcon={Add}
              onClick={openCreateTeamsModal}
            >
              <TypographyPrimary
                value='Add member'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </Button>
            {/* <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv>
                <Typography
                  value={t('remove-selected')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton> */}
          </StyledIconButtonWrapper>
        </StyledHeaderGroup>
      </div>

      <DataGrid
        ref={gridRef}
        data={assignedUserList || []}
        columnConfig={config}
        contextMenu={getContextMenuItems}
        headerHeight={130}
      />

      <AddMemberModal />
    </StyledGroupContainer>
  )
}

export default Teams

const StyledHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 70px;
`
const StyledIconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
`
const StyledHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledGridWrapper = styled.div`
  // display: flex;
  // position: relative;
  // margin-top: 40px;
  // width: 100%;
  height: 1000px;
`

export const StyledClickableDiv = styled.div`
  cursor: pointer;
`

{
  /* <StyleHeaderGroup>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Teams</h1>
      </StyleHeaderGroup>
      <StyledInnerWrapper>
        <FormikProvider value={formik}>
          <StyledInputContainer>
            <StyledTextField
              name='shared_email'
              placeholder='Enter email'
              label='Enter email address to share account access'
              mandatory
              useField={useField}
            />
            <StyledButton color='primary' onClick={formik.handleSubmit} disabled={!disabled}>
              Share
            </StyledButton>
          </StyledInputContainer>

          <Typography variant='h4' mt={50} mb={10} weight={600}>
            Shared list
          </Typography>

          <CustomTable
            templateColumns='1fr'
            size='14px'
            displayHeader
            columnsConfig={config}
            data={assignedUserList}
            alignItems='end'
            rowDifferentColors
            tableWidth='700px'
          />
        </FormikProvider>
      </StyledInnerWrapper> */
}
