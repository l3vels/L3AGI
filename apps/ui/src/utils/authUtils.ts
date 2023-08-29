import { queryStringFromObject } from 'utils'

const redirectToLogin = () => {
  const state = { environment: import.meta.env.REACT_APP_ENV }
  const query = {
    client_id: import.meta.env.REACT_APP_FUSION_AUTH_APPID,
    redirect_uri: import.meta.env.REACT_APP_FUSION_REDIRECT_URL,
    response_type: 'code',
    scope: 'offline_access',
    tenantId: `${import.meta.env.REACT_APP_FUSION_TENANT_ID}`,
    state: JSON.stringify(state),
  }

  const queryString = queryStringFromObject(null, query)
  return (window.location.href = `${
    import.meta.env.REACT_APP_FUSION_AUTH_URL
  }/oauth2/authorize?${queryString}`)
}

export default {
  redirectToLogin,
}
