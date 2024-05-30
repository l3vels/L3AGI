import moment from 'moment'
import styled from 'styled-components'
import IconButton from 'share-ui/components/IconButton/IconButton'
import {
    StyledDeleteIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import Loader from 'share-ui/components/Loader/Loader'
import Checkbox from 'share-ui/components/Checkbox/Checkbox'

interface RendererColumnProps {
    deleteUserAccess: (id: string) => void
    deleting_loading: {
        loading: boolean
        id: string
    }
}

interface ColumnRowProps {
    id: string
    assigned_user_name: string
    assigned_user_email: string
    created_by_email: string
    created_on: Date
    account_id: string
}

// eslint-disable-next-line react/prop-types
const DateRenderer: React.FC<{ value: Date }> = ({ value }) => {
    const formattedDate = moment(value).fromNow()
    return <span>{formattedDate}</span>
}

interface SharedColumnProps {
    selected_account_id: string | null
    handleSelectAccess: (account_id: string) => void
}

const base = [
    {
        Header: 'User Name',
        accessor: 'assigned_user_name',
        minWidth: 100,
        width: 150,
    },
    {
        Header: 'User email',
        accessor: 'assigned_user_email',
        minWidth: 300,
        width: 350,
    },
    {
        Header: 'Creator',
        accessor: 'created_by_email',
        minWidth: 250,
        width: 300,
    },
    {
        Header: 'Created On',
        accessor: 'created_on',
        minWidth: 100,
        width: 140,
        Cell: DateRenderer,
    },
]

export const renderColumns = ({ deleteUserAccess, deleting_loading }: RendererColumnProps) => ([
    ...base,
    {
        Header: 'Actions',
        accessor: 'actions',
        minWidth: 100,
        width: 130,
    
        Cell: ({ row: { original: data } }: { row: { original: Pick<ColumnRowProps, 'id'> } }) => (
            <StyledActionWrapper>
              <IconButton
                onClick={() => deleteUserAccess(data.id)}
                icon={() => deleting_loading.loading && deleting_loading.id === data.id ? <Loader size={16} /> : <StyledDeleteIcon />}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                ariaLabel='Delete'
              />
            </StyledActionWrapper>
        ),
    },
])

export const renderSharedColumns = ({ selected_account_id, handleSelectAccess }: SharedColumnProps) => ([
    {
        Header: 'Select account',
        accessor: 'actions',
        minWidth: 100,
        width: 130,
    
        Cell: ({ row: { original: data } }: { row: { original: Pick<ColumnRowProps, 'account_id'> } }) => (
            <Checkbox
                checked={data.account_id === selected_account_id}
                size='large'
                kind='secondary'
                onChange={() => handleSelectAccess(data.account_id)}
            />
        ),
    },
    {
        Header: 'Account Name',
        accessor: 'assigned_account_name',
        minWidth: 100,
        width: 150,
    },
    ...base.slice(2, base.length),
])

const StyledActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`