import { AuthContext } from 'contexts'
import { useContext } from 'react'
import { useFormik } from 'formik'

const useAccount = () => {
  const { account, user } = useContext(AuthContext)

  const initialValues: any = {
    email: user?.email || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    company_name: account?.company_name || '',
    location: account?.location || '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {},
  })

  return { formik }
}

export default useAccount
