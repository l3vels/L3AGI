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
import Value from '@l3-lib/ui-core/dist/icons/Value'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import HomeIconSvg from 'assets/svgComponents/HomeIconSvg'
import StarVector from 'assets/svgComponents/StarVector'
import { StyledValueIcon } from 'pages/Navigation/MainNavigation'

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
      name: 'Agents',
      url: '/agents',
      option: 'link',
      group_name: ['go_to'],
      icon: <Collection />,
    },
    {
      id: uuidv4(),
      name: 'Datasources',
      url: '/datasources',
      option: 'link',
      group_name: ['go_to'],
      icon: (
        <StyledValueIcon>
          <Value />
        </StyledValueIcon>
      ),
    },
    {
      id: uuidv4(),
      name: 'Team Of Agents',
      url: '/team-of-agents',
      option: 'link',
      group_name: ['go_to'],
      icon: <Teams />,
    },
    {
      id: uuidv4(),
      name: 'Toolkits',
      url: '/toolkits',
      option: 'link',
      group_name: ['go_to'],
      icon: <Add />,
    },
    // {
    //   id: uuidv4(),
    //   name: 'Teams',
    //   url: '/teams',
    //   option: 'link',
    //   group_name: ['go_to'],
    //   icon: <Teams />,
    // },

    {
      id: uuidv4(),
      name: 'Create agent',
      url: '/agents/create-agent',
      option: 'link',
      group_name: ['go_to'],
      icon: <Collection />,
    },

    {
      id: uuidv4(),
      name: 'Add datasource',
      url: '/datasources/create-datasource',
      option: 'link',
      group_name: ['go_to'],
      icon: (
        <StyledValueIcon>
          <Value />
        </StyledValueIcon>
      ),
    },

    // {
    //   id: uuidv4(),
    //   name: 'General',
    //   url: '/chat',
    //   option: 'open-chat',
    //   group_name: 'chat',
    //   icon: <Home />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Agents List',
    //   url: '/agents',
    //   option: 'show-agents',
    //   group_name: 'go_to',
    //   icon: <Players />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Collections',
    //   url: '/collections',
    //   option: 'show-collections',
    //   group_name: 'go_to',
    //   icon: <Contracts />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Change Password',
    //   url: '/change-password',
    //   option: 'modal',
    //   group_name: 'go_to',
    //   icon: <Players />,
    // },
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
    {
      id: uuidv4(),
      name: 'Dark',
      option: 'theme',
      group_name: 'go_to',
      icon: <Add />,
    },
    {
      id: uuidv4(),
      name: 'Light',
      option: 'theme',
      group_name: 'go_to',
      icon: <Add />,
    },
  ]
}
