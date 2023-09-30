import React from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TagsRow from './TagsRow'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

import Download from '@l3-lib/ui-core/dist/icons/Download'

import { useNavigate } from 'react-router-dom'
import { useModal } from 'hooks'
import { AuthContext } from 'contexts'
import { StyledEyeEditIcon } from 'modals/AIChatModal/components/ChatMembers/ChatMembers'
import { StyledShortDescription } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyTertiary from 'components/Typography/Tertiary'
import { ButtonPrimary } from 'components/Button/Button'

type AgentViewDetailBoxProps = {
  agentData: any
}

const AgentVIewDetailBox = ({ agentData }: AgentViewDetailBoxProps) => {
  const { user } = React.useContext(AuthContext)

  const navigate = useNavigate()
  const { closeModal } = useModal()

  const { agent, configs } = agentData

  const { name, description, role, creator } = agent

  const { model_version, model_provider, temperature } = configs

  const isCreator = user?.id === agent?.created_by

  const handleEdit = () => {
    closeModal('agent-view-modal')
    navigate(`/agents/${agent?.id}/edit-agent`)
  }

  return (
    <StyledDetailsBox>
      <StyledWrapper>
        <StyledNameWrapper>
          <TypographyPrimary
            value={name}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />

          {isCreator && (
            <IconButton
              onClick={handleEdit}
              icon={() => <StyledEyeEditIcon />}
              size={IconButton.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              ariaLabel='Edit'
            />
          )}
        </StyledNameWrapper>
        {creator && (
          <TypographySecondary
            value={`By ${creator.name}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
          />
        )}
        {!isCreator && (
          <div>
            <ButtonPrimary
              size={Button.sizes.SMALL}
              onClick={() => {
                closeModal('agent-view-modal')
                navigate(`/agents/create-agent?agentId=${agent.id}`)
              }}
            >
              <StyledInnerButtonWrapper>
                <Download size={28} />
                Add
              </StyledInnerButtonWrapper>
            </ButtonPrimary>
          </div>
        )}
      </StyledWrapper>

      {description && (
        <>
          <StyledDivider />
          <StyledWrapper>
            <TypographyTertiary
              value={description}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </StyledWrapper>
        </>
      )}

      <StyledDivider />

      <StyledWrapper>
        {role && <TagsRow title='Role' items={[role]} />}

        {model_provider && <TagsRow title='Provider' items={[model_provider]} />}

        {model_version && <TagsRow title='Model' items={[model_version]} />}

        {temperature && <TagsRow title='Temperature' items={[temperature]} />}
      </StyledWrapper>
    </StyledDetailsBox>
  )
}

export default AgentVIewDetailBox

export const StyledDetailsBox = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  width: 100%;
  max-width: 300px;
  min-width: 300px;
  height: fit-content;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`

export const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.body.placeHolderColor};
`
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`
export const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 5px;
`
