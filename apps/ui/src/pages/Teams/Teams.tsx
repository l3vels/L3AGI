import styled from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import Heading from 'share-ui/components/Heading/Heading'

import Button from 'share-ui/components/Button/Button'

import columnConfig from './columnConfig'
import AddMemberModal from './CreateTeamModal/CreateTeamModal'

import useTeams from './useTeams'

import { StyledGroupContainer } from 'components/Layout/LayoutStyle'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingPrimary from 'components/Heading/Primary'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'

const Teams = () => {
  // const { t } = useTranslation()
  const { openCreateTeamsModal, assignedUserList } = useTeams()

  // const gridRef = useRef({})

  // const config = columnConfig()
  // const { openModal, closeModal } = useModal()

  // const deleteRow = async (itemId: string) => {
  //   await handleDeleteAccountAccess(itemId)
  //   refetch()
  // }

  // const getContextMenuItems = (params: any) => {
  //   const itemId = params.node.data?.id

  //   const result = [
  //     ...params.defaultItems,
  //     {
  //       // custom item
  //       name: 'Delete',
  //       // disabled: true,
  //       action: () => {
  //         // console.log('params', params.node.data.id)
  //         // console.log('params', params)
  //         const deleteFunc = async () => {
  //           await deleteRow(itemId)
  //           closeModal('delete-confirmation-modal')
  //         }
  //         openModal({
  //           name: 'delete-confirmation-modal',
  //           data: {
  //             deleteItem: deleteFunc,
  //             closeModal: () => closeModal('delete-confirmation-modal'),
  //             label: t('are-you-sure-you-want-to-delete-this-row?'),
  //             title: t('delete-row'),
  //           },
  //         })
  //       },
  //     },
  //   ]

  //   return result
  // }

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledHeaderGroup>
          <StyledHeadingWrapper>
            <HeadingPrimary
              type={Heading.types?.h1}
              size={Heading.sizes?.LARGE}
              value={`${assignedUserList.length} Members`}
            />
          </StyledHeadingWrapper>

          <StyledIconButtonWrapper>
            {/* <IconButton
            icon={SearchIcon}
            kind={IconButton.kinds?.TERTIARY}
            size={IconButton.sizes?.LARGE}
            // shape='Square'
          />

          <IconButton
            icon={Description}
            kind={IconButton.kinds?.TERTIARY}
            size={IconButton.sizes?.LARGE}
            // shape='Square'
          /> */}

            <Button
              kind={Button.kinds?.PRIMARY}
              size={Button.sizes?.MEDIUM}
              // leftIcon={Add}
              onClick={openCreateTeamsModal}
            >
              <TypographyPrimary
                value='Add member'
                type={TypographyTypes.LABEL}
                size={TypographySizes.md}
              />
            </Button>
          </StyledIconButtonWrapper>
        </StyledHeaderGroup>
      </div>

      {/* <DataGrid
        ref={gridRef}
        data={assignedUserList || []}
        columnConfig={config}
        contextMenu={getContextMenuItems}
        headerHeight={130}
      /> */}

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
