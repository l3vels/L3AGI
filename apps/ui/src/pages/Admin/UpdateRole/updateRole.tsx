import React, { useState, useEffect } from 'react'
import {
  StyledRoot,
  StyledUserName,
  StyledSelectContainer,
  StyledSelect,
  StyledOptions,
  StyledButton,
} from './UpdateRoleStyle'
import { useParams } from 'react-router-dom'
import { useUserByIdService, useChangeRoleByAdminService } from 'services'

import useSnackbarAlert from 'hooks/useSnackbar'
import Loader from 'atoms/Loader'

// import SpinnerLoader from 'bf-ui/dist/SpinnerLoader'

import { useTranslation } from 'react-i18next'

const UpdateRole = () => {
  const { t } = useTranslation()
  const params = useParams()
  const id: string = params?.id!
  const { data: user, loading, refetch } = useUserByIdService({ id })
  const [userRole, setUserRole] = useState('')
  const [updateRoleByAdmin] = useChangeRoleByAdminService()
  const { setSnackbar } = useSnackbarAlert()

  useEffect(() => {
    if (user?.role) {
      setUserRole(user.role)
    }
  }, [user])

  const changeRole = async (e: any) => {
    e.preventDefault()
    if (user.role !== userRole) {
      try {
        await updateRoleByAdmin(id, userRole)
        await refetch()
        setSnackbar({ message: t('user-role-updated'), variant: 'success' })
      } catch (error) {
        setSnackbar({ message: t('user-role-updated-failed'), variant: 'error' })
      }
    }
  }

  if (loading) return <Loader />

  return (
    <StyledRoot>
      <span>
        Change role for{' '}
        <StyledUserName>
          {user.first_name} {user.last_name}
        </StyledUserName>
      </span>
      <form onSubmit={changeRole}>
        <StyledSelectContainer>
          <StyledSelect
            name='change-role'
            value={userRole}
            onChange={e => setUserRole(e.target.value)}
          >
            <StyledOptions value='admin'>Admin</StyledOptions>
            <StyledOptions value='user'>User</StyledOptions>
          </StyledSelect>
          <StyledButton color='primary' type='submit'>
            {t('change-role')}
          </StyledButton>
        </StyledSelectContainer>
      </form>
    </StyledRoot>
  )
}

export default UpdateRole
