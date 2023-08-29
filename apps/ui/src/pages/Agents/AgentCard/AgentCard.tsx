import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Tags from '@l3-lib/ui-core/dist/Tags'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'

type AgentCardProps = {
  title: string
  subTitle: string
  modelVersion?: string
  provider?: string
  onEditClick: () => void
  onDeleteClick: () => void
  onViewClick: () => void
}

const AgentCard = ({
  title,
  subTitle,
  modelVersion,
  provider,
  onDeleteClick,
  onEditClick,
  onViewClick,
}: AgentCardProps) => {
  return (
    <StyledAgentCard>
      <StyledCardHeader>
        {modelVersion && (
          <Typography
            value={modelVersion}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor={'rgba(255,255,255, 0.8)'}
          />
        )}

        {provider && <Tags label={provider} readOnly size='small' />}
      </StyledCardHeader>
      <StyledCardBody>
        <Typography
          value={title}
          type={Typography.types.P}
          size={Typography.sizes.md}
          customColor={'#FFF'}
        />
        <Typography
          value={subTitle}
          type={Typography.types.P}
          size={Typography.sizes.sm}
          customColor={'rgba(255,255,255, 0.8)'}
        />
      </StyledCardBody>
      <StyledCardFooter>
        {/* <Button onClick={onViewClick} size={Button.sizes.MEDIUM}>
          View
        </Button> */}
        <StyledButtonsWrapper>
          <IconButton
            onClick={onEditClick}
            icon={() => <Edit />}
            size={Button.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
          />
          <IconButton
            onClick={onDeleteClick}
            icon={() => <Delete />}
            size={Button.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
          />
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledAgentCard>
  )
}

export default AgentCard

const StyledAgentCard = styled.div`
  width: 320px;
  min-width: 320px;
  height: 200px;
  min-height: 200px;

  padding: 20px;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledCardHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: auto;
  padding-bottom: 5px;
`

const StyledCardBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledCardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  padding-top: 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 2px;

  margin-left: auto;
`
