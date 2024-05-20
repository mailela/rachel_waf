import defaultSettings from '@/settings'

const title = defaultSettings.title || 'RACHEL WAF'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
