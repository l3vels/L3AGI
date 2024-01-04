import { FormikProvider } from 'formik'
import { useCreateCampaign } from '../useCreateCampaign'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { t } from 'i18next'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledFormWrapper } from 'styles/formStyles.css'
import CampaignForm from './CampaignForm'

const CreateCampaignForm = () => {
  const { formik, isLoading } = useCreateCampaign()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('add-campaign')}`}</StyledSectionTitle>
          </div>

          <StyledButtonWrapper>
            <BackButton />
            <ButtonPrimary
              onClick={formik?.handleSubmit}
              size={Button.sizes?.SMALL}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledFormWrapper>
            <CampaignForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateCampaignForm
