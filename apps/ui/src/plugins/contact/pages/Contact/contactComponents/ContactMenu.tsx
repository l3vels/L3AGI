import AgentChatCard from 'components/ChatCards/AgentChatCard'
import { useModal } from 'hooks'
import { CallContext } from 'plugins/contact/contexts'
import { CreateCallInput } from 'plugins/contact/services/call/useCreateCallService'
import { useContext } from 'react'
import MenuButton from 'share-ui/components/MenuButton/MenuButton'
import styled from 'styled-components'
import { AgentWithConfigs } from 'types'

const ContactMenu = ({
  ariaLabel,
  icon,
  agentData,
  handleCall,
  contactId,
  callType,
}: {
  ariaLabel: string
  icon: any
  agentData: AgentWithConfigs[]
  handleCall: (input: CreateCallInput) => void
  contactId: string
  callType: CreateCallInput['type']
}) => {
  const { openModal } = useModal()
  const { setCallIds } = useContext(CallContext)

  return (
    <MenuButton ariaLabel={ariaLabel} component={icon} closeDialogOnContentClick={false} zIndex={1}>
      <StyledMenuList>
        {agentData?.map((agentObj: AgentWithConfigs, index: number) => {
          const { agent } = agentObj

          const handleView = () => {
            openModal({
              name: 'agent-view-modal',
              data: {
                agent: agentObj,
              },
            })
          }

          return (
            <AgentChatCard
              key={index}
              onClick={() => {
                if (callType === 'browser') {
                  setCallIds({
                    agentId: agent.id,
                    contactId: contactId,
                  })
                } else {
                  handleCall({
                    agent_id: agent.id,
                    contact_id: contactId,
                    type: callType,
                  })
                }
              }}
              onViewClick={handleView}
              picked={false}
              agent={agent}
            />
          )
        })}
      </StyledMenuList>
    </MenuButton>
  )
}

export default ContactMenu

const StyledMenuList = styled.div`
  /* width: 100px;
  height: 100px; */
  padding: 10px;
  overflow: auto;

  max-height: 300px;

  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
