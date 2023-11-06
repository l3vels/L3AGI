import { Field } from 'formik'
import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import styled from 'styled-components'

type TextareaProps = {
  setFieldValue: any
  label: string
  value: string
  fieldName: string
}

const TextareaFormik = ({ setFieldValue, label, value, fieldName, ...props }: TextareaProps) => {
  const onTextareaChange = (field: string, value: string) => {
    setFieldValue(field, value)
  }

  return (
    <StyledTextareaWrapper>
      <TypographyPrimary value={label} type={Typography.types.LABEL} size={Typography.sizes.md} />
      <Textarea
        hint=''
        rows={6}
        value={value}
        onChange={(value: string) => onTextareaChange(fieldName, value)}
        maxLenght={10000}
        {...props}
      />
    </StyledTextareaWrapper>
  )
}

export default TextareaFormik

const StyledTextareaWrapper = styled.div`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    color: ${({ theme }) => theme.body.textColorPrimary};
    background: ${({ theme }) => theme.body.textAreaBgColor};
    &::placeholder {
      color: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
`
