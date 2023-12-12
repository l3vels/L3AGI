import { forwardRef, useEffect, useRef } from 'react'

import useMergeRefs from '../../hooks/useMergeRefs'
import useDebounceEvent from '../../hooks/useDebounceEvent'

import { L3ComponentProps, L3Component } from '../../types'
import { NOOP } from '../../utils/function-utils'

import IconButton from '../IconButton/IconButton'
import CloseSmall from '../Icon/Icons/components/CloseSmall'
import styled from 'styled-components'

interface TextareaProps extends L3ComponentProps {
  placeholder?: string
  autoComplete?: string
  initialValue?: string
  value?: string
  onChange?: (value: string) => void
  onChangeCapture?: (event: unknown) => void
  onBlur?: (event: React.FocusEvent) => void
  onFocus?: (event: React.FocusEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  debounceRate?: number
  autoFocus?: boolean
  disabled?: boolean
  readonly?: boolean
  setRef?: (node: HTMLElement) => void
  /** Don't provide status for plain assistant text */
  validation?: { status?: 'error' | 'success' }
  maxLength?: number
  trim?: boolean
  required?: boolean
  name?: string
  cols?: number
  rows?: number
  maxLenght?: number
  minLenght?: number
  onInvalid?: (event: unknown) => void
  onInvalidCapture?: (event: unknown) => void
  onSelect?: (event: unknown) => void
  onSelectCapture?: (event: unknown) => void
  hint?: string
  resize?: boolean
  showLetterCount?: boolean
}

// eslint-disable-next-line react/display-name
const Textarea: L3Component<TextareaProps, unknown> = forwardRef(
  (
    {
      placeholder = '',
      autoComplete = 'off',
      initialValue,
      value,
      onChange,
      onBlur = NOOP,
      onFocus = NOOP,
      onKeyDown = NOOP,
      onChangeCapture,
      debounceRate = 0,
      autoFocus = false,
      disabled = false,
      readonly = false,
      setRef = NOOP,
      trim = false,
      id = 'textarea',
      required = false,
      name,
      cols,
      rows,
      maxLenght = 1200,
      minLenght,
      onInvalid,
      onInvalidCapture,
      onSelect,
      onSelectCapture,
      hint,
      validation = null,
      resize = true,
      showLetterCount,
    },
    ref,
  ) => {
    const inputRef = useRef(null as any)
    const {
      inputValue: textareaValue,
      onEventChanged,
      clearValue,
    } = useDebounceEvent({
      delay: debounceRate,
      onChange,
      initialStateValue: value,
      trim,
    })

    const mergedRef = useMergeRefs({ refs: [ref, inputRef, setRef] })
    useEffect(() => {
      if (inputRef.current && autoFocus) {
        const animationFrame = requestAnimationFrame(() => inputRef.current.focus())
        return () => cancelAnimationFrame(animationFrame)
      }
    }, [inputRef, autoFocus])

    return (
      <StyledTextareaWrapper>
        {disabled ? (
          <span>Disabled</span>
        ) : (
          showLetterCount && (
            <label htmlFor={id}>
              {textareaValue ? textareaValue.length : 0}/{maxLenght}
            </label>
          )
        )}

        <StyledTextareaInnerWrapper>
          <StyledTextarea
            ref={mergedRef}
            id={id}
            // className={styles.textarea}
            value={textareaValue}
            placeholder={placeholder}
            autoComplete={autoComplete}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            defaultValue={initialValue}
            cols={cols}
            rows={rows}
            disabled={disabled}
            maxLength={maxLenght}
            minLength={minLenght}
            name={name}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onChange={onEventChanged}
            onChangeCapture={onChangeCapture}
            onInvalid={onInvalid}
            onInvalidCapture={onInvalidCapture}
            onSelect={onSelect}
            onSelectCapture={onSelectCapture}
            readOnly={readonly}
            required={required}
          />
          {textareaValue && (
            <StyledClearIcon>
              <IconButton
                size={'xxs'}
                ariaLabel='Remove'
                hideTooltip
                icon={CloseSmall}
                onClick={clearValue}
                kind={IconButton.kinds?.SECONDARY}
              />
            </StyledClearIcon>
          )}
        </StyledTextareaInnerWrapper>
        {hint && <div>{hint}</div>}
      </StyledTextareaWrapper>
    )
  },
)

export default Textarea

const StyledTextareaWrapper = styled.div`
  padding: 5px 0;
`

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;

  padding: 10px 16px;
  padding-right: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  border: none;
  font-size: 14px;
  font-weight: 500;

  background: ${({ theme }) => theme.textFiled.primary.bgColor};
  color: ${({ theme }) => theme.textFiled.primary.color};
  outline: 4px solid ${({ theme }) => theme.textFiled.primary.borderColor};

  border-radius: 4px;

  &::placeholder {
    /* @include theme-prop(color, text-field-placeholder-color); */
  }
  &:active,
  &:focus {
    border: none;
    box-shadow: ${({ theme }) => theme.textFiled.primary.activeBoxShadow};
    outline: 4px solid ${({ theme }) => theme.textFiled.primary.activeBorderColor};
    background: ${({ theme }) => theme.textFiled.primary.activeBgColor};
  }
`

const StyledTextareaInnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const StyledClearIcon = styled.div`
  width: 0px;
  height: 0px;
  margin-left: -26px;
  margin-top: 10px;
`
