import { Navigate, Route as Router, Routes } from 'react-router-dom'
import About from './pages/About'

import Channels from './pages/Channels'
import Create from './pages/Create'

import Home from './pages/Home'
import Saved from './pages/Saved'
import Settings from './pages/Settings'
import Teams from './pages/Teams'

import { ForgotPassword, Login, Register, ResetPassword, TwoFAuthentication } from 'pages/Auth'
import ApiKeys from 'pages/ApiKeys/ApiKeys'

import MainComponent from 'pages/MainComponent'
import ChangePassword from 'pages/ChangePassword'
import Account from 'pages/Account'
import { AuthContext } from 'contexts'
import { useContext, useState } from 'react'
import ManageUsers from 'pages/Admin/ManageUsers'
import CreateUser from 'pages/Admin/CreateUser'
import EditUser from 'pages/Admin/EditUser'
import ViewUser from 'pages/Admin/ViewUser'
import UpdateRole from 'pages/Admin/UpdateRole'

import { PublicRoute, AdminRoute } from 'routes'

import UpdatePassword from 'pages/UpdatePassword'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
import { WelcomeLoader } from 'components/Loader/WelcomeLoader'
import { CheatCode } from 'pages/Auth/Register/CheatCode'

import Log from 'pages/Log/Log'
import Webhook from 'pages/Webhook/Webhook'

import { useHotkeys } from 'react-hotkeys-hook'

import DeleteConfirmationModal from 'modals/DeleteConfirmationModal'

import MainRouteLayout from 'routes/MainRouteLayout'

import DevelopersRouteLayout from 'routes/DevelopersRouteLayout'
import CommandMenu from 'components/CommandMenu/CommandMenu'
import RootLayout from 'routes/RootLayout'
import AIChat from 'modals/AIChatModal/AIChat'
import ChatRouteLayout from 'routes/ChatRouteLayout'
import CreateAgentModal from 'modals/CreateAgentModal'
import EditAgentModal from 'modals/EditAgentModal'
import CreateDatasourceModal from 'modals/CreateDatasourceModal'
import EditDatasourceModal from 'modals/EditDatasourceModal'

const Route = () => {
  const { user, loading } = useContext(AuthContext)
  const [theme] = useState(defaultTheme)
  const [cmdkOpen, setCmdkOpen] = useState(false)

  useHotkeys('ctrl+enter, meta+k', event => {
    event.preventDefault()
    setCmdkOpen(true)
    return false
  })

  if (loading) return <WelcomeLoader />

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <>
          {user?.role === 'admin' ? (
            <Router element={<AdminRoute />}>
              <Router path='/' element={<ManageUsers />} />
              <Router path='/admin/users/create' element={<CreateUser />} />
              <Router path='/admin/user/edit/:id' element={<EditUser />} />
              <Router path='/admin/user/:id' element={<ViewUser />} />
              <Router path='/admin/user/edit/update-role/:id' element={<UpdateRole />} />
            </Router>
          ) : (
            // <Router>
            <Router element={<RootLayout />}>
              <Router element={<MainRouteLayout />}>
                <Router path='/' element={<Home />} key={document.location.href} />

                <Router path='teams' element={<Teams />} key={document.location.href} />
                <Router path='channels' element={<Channels />} key={document.location.href} />
                {/* <Router path='developers' element={<Navigate to={'api-keys'} />} /> */}

                {/* // disabled routes  */}
                <Router path='saved' element={<Saved />} key={document.location.href} />
                <Router path='create' element={<Create />} key={document.location.href} />
                <Router
                  path='change-password'
                  element={<ChangePassword />}
                  key={document.location.href}
                />
                <Router path='account' element={<Account />} key={document.location.href} />
                <Router path='api-keys' element={<ApiKeys />} key={document.location.href} />
                <Router path='settings' element={<Settings />} key={document.location.href} />
                <Router path='about' element={<About />} key={document.location.href} />
                <Router path='logs' element={<Log />} key={document.location.href} />
                <Router path='log/:id' element={<Log />} key={document.location.href} />
                <Router path='successful/:id' element={<Log />} key={document.location.href} />
                <Router path={'failed/:id'} element={<Log />} key={document.location.href} />
                <Router path='webhook' element={<Webhook />} key={document.location.href} />
              </Router>

              <Router path={'copilot'} element={<ChatRouteLayout />} key={document.location.href}>
                <Router index element={<AIChat />} key={document.location.href} />
              </Router>

              <Router path={'developers'} element={<DevelopersRouteLayout />}>
                <Router index element={<ApiKeys />} key={document.location.href} />
                <Router path={'webhook'} element={<Webhook />} key={document.location.href} />
                <Router path={'logs'} element={<Log />} key={document.location.href} />
                <Router path={'log/:id'} element={<Log />} key={document.location.href} />
                <Router path={'successful/:id'} element={<Log />} key={document.location.href} />
                <Router path={'failed/:id'} element={<Log />} key={document.location.href} />
                {/* <Router path={'docs'} element={<Doc />} /> */}
              </Router>

              <Router path='*' element={<MainComponent value={'page not found'} />} />
            </Router>
          )}
        </>
        <Router element={<PublicRoute />}>
          <Router path='/login' element={<Login />} />
          <Router path='/register' element={<Register />} />
          <Router path='/forgot-password' element={<ForgotPassword />} />
          <Router path='/login/:id' element={<Login />} />
          <Router path='/reset-password/:id' element={<ResetPassword />} />
          <Router path='/authentication/:id' element={<TwoFAuthentication />} />
          <Router path='/login/update-password' element={<UpdatePassword />} />
          <Router path='/cheat-code' element={<CheatCode />} />
        </Router>
      </Routes>

      <DeleteConfirmationModal />
      <CreateAgentModal />
      <EditAgentModal />
      <CreateDatasourceModal />
      <EditDatasourceModal />
      <CommandMenu open={cmdkOpen} setCmdkOpen={setCmdkOpen} />

      {/* <NotificationsModal /> */}
    </ThemeProvider>
  )
}

export default Route
