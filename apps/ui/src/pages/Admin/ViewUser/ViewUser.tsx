import React from 'react'
import { StyledRoot, StyledHeading, StyledDropDownMenuContainer } from './ViewUserStyle'
import ViewUserInfo from './ViewUserInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { useAccountByIdService, useUserByIdService } from 'services'
// import Typography from 'bf-ui/dist/Typography'
// import DropdownItem from 'molecules/DropdownItem'
// import DropdownMenu from 'molecules/DropdownMenu'
import { useModal } from 'hooks'
// import DeleteIcon from "assets/images/deleteblack.svg"
import Loader from 'atoms/Loader'

import Button from '@l3-lib/ui-core/dist/Button'

const ViewUser = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id: string = params?.id!
  const { data: user, loading: userLoading } = useUserByIdService({ id })
  const { data: account, loading: accountLoading } = useAccountByIdService(user?.id)

  const { openModal } = useModal()

  const redirect = (to: string) => () => {
    navigate(to)
  }

  // if (user.id !== id) return <Typography variant="h3">User not found!</Typography>

  if (userLoading || accountLoading) return <Loader />

  return (
    <StyledRoot>
      <StyledHeading>
        <span>User Details</span>

        <StyledDropDownMenuContainer>
          <React.Fragment>
            <Button onClick={redirect(`/admin/user/edit/${id}`)}>Edit user</Button>
            <Button
              onClick={() => {
                openModal({
                  name: 'delete-user-confirmation',
                  data: {
                    id: user.id,
                    page: 'user-page',
                  },
                })
              }}
            >
              Delete user
            </Button>
            <Button
              onClick={() =>
                openModal({
                  name: 'resend-password-confirmation',
                  data: {
                    id: user.id,
                  },
                })
              }
            >
              Resend password
            </Button>
            <Button onClick={redirect(`/admin/user/edit/update-role/${id}`)}>Change role</Button>
          </React.Fragment>
        </StyledDropDownMenuContainer>
      </StyledHeading>

      <ViewUserInfo user={user} account={account} />
    </StyledRoot>
  )
}

export default ViewUser
