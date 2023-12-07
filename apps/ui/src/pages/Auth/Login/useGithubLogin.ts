import { useEffect } from 'react'
import { useGithubLoginService, useGithubLoginCompleteService } from 'services/useAuthService'
import { useLocation } from 'react-router-dom'
import { removeAccountId } from 'helpers/authHelper'

const useGithubLogin = () => {
  const [githubLogin] = useGithubLoginService()
  const [githubLoginComplete] = useGithubLoginCompleteService()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')

  useEffect(() => {
    const fetchGithubLoginComplete = async (code: string) => {
      const res = await githubLoginComplete(code)
      if (res && res.success) {
        removeAccountId()
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      } else {
        window.location.href = '/login'
      }
    }

    if (code) {
      fetchGithubLoginComplete(code)
    }
  }, [code])

  return {
    githubLogin,
    githubLoginComplete,
  }
}

export default useGithubLogin
