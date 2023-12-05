import styled from 'styled-components'

import { useCallByIdService } from 'plugins/contact/services/call/useCallByIdService'
import Loader from 'share-ui/components/Loader/Loader'

type CallLogsProps = {
  chatId: string
}

const CallLogs = ({ chatId }: CallLogsProps) => {
  const { data, loading } = useCallByIdService({ id: chatId })

  if (loading) {
    return (
      <StyledLoaderWrapper>
        <Loader size={40} />
      </StyledLoaderWrapper>
    )
  }

  return (
    <StyledWrapper>
      {data?.logs.map(({ content }: any, index: number) => (
        <p key={index}>
          {index + 1}. {content}
        </p>
      ))}
    </StyledWrapper>
  )
}

export default CallLogs

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  color: #000;
  font-weight: bold;
`

const StyledLoaderWrapper = styled.div`
  position: absolute;
  width: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  margin-bottom: 20px;
  margin-left: 5px;
`
