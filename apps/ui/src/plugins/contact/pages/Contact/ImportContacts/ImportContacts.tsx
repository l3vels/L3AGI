import { FormikProvider } from 'formik'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import { ButtonPrimary } from 'components/Button/Button'
import BackButton from 'components/BackButton'

import ImportFile from 'components/ImportFile'
import { useImportContacts } from './useImportContacts'

import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { t } from 'i18next'
import { templateData } from '../contactsTemplate'
import importColumnConfig from './importColumnConfig'
import { StyledTableWrapper } from '../Contacts'

const ImportContacts = () => {
  const { formik, isLoading } = useImportContacts()

  const { setFieldValue } = formik

  const columns = importColumnConfig()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('import-contacts')}`}</StyledSectionTitle>
            {/* <StyledSectionDescription>{`${t('agent-description')}`}</StyledSectionDescription> */}
          </div>

          <StyledButtonWrapper>
            <BackButton />

            <ButtonPrimary
              onClick={formik?.handleSubmit}
              disabled={isLoading}
              size={Button.sizes?.SMALL}
            >
              {isLoading ? <Loader size={32} /> : t('save')}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledTableWrapper>
            <ImportFile
              setFieldValue={setFieldValue}
              templateData={templateData}
              columns={columns}
              fileValidationFields={['Name', 'Phone', 'Group', 'Email', 'Description']}
              fieldName={'file_url'}
            />
          </StyledTableWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default ImportContacts
