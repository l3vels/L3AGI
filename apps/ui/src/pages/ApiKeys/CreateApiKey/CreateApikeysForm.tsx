<<<<<<< HEAD
import React from 'react'
import { FormikProvider } from 'formik'
import BackButton from 'components/BackButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import ApiKeysForm from './ApiKeysForm'
import { useCreateApiKey } from './useCreateApiKey'
import { StyledFormWrapper } from 'styles/formStyles.css'

function CreateApiKeyForm() {
  const { formik, isLoading } = useCreateApiKey()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Add API Key</StyledSectionTitle>
              <StyledSectionDescription>Here is your API Key.</StyledSectionDescription>
            </div>

            <StyledButtonWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={formik?.handleSubmit}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              {/* Pass the apiKeys data to ApiKeysForm component */}
              <ApiKeysForm formik={formik} />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
=======
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import FormikTextField from 'components/TextFieldFormik'
import info from '../../../assets/images/info.png'
// import TextareaFormik from 'components/TextareaFormik'
import useCreateApiKey from './useCreateApiKey'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

type CreateApiKeysFormProps = {
  closeModal: () => void
  formik: any
}

type OptionRendererProps = {
  label: string
  text?: string
  onDelete: (option: { label: string; value: string }) => void
}

const CreateApiKeysForm = ({ closeModal, formik }: CreateApiKeysFormProps) => {
  const { t } = useTranslation()
  const { setFieldValue } = formik
  const [dropdownValue, setDropdownValue] = useState<any>()

  const onDropdownChange = (event: any) => {
    if (event === null) {
      setDropdownValue([])
      // console.log('setDropdownValue([])', setDropdownValue([]))
      setFieldValue('games', [])
      // console.log("setFieldValue('games', [])", setFieldValue('games', []))
    } else {
      setDropdownValue(event)
      const values = event?.map((option: any) => option.value)
      // console.log('values', values)
      setFieldValue('games', values)
    }
  }

  const onOptionRemove = (item: any) => {
    // console.error('onOptionRemove called with item', item)
    const newValues = dropdownValue?.filter(
      (option: any) => option.label !== item.label && option.value !== item.value,
    )
    setDropdownValue(newValues)
    // console.log('newValues', newValues)
    const filteredNewValues = newValues?.map((option: any) => option.value)
    setFieldValue('games', filteredNewValues || [])
    // console.log('filteredNewValues', filteredNewValues)
  }

  const OptionRenderer = ({ label, text, onDelete }: OptionRendererProps) => {
    const handleDelete = () => {
      onDelete({ label, value: label })
    }

    return (
      <StyledNewCategory>
        {text && (
          <TypographyPrimary
            value={text}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
        )}
        <Tags
          key={label}
          label={label}
          readOnly
          outlined={true}
          color={Tags.colors.white}
          onDelete={handleDelete}
        />
      </StyledNewCategory>
    )
  }

  return (
    <StyledCreateModalForm>
      <StyledNameTextWrapper>
        <TypographySecondary
          value={t('name')}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
      </StyledNameTextWrapper>
      <FormikTextField field_name='name' type={Typography.types.LABEL} size={Typography.sizes.md} />
      <StyledTextFieldDate>
        <StyledExpirationTextWrapper>
          <TypographySecondary
            value={t('expiration')}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
        </StyledExpirationTextWrapper>
        <FormikTextField type='date' field_name='expiration' />
      </StyledTextFieldDate>

      <StyledTextWrapper>
        <TypographySecondary
          value={t('choose-games')}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
        <StyledImgWrapper>
          <img src={info} alt='info' />
        </StyledImgWrapper>
      </StyledTextWrapper>
      {/* <Dropdown placeholder='Select' options={gamesOptions || []} multi multiLine /> */}

      <StyledTextWrapper>
        <TypographySecondary
          value={t('note')}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
      </StyledTextWrapper>
      {/* <StyledTextAreaWrapper>
        <TextareaFormik
          color='#FFFFFF'
          field_name='note'
          placeholder={t('api-key-placeholder-description')}
        />
      </StyledTextAreaWrapper> */}
    </StyledCreateModalForm>
>>>>>>> origin
  )
}

export default CreateApiKeyForm
