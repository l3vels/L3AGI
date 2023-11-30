import useGithubLogin from 'pages/Auth/Login/useGithubLogin'
import { WelcomeLoader } from 'components/Loader/WelcomeLoader'

import './login.css'

const Login = () => {
  useGithubLogin()

  return <WelcomeLoader />
}

export default Login
