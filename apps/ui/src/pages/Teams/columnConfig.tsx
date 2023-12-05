import { useContext } from 'react'

import styled from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'

import PersonaIcon from 'share-ui/components/Icon/Icons/components/Person'
import EmailIcon from 'share-ui/components/Icon/Icons/components/Email'
import MenuButton from 'share-ui/components/MenuButton/MenuButton'
import EventIcon from 'share-ui/components/Icon/Icons/components/Event'
import UserStatusIcon from 'share-ui/components/Icon/Icons/components/UserStatus'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import useTeams from './useTeams'
import { useModal } from 'hooks'
import { ToastContext } from 'contexts'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import { MenuDotsOutline } from 'share-ui/components/Icon/Icons'

export default () => {
  type RendererProps = {
    teams(data: string): string
    value: string
  }
  const { openCreateTeamsModal, assignedUserList, handleDeleteAccountAccess, refetch } = useTeams()
  const { openModal, closeModal } = useModal()
  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()
  const { t } = useTranslation()
  const { setToast } = useContext(ToastContext)

  const TextCellRenderer = (props: RendererProps) => (
    <StyledContainer>
      <TypographySecondary
        value={props.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    </StyledContainer>
  )

  const NameCellRenderer = (props: RendererProps) => {
    const value = props.value
    return (
      <StyledContainer>
        <TypographyPrimary value={value} type={Typography.types.LABEL} size={Typography.sizes.sm} />
      </StyledContainer>
    )
  }

  const DateCellRenderer = (
    props: RendererProps & {
      assignedUserList: any[]
      handleDeleteAccountAccess: (teamId: string) => any
      refetch: () => any
    },
  ) => {
    const { value, assignedUserList, handleDeleteAccountAccess } = props

    const teams = (id: string) => {
      const assignedUser = assignedUserList.find((user: { id: string }) => user.id === id)
      const matchingUser = assignedUserList.find(
        (user: { assigned_user_created_on: string }) =>
          user.assigned_user_created_on === props.value,
      )
      return matchingUser ? matchingUser : ''
    }

    const handleDelete = async () => {
      const team = teams(props.value)
      const deleteFunc = async () => {
        await handleDeleteAccountAccess(team.id)
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

    const values =
      props.value === null ? '-' : moment(parseInt(props.value, 10)).format('MMM DD, YYYY')
    return (
      <div>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            float: 'right',
            alignItems: 'center',
          }}
        >
          <MenuButton component={() => <MenuDotsOutline size={20} />}>
            <StyledButtonsWrapper>
              <StyledClickableDiv onClick={handleDelete}>
                <TypographySecondary
                  value={'Delete row'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton>
        </div>
        <TypographySecondary
          value={values}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </div>
    )
  }

  return [
    {
      headerName: 'Name',
      headerComponent: HeaderComponent,
      valueGetter: 'data.assigned_user_first_name + " " + data.assigned_user_last_name',
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: NameCellRenderer,

      minWidth: 200,
      width: 350,
      flex: 2,
      // sizeColumnsToFit: true,
      headerComponentParams: {
        icon: <PersonaIcon />,
      },
    },
    {
      headerName: 'Email',
      headerComponent: HeaderComponent,
      field: 'assigned_user_email',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: <EmailIcon />,
      },

      minWidth: 200,
      width: 350,
      flex: 2,
      // sizeColumnsToFit: true,
    },
    {
      headerName: 'Role',
      headerComponent: HeaderComponent,
      field: 'assigned_user_role',
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: TextCellRenderer,

      minWidth: 190,
      width: 190,
      flex: 1,
      // suppressSizeToFit: true,
      headerComponentParams: {
        icon: <UserStatusIcon />,
      },
    },
    {
      headerName: 'Join date',
      headerComponent: HeaderComponent,
      field: 'assigned_user_created_on',
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: (
        props: JSX.IntrinsicAttributes & { teams(data: string): string; value: string } & {
          assignedUserList: any[]
          handleDeleteAccountAccess: (teamId: string) => void
          refetch: () => void
        },
      ) => (
        <DateCellRenderer
          {...props}
          assignedUserList={assignedUserList}
          handleDeleteAccountAccess={handleDeleteAccountAccess}
          refetch={refetch}
        />
      ),

      minWidth: 200,
      width: 200,
      flex: 1,
      // suppressSizeToFit: true,
      headerComponentParams: {
        icon: <EventIcon />,
      },
    },
  ]
}

const StyledButtonsWrapper = styled.div`
  margin-top: 15px;

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

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
