import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'

type PluginListProps = {
  isNew?: boolean
  title: string
  description: string
  children: any
}

const PluginList = ({ title, description, isNew = false, children }: PluginListProps) => {
  return (
    <StyledPluginList>
      <StyledListHeader>
        <StyledListTitle>
          <Typography
            value={title}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          {isNew && <Tags label='New' readOnly color='gradient_yellow' size='small' />}
        </StyledListTitle>
        <Typography
          value={description}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'rgba(255, 255, 255, 0.8)'}
        />
      </StyledListHeader>

      <StyledItemsWrapper>{children}</StyledItemsWrapper>
    </StyledPluginList>
  )
}

export default PluginList

const StyledPluginList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* align-items: center; */
`

const StyledListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const StyledItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
`
