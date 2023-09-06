import { AuthContext } from 'contexts'
import { useContext } from 'react'
import { useFormik } from 'formik'

const useAccount = () => {
  const { account, user } = useContext(AuthContext)

  const initialValues: any = {
    email: user?.email || '',
    full_name: user?.name || '',
    name: account?.name || '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {},
  })

  return { formik }
}

export default useAccount
