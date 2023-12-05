import { v4 as uuidv4 } from 'uuid'
import About from 'share-ui/components/Icon/Icons/components/About'
import Teams from 'share-ui/components/Icon/Icons/components/Teams'
import Collection from 'share-ui/components/Icon/Icons/components/Collection'
import Value from 'share-ui/components/Icon/Icons/components/Value'
import Add from 'share-ui/components/Icon/Icons/components/Add'
import Sun from 'share-ui/components/Icon/Icons/components/Sun'
import HomeIconSvg from 'assets/svgComponents/HomeIconSvg'

import styled from 'styled-components'
import { StyledValueIcon } from 'pages/Navigation/MainNavigation'

export const defaultData = (path_id?: any) => {
  return [
    {
      id: uuidv4(),
      name: 'Home',
      url: '/',
      option: 'link',
      group_name: 'Go to',
      icon: <StyledHomeIcon />,
    },

    {
      id: uuidv4(),
      name: 'Agents',
      url: '/agents',
      option: 'link',
      group_name: ['Go to'],
      icon: <StyledCollectionIcon />,
    },
    {
      id: uuidv4(),
      name: 'Datasources',
      url: '/datasources',
      option: 'link',
      group_name: ['Go to'],
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
      group_name: ['Go to'],
      icon: <StyledTeamsIcon />,
    },
    {
      id: uuidv4(),
      name: 'Toolkits',
      url: '/toolkits',
      option: 'link',
      group_name: ['Go to'],
      icon: <StyledAddIcon />,
    },
    // {
    //   id: uuidv4(),
    //   name: 'Teams',
    //   url: '/teams',
    //   option: 'link',
    //   group_name: ['Go to'],
    //   icon: <Teams />,
    // },

    {
      id: uuidv4(),
      name: 'Create agent',
      url: '/agents/create-agent',
      option: 'link',
      group_name: ['Go to'],
      icon: <StyledCollectionIcon />,
    },

    {
      id: uuidv4(),
      name: 'Add datasource',
      url: '/datasources/create-datasource',
      option: 'link',
      group_name: ['Go to'],
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
    //   group_name: 'Go to',
    //   icon: <Players />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Collections',
    //   url: '/collections',
    //   option: 'show-collections',
    //   group_name: 'Go to',
    //   icon: <Contracts />,
    // },

    // {
    //   id: uuidv4(),
    //   name: 'Change Password',
    //   url: '/change-password',
    //   option: 'modal',
    //   group_name: 'Go to',
    //   icon: <Players />,
    // },
    {
      id: uuidv4(),
      name: 'Profile',
      url: '/account',
      option: 'modal',
      group_name: 'Go to',
      icon: <StyledAboutIcon />,
    },
    {
      id: uuidv4(),
      name: 'Logout',
      url: 'create',
      option: 'modal',
      // group_name: 'Go to',
      icon: <StyledAboutIcon />,
    },
    {
      id: uuidv4(),
      name: 'Set-blue-theme',
      option: 'theme',
      // group_name: '',
      icon: <StyledSunIcon />,
    },
    {
      id: uuidv4(),
      name: 'Set light theme',
      option: 'theme',
      // group_name: '',
      icon: <StyledSunIcon />,
    },
  ]
}

const StyledSunIcon = styled(Sun)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledAboutIcon = styled(About)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledHomeIcon = styled(HomeIconSvg)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledCollectionIcon = styled(Collection)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledAddIcon = styled(Add)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledTeamsIcon = styled(Teams)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

// const StyledIcon = styled(Value)`
//   path {
//     fill: ${({ theme }) => theme.body.iconColor};
//   }
// `
