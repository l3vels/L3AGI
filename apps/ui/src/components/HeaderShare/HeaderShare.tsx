import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useAssignedUserListService } from 'services'
import { RandomAvatar } from 'helpers/RandomImage'

import Typography from 'share-ui/components/typography/Typography'
import Share from 'share-ui/components/Icon/Icons/components/Share'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'
import TypographySecondary from 'components/Typography/Secondary'

// import { avatarsArray } from 'assets/avatars'

type HeaderShareProps = {
  activeUsers?: any
}

const HeaderShare = ({ activeUsers = [] }: HeaderShareProps) => {
  const { t } = useTranslation()
  const { data: assignedUserList } = useAssignedUserListService()

  return (
    <StyledSharedColumn>
      {/* <Typography
        value={'Edited 1h ago'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(0, 0, 0, 0.3)'}
      /> */}
      <StyledAvatarsWrapper>
        {assignedUserList.map((user: any) => {
          const { assigned_user_first_name, id, assigned_user_id } = user

          return (
            <Tooltip
              key={id}
              content={<span>{assigned_user_first_name}</span>}
              position={Tooltip.positions.TOP}
            >
              <StyledAvatar active={activeUsers.includes(assigned_user_id)}>
                {/* <RandomAvatar imageArray={avatarsArray} /> */}
                {activeUsers.includes(assigned_user_id) && <StyledGreenDot />}
              </StyledAvatar>
            </Tooltip>
          )
        })}
      </StyledAvatarsWrapper>

      <StyledShareButton>
        <StyledIconWrapper>
          <Share />
        </StyledIconWrapper>

        <TypographySecondary
          value={t('share')}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledShareButton>
    </StyledSharedColumn>
  )
}

export default HeaderShare

const StyledSharedColumn = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
`
const StyledAvatarsWrapper = styled.div`
  display: flex;
  align-items: center;
`
const StyledAvatar = styled.div<{ active: boolean }>`
  position: relative;
  margin-left: -5px;
  opacity: 0.5;
  ${p =>
    p.active &&
    css`
      opacity: 1;
    `};
`
const StyledShareButton = styled.div`
  display: flex;
  padding: 0px 10px 0px 4px;
  justify-content: center;
  align-items: center;

  &:hover {
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`
const StyledIconWrapper = styled.div`
  color: #fff;
  /* background: transparent; */
`
const StyledGreenDot = styled.div`
  width: 10px;
  height: 10px;
  background: #61c72c;
  position: absolute;
  top: 22px;
  left: 24px;
  border-radius: 100px;
`
