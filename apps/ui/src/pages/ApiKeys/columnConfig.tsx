import Typography from '@l3-lib/ui-core/dist/Typography'
import menuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Id from '@l3-lib/ui-core/dist/icons/Id'
import Calendar from '@l3-lib/ui-core/dist/icons/Calendar'

import styled from 'styled-components'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'

import moment from 'moment'

import { useModal } from 'hooks'
import { ToastContext } from 'contexts'
import { useTranslation } from 'react-i18next'
import { StyledOutlineIcon } from 'pages/Webhook/columnConfig'

type configTypes = {
  handleEditApiKey: (apiKey: any) => void
  handleDeleteApiKey: (apiKey: any) => void
}

export default ({ handleEditApiKey, handleDeleteApiKey }: configTypes) => {
  const { openModal, closeModal } = useModal()
  const { t } = useTranslation()
  type RendererProps = {
    data: any
    value: string
  }
  const TextCellRenderer = (props: RendererProps) => (
    <div>
      <Typography
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 1)'
      />
    </div>
  )

  const DateRenderer = (props: RendererProps) => {
    const value = props.value === null ? '-' : moment(props.value).fromNow()

    return (
      <Typography
        value={value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='rgba(255, 255, 255, 1)'
      />
    )
  }

  const MenuDotsCellRenderer = (props: RendererProps) => {
    const {
      data: { id },
      value,
    } = props

    const handleClickEdit = () => {
      handleEditApiKey(props.data)
    }
    const handleClickDelete = () => {
      const deleteFunc = async () => {
        handleDeleteApiKey(id)
        closeModal('delete-confirmation-modal')
      }
      openModal({
        name: 'delete-confirmation-modal',
        data: {
          closeModal: () => closeModal('delete-confirmation-modal'),
          deleteItem: deleteFunc,
          label: t('are-you-sure-you-want-to-delete-this-row?'),
          title: t('delete-row'),
        },
      })
    }

    return (
      <div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            float: 'right',
          }}
        >
          <MenuButton component={menuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv onClick={handleClickEdit}>
                <Typography
                  value={'Edit'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>
              <StyledClickableDiv onClick={handleClickDelete}>
                <Typography
                  value={'Delete API key'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton>
        </div>
        <Typography
          value={value === null ? '-' : moment(value).fromNow()}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      </div>
    )
  }

  return [
    {
      headerName: (
        <Typography
          value='Name'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
      // minWidth: 150,
      // width: 350,
    },
    {
      headerName: (
        <Typography
          value='Token'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'token',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Id />
          </StyledOutlineIcon>
        ),
      },
      // minWidth: 150,
      // width: 460,
    },
    {
      headerName: (
        <Typography
          value='Last used'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'last_used',
      filter: 'agTextColumnFilter',
      cellRenderer: DateRenderer,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Calendar />
          </StyledOutlineIcon>
        ),
      },
      // minWidth: 150,
      // width: 438,
    },
    {
      headerName: (
        <Typography
          value='Created'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='rgba(255, 255, 255, 1)'
        />
      ),
      headerComponent: HeaderComponent,
      field: 'created_on',
      filter: 'agTextColumnFilter',
      cellRenderer: MenuDotsCellRenderer,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Calendar />
          </StyledOutlineIcon>
        ),
      },
      // minWidth: 150,
      // width: 438,
    },
  ]
}

const StyledButtonsWrapper = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;

  background: rgba(0, 0, 0, 0.2);

  padding: 16px;

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 6px;
`
const StyledClickableDiv = styled.div`
  cursor: pointer;
`
