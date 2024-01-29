import { useEffect, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import defaultMentionStyle from './defaultMentionStyle'
import defaultStyle from './defaultStyle'

import styled from 'styled-components'
import { useAssignedUserListService } from 'services'

import Typography from 'share-ui/components/typography/Typography'

import l3Icon from 'assets/avatars/l3.png'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useTeamOfAgentsService } from 'services/team/useTeamOfAgentsService'
import { Nullable } from 'types'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'
import TypographyQuaternary from 'components/Typography/Quaternary'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

type OnChangeHandlerType = (event: { target: { value: string } }) => void

type MentionsProps = {
  inputRef: React.RefObject<HTMLTextAreaElement> | null
  value: string
  onChange: OnChangeHandlerType
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  setValue: any
  agentId?: Nullable<string>
  teamId?: Nullable<string>
}

const Mentions = ({
  inputRef,
  onChange,
  onKeyDown,
  value,
  setValue,
  agentId,
  teamId,
}: MentionsProps) => {
  const [focusAfterAdd, setFocusAfterAdd] = useState(false)

  const { data: users } = useAssignedUserListService()

  const { data: agents } = useAgentsService()
  const { data: teamsOfAgents } = useTeamOfAgentsService()

  const { data: teamOfAgentsById } = useTeamOfAgentsByIdService({ id: teamId })

  const chatType = agentId ? 'agent' : teamId ? 'team' : 'general'

  const agentMentions = agents.map((agent: any) => {
    const { id, name } = agent.agent

    return {
      display: name,
      id: `agent__${id}`,
      type: 'Agent',
      icon: <AvatarGenerator name={name} size={25} />,
    }
  })

  const teamsOfAgentsMentions = teamsOfAgents.map((team: any) => {
    const { id, name } = team

    return {
      display: name,
      id: `team__${id}`,
      type: 'Team Of Agents',
      icon: <AvatarGenerator name={name} size={25} />,
    }
  })

  const usersMentions: any = users.map((user: any) => {
    return {
      display: user.assigned_user_first_name,
      id: `user__${user.assigned_user_id}`,
      type: 'Team Member',
    }
  })

  const teamOfAgentMemberMentions =
    teamOfAgentsById?.team_agents.map((teamAgent: any) => {
      return {
        display: teamAgent.agent.name,
        id: `agent__${teamAgent.agent.id}`,
        type: 'Agent',
        icon: <AvatarGenerator name={teamAgent.agent.name} size={25} />,
      }
    }) || []

  // const teamOfAgentMembersMentions = teamOfAgentsById

  const mentions =
    chatType === 'general'
      ? [...agentMentions, ...teamsOfAgentsMentions, ...usersMentions]
      : chatType === 'team'
      ? [...teamOfAgentMemberMentions, ...usersMentions]
      : usersMentions

  const displayTransform = (id: string) => {
    const display = mentions.find((item: any) => item.id.includes(id))?.display
    // Add the "@" symbol to the display when the suggestion is picked
    return `@${display} `
  }

  useEffect(() => {
    if (focusAfterAdd) {
      inputRef?.current?.setSelectionRange(value.length, value.length)
    }

    return () => {
      setFocusAfterAdd(false)
    }
  }, [focusAfterAdd])

  return (
    <>
      <StepWrapper>
        <div className='direction-input-wrapper'>
          <StyledMentionsInput
            style={defaultStyle}
            className='direction-input'
            // forceSuggestionsAboveCursor
            inputRef={inputRef}
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
            customSuggestionsContainer={children => <StyledContainer>{children}</StyledContainer>}
          >
            <Mention
              onAdd={() => {
                setValue((prevState: string) => {
                  return `${prevState} `
                })
                setFocusAfterAdd(true)
              }}
              renderSuggestion={suggestion => {
                const { type, icon }: any = suggestion
                return (
                  <StyledSuggestionsWrapper>
                    <StyledNameWrapper>
                      {icon}
                      <div>{suggestion.display}</div>
                    </StyledNameWrapper>

                    <TypographyQuaternary
                      value={type}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                    />
                  </StyledSuggestionsWrapper>
                )
              }}
              style={defaultMentionStyle}
              displayTransform={displayTransform}
              data={mentions}
              trigger={'@'}
              markup='@[__display__](__id__)__mention__'
            />
          </StyledMentionsInput>
        </div>
      </StepWrapper>
    </>
  )
}

export default Mentions

const StyledMentionsInput = styled(MentionsInput)`
  width: 100%;

  min-height: 26px;
`
const StepWrapper = styled.div`
  .direction-input-wrapper {
    border: none;

    textarea {
      color: ${({ theme }) => theme.body.textColorPrimary} !important;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }

  .mention-suggestion {
    width: 100%;
  }
`

const StyledContainer = styled.div`
  background: var(--gradient-blue, linear-gradient(180deg, #3582ca 0%, #405fc2 100%));

  width: 100%;

  position: fixed;
  bottom: 55px;
  left: 50%;
  transform: translateX(-50%);

  border-radius: 8px;
  padding: 10px 0;
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
`
const StyledSuggestionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
