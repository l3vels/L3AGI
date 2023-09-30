import { useEffect, useRef, useState } from 'react'
import Heading from '@l3-lib/ui-core/dist/Heading'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import FormikTextField from 'components/TextFieldFormik'
import info from '../../../assets/images/info.png'
import TextareaFormik from 'components/TextareaFormik'
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
          value='Name'
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
      </StyledNameTextWrapper>
      <FormikTextField field_name='name' type={Typography.types.LABEL} size={Typography.sizes.md} />
      <StyledTextFieldDate>
        <StyledExpirationTextWrapper>
          <TypographySecondary
            value='Expiration'
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
        </StyledExpirationTextWrapper>
        <FormikTextField type='date' field_name='expiration' />
      </StyledTextFieldDate>

      <StyledTextWrapper>
        <TypographySecondary
          value='Choose games'
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
          value='Note'
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
      </StyledTextWrapper>
      <StyledTextAreaWrapper>
        <TextareaFormik
          color='#FFFFFF'
          field_name='note'
          placeholder='An optional description of what this webhook endpoint is used for.'
        />
      </StyledTextAreaWrapper>
    </StyledCreateModalForm>
  )
}
export default CreateApiKeysForm

export const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: flex-end;
  gap: 42px;
`

export const StyledCreateModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledTextFieldDate = styled.div`
  width: 199px;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-top: 24px;
  margin-bottom: 10px;
`
export const StyledImgWrapper = styled.div`
  margin-top: -20px;
  margin-left: 130px;
`

export const StyledNameTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-bottom: 10px;
`
export const StyledExpirationTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-bottom: 10px;
`

export const StyledTextAreaWrapper = styled.div`
  height: 130px;
`
export const StyledModalHeading = styled(Heading)`
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 500 !important;
`

export const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
const StyledNewCategory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
