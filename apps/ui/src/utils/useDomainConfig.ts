import logo from 'assets/images/l3_logo.png'

export const useDomainConfig = () => {
  const domainEnv = import.meta.env
  const loginPage = JSON.parse(domainEnv.REACT_APP_LOGIN_PAGE)

  const getDomainConfig = (
    value: 'title' | 'content' | 'logo' | 'welcome_message' | 'login_page',
  ) => {
    if (value === 'title') return domainEnv.REACT_APP_TITLE || 'L3AGI'
    if (value === 'content') return domainEnv.REACT_APP_CONTENT || 'placeholder content'
    if (value === 'logo') return domainEnv.REACT_APP_LOGO || logo
    if (value === 'welcome_message')
      return domainEnv.REACT_APP_WELCOME_MESSAGE || 'placeholder welcome message'
    if (value === 'login_page') {
      return {
        email_password: loginPage.email_password === false ? false : true,
        github: loginPage.github === false ? false : true,
        popup: loginPage.popup === false ? false : true,
        discovery: loginPage.discovery === false ? false : true,
      }
    }
  }

  return {
    getDomainConfig,
  }
}
