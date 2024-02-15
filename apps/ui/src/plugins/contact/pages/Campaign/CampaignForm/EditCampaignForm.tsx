import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'

import { StyledFormWrapper } from 'styles/formStyles.css'
import { useEditCampaign } from '../useEditCampaign'
import CampaignForm from './CampaignForm'
import { t } from 'i18next'

const EditCampaignForm = ({ campaignId }: { campaignId?: string }) => {
  const { isLoading, formik } = useEditCampaign({ incomingCampaignId: campaignId })

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('edit-campaign')}`}</StyledSectionTitle>
          </div>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <CampaignForm formik={formik} />
        </StyledFormWrapper>

        <StyledButtonWrapper>
          <ButtonPrimary
            onClick={formik?.handleSubmit}
            disabled={isLoading}
            size={Button.sizes?.MEDIUM}
          >
            {isLoading ? <Loader size={32} /> : 'Save'}
          </ButtonPrimary>
        </StyledButtonWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditCampaignForm
