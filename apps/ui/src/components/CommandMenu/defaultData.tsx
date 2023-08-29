import { v4 as uuidv4 } from 'uuid'

import About from '@l3-lib/ui-core/dist/icons/About'
import Home from '@l3-lib/ui-core/dist/icons/Home'
import API from '@l3-lib/ui-core/dist/icons/API'
import Doc from '@l3-lib/ui-core/dist/icons/Doc'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import Teams from '@l3-lib/ui-core/dist/icons/Teams'
import Players from '@l3-lib/ui-core/dist/icons/Players'
import Contracts from '@l3-lib/ui-core/dist/icons/Contracts'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Logs from '@l3-lib/ui-core/dist/icons/Logs'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'
import HomeIconSvg from 'assets/svgComponents/HomeIconSvg'
import StarVector from 'assets/svgComponents/StarVector'

export const defaultData = (path_id?: any) => {
  return [
    {
      id: uuidv4(),
      name: 'Home',
      url: '/',
      option: 'link',
      group_name: 'go_to',
      icon: <HomeIconSvg />,
    },
    {
      id: uuidv4(),
      name: 'Games',
      // url: '/game',
      option: 'show-games',
      group_name: ['go_to'],
      icon: <Games />,
    },
    {
      id: uuidv4(),
      name: 'Teams',
      url: '/teams',
      option: 'link',
      group_name: ['go_to'],
      icon: <Teams />,
    },
    // {
    //   id: uuidv4(),
    //   name: 'Developers',
    //   url: '/developers',
    //   option: 'link',
    //   group_name: ['go_to'],
    //   icon: <Players />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Open chat',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Open chat',
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to'],
    //   icon: <StarVector />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'API Keys',
    //   url: '/developers/api-keys',
    //   option: 'link',
    //   group_name: 'go_to',
    //   icon: <API />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Logs',
    //   url: '/developers/logs',
    //   option: 'link',
    //   group_name: 'go_to',
    //   icon: <Logs />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Webhook',
    //   url: '/developers/webhook',
    //   option: 'link',
    //   group_name: 'go_to',
    //   icon: <TagsOutline />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Docs',
    //   url: 'https://docs.l3vels.xyz/docs',
    //   option: 'separate-link',
    //   group_name: 'go_to',
    //   icon: <Doc />,
    // },
    {
      id: uuidv4(),
      name: 'Create Game',
      modal_name: 'create-game-modal',
      modal_title: 'Create game',
      url: '',
      option: 'open-modal',
      group_name: 'create',
      icon: <Games />,
    },

    // {
    //   id: uuidv4(),
    //   name: 'Create Game',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Create game',
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to', 'ai'],
    //   icon: <Games />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Generate Media',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Generate media',
    //   modalData: {
    //     apiVersion: ApiVersionEnum.MediaV1,
    //   },
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to', 'ai'],
    //   icon: <Games />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Generate Report',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Generate report',
    //   modalData: {
    //     apiVersion: ApiVersionEnum.ReportV1,
    //   },
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to', 'ai'],
    //   icon: <Games />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Generate Collection',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Generate collection',
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to', 'ai'],
    //   icon: <Games />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Generate Asset',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Generate asset',
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to', 'ai'],
    //   icon: <Games />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Generate Contract',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Generate contract',
    //   url: '',
    //   option: 'open-modal',
    //   group_name: ['go_to', 'ai'],
    //   icon: <Games />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Create game AI',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Create game AI',
    //   url: '',
    //   option: 'open-modal',
    //   search_index: ['create', 'game', 'ai'],
    // },
    {
      id: uuidv4(),
      name: 'Create collection',
      url: '',
      modal_name: 'create-collection-modal',
      modal_title: 'Create collection',
      option: !path_id ? 'show-games' : 'open-modal',
      group_name: 'create',
      icon: <Collection />,
    },
    {
      id: uuidv4(),
      name: 'Create contract',
      url: '',
      modal_name: 'create-contract-modal',
      modal_title: 'Create contract',
      option: !path_id ? 'show-games' : 'open-modal',
      group_name: 'create',
      icon: <Contracts />,
    },

    {
      id: uuidv4(),
      name: 'General',
      url: '/copilot',
      option: 'open-chat',
      group_name: 'copilot',
      icon: <Home />,
    },
    // tested
    // {
    //   id: uuidv4(),
    //   name: 'Create asset',
    //   url: '',
    //   modal_name: 'create-asset-modal',
    //   modal_title: 'Create asset',
    //   option: 'show-collections',
    //   group_name: 'create',
    //   icon: <Collection />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Create property',
    //   url: '',
    //   modal_name: 'create-property-modal',
    //   modal_title: 'Create asset',
    //   option: !path_id ? 'show-games' : 'open-modal',
    //   group_name: 'create',
    //   icon: <Contracts />,
    // },
    // {
    //   id: uuidv4(),
    //   name: 'Assets',
    //   url: '/game',
    //   option: 'show-assets',
    //   group_name: 'go_to',
    //   icon: <Contracts />,
    // },
    {
      id: uuidv4(),
      name: 'Collections',
      url: '/collections',
      option: 'show-collections',
      group_name: 'go_to',
      icon: <Contracts />,
    },
    {
      id: uuidv4(),
      name: 'Players list',
      url: '/game',
      option: 'link',
      group_name: 'go_to',
      icon: <Players />,
    },

    {
      id: uuidv4(),
      name: 'Contract list',
      url: 'create',
      option: 'link',
      group_name: 'go_to',
      icon: <Contracts />,
    },

    {
      id: uuidv4(),
      name: 'Change Password',
      url: '/change-password',
      option: 'modal',
      group_name: 'go_to',
      icon: <Players />,
    },
    {
      id: uuidv4(),
      name: 'Profile',
      url: '/account',
      option: 'modal',
      group_name: 'go_to',
      icon: <About />,
    },
    {
      id: uuidv4(),
      name: 'Logout',
      url: 'create',
      option: 'modal',
      group_name: 'go_to',
      icon: <About />,
    },
  ]
}
