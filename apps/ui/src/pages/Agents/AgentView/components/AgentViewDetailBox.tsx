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
          <Typography
            value={name}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
          {isCreator && (
            <IconButton
              onClick={handleEdit}
              icon={() => <Edit />}
              size={IconButton.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              ariaLabel='Edit'
            />
          )}
        </StyledNameWrapper>
        {creator && (
          <Typography
            value={`By ${creator.name}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
            customColor={'rgba(255,255,255,0.6)'}
          />
        )}
        {!isCreator && (
          <div>
            <Button
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
            </Button>
          </div>
        )}
      </StyledWrapper>

      {description && (
        <>
          <StyledDivider />
          <StyledWrapper>
            <Typography
              value={description}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'rgba(255,255,255,0.9)'}
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
  background: rgba(0, 0, 0, 0.2);

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
  background: rgba(255, 255, 255, 0.4);
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
