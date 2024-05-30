import { renderSharedColumns } from './columnConfig'
import { useGetSharedUserAccess } from '../../services/inviteUser/useInviteUserService'
import { setAccountId, removeAccountId } from 'helpers/authHelper'
import { useCookies } from 'react-cookie'

const useSharedAccess = () => { 
    const { data, loading: fetch_data_loading } = useGetSharedUserAccess()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [cookies] = useCookies<any>([''])
    const { account_id } = cookies

    const handleSelectAccess = (access_account_id: string) => {
        if(access_account_id === account_id) {
            removeAccountId()
            return
        }
        setAccountId(access_account_id)
    }

    const columns = renderSharedColumns({ handleSelectAccess, selected_account_id: account_id })

    return {
        columns,
        data,
        fetch_data_loading
    }
}

export default useSharedAccess