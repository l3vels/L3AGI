import React from 'react'
import styled from 'styled-components'

const ViewUserInfo = ({ user, account }: { user: ViewUserInfoProps; account: any }) => {
  const isUser = user.role === 'user'

  return (
    <Container>
      <AvatarBox>
        <img src={'UserIcon'} alt='user-icon' />
        <StyledTextCrop>
          <span>{user.first_name} </span>
          <span>{user.last_name}</span>
        </StyledTextCrop>
      </AvatarBox>

      <UserInfoContainer>
        <TopSection>
          <TopItem>
            <span>Email:</span>
            <span>{user.email}</span>
          </TopItem>
          <TopItem>
            <span>User Id:</span>
            <span>{user.id}</span>
          </TopItem>
        </TopSection>

        <BottomSection>
          <div>
            <span>Contact number:</span>
            <span>{user.contact_number}</span>
          </div>
          <div>
            <span>Role:</span>
            <span>{user.role}</span>
          </div>
          <div>
            <span>Created date:</span>
            <span>{user.created_on}</span>
          </div>
          <div>
            <span>Last login:</span>
            <span>{user.last_login}</span>
          </div>
          <div>
            <span>Last login:</span>
            <span>{user.last_login}</span>
          </div>
          {isUser && (
            <>
              <div>
                <span>Company name:</span>
                <span>{account.company_name}</span>
              </div>

              <div>
                <span>Role:</span>
                <span>{account.company_role}</span>
              </div>

              <div>
                <span>Company size:</span>
                <span>{account.company_size}</span>
              </div>
              <div>
                <span>Transition status:</span>
              </div>
            </>
          )}
        </BottomSection>
      </UserInfoContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 40px;
`

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  img {
    width: 100px;
    heigth: 100px;
  }
`

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid gray;
  padding: 0 20px;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-bottom: 1px solid gray;
`
const TopItem = styled.div`
  display: flex;
  margin-bottom: 5px;
`
const BottomSection = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 30px;
`

const StyledTextCrop = styled.span`
  width: 99%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
`

type ViewUserInfoProps = {
  id: string
  email: string
  first_name: string
  last_name: string
  contact_number: string
  role: string
  created_on: string
  last_login: string
}

export default ViewUserInfo
