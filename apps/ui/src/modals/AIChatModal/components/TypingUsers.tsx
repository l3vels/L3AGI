import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import styled from 'styled-components'

type TypingUsersProps = {
  usersData: any
}

const TypingUsers = ({ usersData }: TypingUsersProps) => {
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
                  value='and'
                  type={Typography.types.P}
                  size={Typography.sizes.sm}
                />
              )}
          </>
        )
      })}
      {usersData.length > 1 && (
        <TypographySecondary
          value='are typing...'
          type={Typography.types.P}
          size={Typography.sizes.sm}
        />
      )}
      {usersData.length === 1 && (
        <TypographySecondary
          value='is typing...'
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
