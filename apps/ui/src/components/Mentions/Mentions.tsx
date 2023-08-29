import { useEffect, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import defaultMentionStyle from './defaultMentionStyle'
import defaultStyle from './defaultStyle'

import styled from 'styled-components'
import { useAssignedUserListService } from 'services'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import RandomAvatarIcon from './components/RandomAvatarIcon'
import l3Icon from '../../modals/AIChatModal/assets/l3.png'

type OnChangeHandlerType = (event: { target: { value: string } }) => void

type MentionsProps = {
  inputRef: React.RefObject<HTMLTextAreaElement> | null
  value: string
  onChange: OnChangeHandlerType
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  setValue: any
}

const Mentions = ({ inputRef, onChange, onKeyDown, value, setValue }: MentionsProps) => {
  const [focusAfterAdd, setFocusAfterAdd] = useState(false)

  const { data: users } = useAssignedUserListService()

  const mentionsData: any = [
    {
      display: 'L3-GPT',
      id: `agent__L3-GPT`,
      type: 'AI',
      icon: <Avatar size={Avatar.sizes.SMALL} src={l3Icon} type={Avatar.types.IMG} rectangle />,
    },
    {
      display: 'L3-Planner',
      id: `agent__L3-Planner`,
      type: 'AI',
      icon: <Avatar size={Avatar.sizes.SMALL} src={l3Icon} type={Avatar.types.IMG} rectangle />,
    },
    {
      display: 'L3-Authoritarian-Speaker',
      id: `agent__L3-Authoritarian-Speaker`,
      type: 'AI',
      icon: <Avatar size={Avatar.sizes.SMALL} src={l3Icon} type={Avatar.types.IMG} rectangle />,
    },
    {
      display: 'L3-Agent-Debates',
      id: `agent__L3-Agent-Debates`,
      type: 'AI',
      icon: <Avatar size={Avatar.sizes.SMALL} src={l3Icon} type={Avatar.types.IMG} rectangle />,
    },
  ]

  const usersData: any = users?.map((user: any) => {
    return {
      display: user.assigned_user_first_name,
      id: `user__${user.assigned_user_id}`,
      type: 'Team Member',
      icon: <RandomAvatarIcon />,
    }
  })

  if (usersData) {
    mentionsData.push(...usersData)
  }

  const displayTransform = (id: string) => {
    const display = mentionsData.find((item: any) => item.id.includes(id))?.display
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

                    <Typography
                      value={type}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'rgba(255, 255, 255, 0.4)'}
                    />
                  </StyledSuggestionsWrapper>
                )
              }}
              style={defaultMentionStyle}
              displayTransform={displayTransform}
              data={mentionsData}
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
`
const StepWrapper = styled.div`
  .direction-input-wrapper {
    border: none;

    textarea {
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
