import Typography from 'share-ui/components/typography/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

type TypingUsersProps = {
  usersData: any
}

const TypingUsers = ({ usersData }: TypingUsersProps) => {
  const { t } = useTranslation()
  return (
    <StyledTypingUsersWrapper>
      {usersData?.map((data: any, index: number) => {
        return (
          <>
            <TypographySecondary
              value={data.text}
              type={Typography.types.P}
              size={Typography.sizes.sm}
            />

            {usersData.length > 1 &&
              index !== usersData.length - 1 &&
              index === usersData.length - 2 && (
                <TypographySecondary
                  value={t('and')}
                  type={Typography.types.P}
                  size={Typography.sizes.sm}
                />
              )}
          </>
        )
      })}
      {usersData.length > 1 && (
        <TypographySecondary
          value={t('are-typing')}
          type={Typography.types.P}
          size={Typography.sizes.sm}
        />
      )}
      {usersData.length === 1 && (
        <TypographySecondary
          value={t('is-typing')}
          type={Typography.types.P}
          size={Typography.sizes.sm}
        />
      )}
    </StyledTypingUsersWrapper>
  )
}

export default TypingUsers

const StyledTypingUsersWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  width: 100%;
`
