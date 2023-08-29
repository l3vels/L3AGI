import HomeIconSvg from '../assets/svgComponents/HomeIconSvg'
import WalletIconSvg from '../assets/svgComponents/WalletIconSvg'
import About from '@l3-lib/ui-core/dist/icons/About'
import API from '@l3-lib/ui-core/dist/icons/API'
import Doc from '@l3-lib/ui-core/dist/icons/Doc'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import Teams from '@l3-lib/ui-core/dist/icons/Teams'
import Logs from '@l3-lib/ui-core/dist/icons/Logs'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'

const HEADER_DATA = [
  { name: 'home', routeLink: '/', icon: <HomeIconSvg /> },
  // { name: "channels", routeLink: "/channels", icon: <ChannelsIconSvg /> },
  // { name: "saved", routeLink: "/saved", icon: <SavedIconSvg /> },
  { name: 'Games', routeLink: '/game', icon: <WalletIconSvg /> },
  { name: 'Wallets', routeLink: '/wallets', icon: <WalletIconSvg /> },
  { name: 'Settings', routeLink: '/settings', icon: <WalletIconSvg /> },
]

const menuItemList = [
  { name: 'Home', routeLink: '/', icon: About, active: 'home' },
  { name: 'Games', routeLink: 'game', icon: Games, active: 'game' },
  // { name: 'Settings', routeLink: '/settings', icon: Settings, active: 'settings' },
  // { name: 'Logs', routeLink: '/logs', icon: BulletList, active: 'logs' },
  { name: 'Teams', routeLink: '/teams', icon: Teams, active: 'teams' },
  // { name: 'API', routeLink: '/api-keys', icon: API, active: 'api-keys' },
  { name: 'Developers', routeLink: '/developers', icon: API, active: 'developers' },
  // { name: "Events", routeLink: "/events", icon: <WalletIconSvg /> },
  // { name: 'Doc', routeLink: '/doc', icon: Doc, active: 'doc' },
  // {name:"Test", routeLink:"/fornite", icon:<SavedIconSvg/>},
  // {name:"About", routeLink:"/about", icon:<HomeIconSvg/>},
  // {name:"Collection", routeLink:"/collection/:id", icon:<HomeIconSvg/>},
]

const DEVELOPERS_ITEM_LIST = [
  // { name: 'Overview', routeLink: 'overview', icon: Games, active: 'overview' },
  { name: 'API keys', routeLink: 'api-keys', icon: Games, active: 'api-keys' },
  { name: 'Logs', routeLink: 'logs', icon: Logs, active: 'logs' },
  { name: 'Webhooks', routeLink: 'webhook', icon: TagsOutline, active: 'webhook' },
  {
    name: 'Docs',
    // routeLink: 'docs',
    icon: Doc,
    active: 'new tab',
    routeLink: 'https://docs.l3vels.xyz/docs',
  },
]

export { HEADER_DATA, menuItemList, DEVELOPERS_ITEM_LIST }
