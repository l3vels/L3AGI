import { renderSharedColumns } from './columnConfig'
import { useGetSharedUserAccess } from '../../services/inviteUser/useInviteUserService'
import { setAccountId, removeAccountId } from 'helpers/authHelper'
import { useCookies } from 'react-cookie'

const useSharedAccess = () => { 
    const { data, loading: fetch_data_loading } = useGetSharedUserAccess()
    const [cookies] = useCookies<any>([''])
    const { account_id } = cookies

    console.log('cookies', cookies)

    // const selected_account_id = 'ed0fa07b-d5a8-462f-8f81-97f4c54b4eb4'

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