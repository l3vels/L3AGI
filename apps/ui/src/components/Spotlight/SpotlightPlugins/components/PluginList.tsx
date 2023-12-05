import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import Tags from 'share-ui/components/Tags/Tags'

import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

type PluginListProps = {
  isNew?: boolean
  title: string
  description: string
  children: any
}

const PluginList = ({ title, description, isNew = false, children }: PluginListProps) => {
  const { t } = useTranslation()
  return (
    <StyledPluginList>
      <StyledListHeader>
        <StyledListTitle>
          <TypographyPrimary
            value={title}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          {isNew && (
            <Tags label={t('new')} readOnly color='gradient_yellow' size={Tags.sizes?.SMALL} />
          )}
        </StyledListTitle>
        <TypographySecondary
          value={description}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
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
