// import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Add from 'share-ui/components/Icon/Icons/components/Add'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import Table from 'components/Table'
import {
    StyledHeaderGroup,
    StyledSectionTitle,
    StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import useInviteUsers from './useInviteUsers'
import SharedAccess from './SharedAccess'


const InviteUsers = () => {
//   const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, fetch_data_loading, columns } = useInviteUsers()

    return (
        <StyledSectionWrapper>
            <StyledHeaderGroup className='header_group'>
                <StyledSectionTitle>Invite Users</StyledSectionTitle>

                <ButtonPrimary
                onClick={() => navigate('/invite-user/invite')}
                leftIcon={Add}
                size={Button.sizes?.SMALL}
                >
                {/* {t('create-api-key')} */}
                    Invite User
                </ButtonPrimary>
            </StyledHeaderGroup>

            <ComponentsWrapper noPadding>
                <StyledTableWrapper>
                <Table columns={columns} data={data} isLoading={fetch_data_loading} />
                </StyledTableWrapper>
            </ComponentsWrapper>

            <SharedAccess />
        </StyledSectionWrapper>
    )
};

export default InviteUsers