import { useDomainConfigService } from 'plugins/contact/services/domainConfig/domainConfigService'

export const useDomainConfig = () => {
  const { data: domainConfig, loading: domainLoading } = useDomainConfigService()

  const loginPage = domainConfig?.login_page
  console.log('loginPage', loginPage)
  const getDomainConfig = (
    value: 'title' | 'content' | 'logo' | 'welcome_message' | 'login_page',
  ) => {
    if (value === 'title') return domainConfig?.title
    if (value === 'content') return domainConfig?.content
    if (value === 'logo') return domainConfig?.logo
    if (value === 'welcome_message') return domainConfig?.welcome_message
    if (value === 'login_page') {
      if (typeof loginPage !== 'object') {
        return {
          email_password: loginPage,
          github: loginPage,
          popup: loginPage,
          discovery: loginPage,
        }
      } else {
        return {
          email_password: loginPage?.email_password !== null ? loginPage?.email_password : true,
          github: loginPage?.github !== null ? loginPage?.github : true,
          popup: loginPage?.popup !== null ? loginPage?.popup : true,
          discovery: loginPage?.discovery !== null ? loginPage?.discovery : true,
        }
      }
    }
  }

  return {
    domainLoading,
    getDomainConfig,
    domainConfig,
  }
}
