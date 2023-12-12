import { Field } from 'formik'
import Textarea from 'share-ui/components/Textarea/Textarea'
import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import styled, { css } from 'styled-components'
import { useEffect, useRef, useState } from 'react'

type TextareaProps = {
  setFieldValue: any
  label: string
  value: string
  fieldName: string
  triggerResize?: number
  minHeight?: number
}

const TextareaFormik = ({
  setFieldValue,
  label,
  value,
  fieldName,
  triggerResize,
  minHeight,
  ...props
}: TextareaProps) => {
  const textareaRef = useRef(null as any)

  const onTextareaChange = (field: string, value: string) => {
    setFieldValue(field, value)
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // console.log('SHOULD RESIZE')
      // textarea.style.height = 'auto' // Reset the height to auto to recalculate the height
      // textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scroll height of the content
      setTimeout(function () {
        textarea.style.height = 'auto' // Reset the height to auto to recalculate the height
        textarea.style.height = `${textarea.scrollHeight}px`
      }, 100)
    }
  }, [value, triggerResize])

  return (
    <StyledTextareaWrapper minHeight={minHeight}>
      <TypographyPrimary value={label} type={Typography.types.LABEL} size={Typography.sizes.md} />
      <Textarea
        ref={textareaRef}
        hint=''
        value={value}
        onChange={(value: string) => {
          onTextareaChange(fieldName, value)
        }}
        maxLenght={10000}
        {...props}
      />
    </StyledTextareaWrapper>
  )
}

export default TextareaFormik

const StyledTextareaWrapper = styled.div<{ minHeight?: number }>`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

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
  textarea {
    min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : '200px')};
    max-height: calc(100vh - 400px);
  }
`
