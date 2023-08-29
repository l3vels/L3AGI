import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import useLog from 'pages/Log/useLog'

const ListLog = ({ is_active, item, navigate }: any) => {
  return (
    <StyledListItemContainer
      is_active={is_active}
      onClick={() => navigate(`/developers/successful/${item.id}`)}
    >
      <StyledListItemBlock>
        {/* <StyledStatusContainer> */}

        {item.status === '200' && (
          <>
            <Tags
              color='gradient_green'
              readOnly
              label={
                <>
                  <Typography
                    value={item.status}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor='rgba(0, 0, 0, 0.7)'
                  />
                  <Typography
                    value={parseInt(item.status) === 200 && ' OK'}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor='rgba(0, 0, 0, 0.7)'
                  />
                </>
              }
            />
          </>
        )}
        {item.is_gql === true ? (
          <>
            <StyledUrlContainer>
              <StyledGqlNameWrapper>
                <Typography
                  value={item.gql_name}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor='#FFFFFF'
                />
              </StyledGqlNameWrapper>

              {/* <Typography
                value='&ensp; &ensp;'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor='#FFFFFF'
              /> */}
              <StyledEndpointNameWrapper>
                <Typography
                  value={item.endpoint}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor='#FFFFFF'
                />
              </StyledEndpointNameWrapper>
              <StyledTimeNameWrapper>
                <Typography
                  value={moment(item.request_date).format('h:mm:ss A')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor='rgba(255, 255, 255, 0.8)'
                />
              </StyledTimeNameWrapper>
            </StyledUrlContainer>
          </>
        ) : (
          <>
            <StyledUrlContainer>
              <Typography
                value={item.method}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor='#FFFFFF'
              />
              <Typography
                value='&ensp; &ensp;'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor='#FFFFFF'
              />
              <Typography
                value={item.endpoint}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor='#FFFFFF'
              />
            </StyledUrlContainer>
          </>
        )}
      </StyledListItemBlock>

      {/* <StyledTimeContainer>
        <Typography
          value={moment(item.request_date).format('h:mm:ss A')}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledTimeContainer> */}
    </StyledListItemContainer>
  )
}

const LogList = ({ items }: any) => {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <StyledContainer>
      <StyledTitle>
        <Typography
          value='Yesterday'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </StyledTitle>

      {/* {logs.map((log: any, index: number) => (
        // eslint-disable-next-line react/jsx-key
        <ListLog log={log} is_active={params.id === log.id} navigate={navigate} />
      ))} */}
      <>
        {items.map((item: any, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <ListLog item={item} is_active={params.id === item.id} navigate={navigate} />
        ))}
      </>
    </StyledContainer>
  )
}

export default LogList

const StyledContainer = styled.div``
const StyledTitle = styled.div``

const StyledListItemContainer = styled.div<{ is_active?: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  padding: 15px 10px;
  background: ${({ is_active }) => (is_active ? 'rgba(255, 255, 255, 0.3)' : 'transparent')};
  cursor: pointer;
  align-items: center;
  margin-top: 1px;
  border-radius: 6px;
`
const StyledListItemBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 5px;
`

const StyledStatusContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(100px);
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  padding: 2px 4px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
`

const StyledUrlContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  width: fit-content;
  gap: 20px;
  margin-left: 20px;
`
const StyledTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
`
const StyledGqlNameWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
`
const StyledEndpointNameWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 120px;
`
const StyledTimeNameWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  width: 120px;
`
