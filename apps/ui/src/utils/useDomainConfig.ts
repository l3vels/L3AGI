import { useDomainConfigService } from 'plugins/contact/services/domainConfig/domainConfigService'

export const useDomainConfig = () => {
  const { data: domainConfig, loading: domainLoading } = useDomainConfigService()

  const getDomainConfig = (
    value: 'title' | 'content' | 'logo' | 'welcome_message' | 'login_page',
  ) => {
    if (value === 'title') return domainConfig?.title
    if (value === 'content') return domainConfig?.content
    if (value === 'logo') return domainConfig?.logo
    if (value === 'welcome_message') return domainConfig?.welcome_message
    if (value === 'login_page') return domainConfig?.login_page
  }

  return {
    domainLoading,
    getDomainConfig,
    domainConfig,
  }
}
