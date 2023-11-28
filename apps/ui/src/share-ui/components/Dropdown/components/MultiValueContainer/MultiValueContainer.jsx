/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useState } from 'react'
import { components } from 'react-select'
import cx from 'classnames'
import { useHiddenOptionsData } from '../../hooks/useHiddenOptionsData'
import Counter from '../../../Counter/Counter'
import Dialog from '../../../Dialog/Dialog'
import DialogContentContainer from '../../../DialogContentContainer/DialogContentContainer'
import Tags from '../../../Tags/Tags'
import { DROPDOWN_TAG_COLORS } from '../../dropdown-constants'
import styled from 'styled-components'

export default function Container({ children, selectProps, ...otherProps }) {
  const {
    isDisabled,
    placeholder,
    inputValue,
    selectProps: customProps = {},
    withMandatoryDefaultOptions,
  } = selectProps
  const { selectedOptions, onSelectedDelete, setIsDialogShown, isDialogShown, isMultiline } =
    customProps
  const clickHandler = children[1]
  const [ref, setRef] = useState()
  const showPlaceholder = selectedOptions.length === 0 && !inputValue

  const { overflowIndex, hiddenOptionsCount } = useHiddenOptionsData({
    isMultiline,
    ref,

    selectedOptionsCount: selectedOptions.length,
  })
  const isCounterShown = hiddenOptionsCount > 0
  const renderOptions = useCallback(
    (from = 0, to = selectedOptions.length) =>
      selectedOptions.map((option, index) => {
        const overrideTagColor = Object.keys(DROPDOWN_TAG_COLORS).includes(option.tagColor)
          ? option.tagColor
          : DROPDOWN_TAG_COLORS.white
        return index >= from && index < to ? (
          <Tags
            dataTestId='value-container-tag'
            key={option.value}
            isClickable
            noAnimation
            disabled={isDisabled}
            outlined={option.outlined}
            id={option.value}
            label={option.label}
            onDelete={onSelectedDelete}
            onMouseDown={e => {
              e.stopPropagation()
            }}
            readOnly={withMandatoryDefaultOptions && option.isMandatory}
            leftAvatar={option.leftAvatar}
            leftIcon={option.leftIcon}
            color={overrideTagColor}
          />
        ) : null
      }),
    [selectedOptions, isDisabled, onSelectedDelete, withMandatoryDefaultOptions],
  )

  return (
    <components.ValueContainer selectProps={selectProps} {...otherProps}>
      <StyledValueContainer>
        {showPlaceholder && (
          <div>
            <components.Placeholder {...otherProps}>{placeholder}</components.Placeholder>
          </div>
        )}
        <div ref={newRef => setRef(newRef)} data-testid='value-container-tags'>
          {isCounterShown ? (
            <StyledValues>
              {renderOptions(0, overflowIndex - 1)}
              <div>
                {renderOptions(overflowIndex - 1, overflowIndex)}
                {clickHandler}
              </div>
              {renderOptions(overflowIndex)}
            </StyledValues>
          ) : (
            <StyledValues>
              <>{renderOptions(0, selectedOptions.length - 1)}</>
              <>
                {renderOptions(selectedOptions.length - 1)}
                {clickHandler}
              </>
            </StyledValues>
          )}
        </div>
        <div>
          {isCounterShown && (
            <Dialog
              content={() => (
                <DialogContentContainer>{renderOptions(overflowIndex)}</DialogContentContainer>
              )}
              tooltip
              showTrigger={Dialog.hideShowTriggers.CLICK}
              hideTrigger={Dialog.hideShowTriggers.CLICK_OUTSIDE}
              open={isDialogShown}
              onClick={() => setIsDialogShown(true)}
              onClickOutside={() => setIsDialogShown(false)}
            >
              <Counter
                kind={Counter.kinds.LINE}
                prefix='+'
                count={hiddenOptionsCount}
                onMouseDown={e => {
                  e.stopPropagation()
                }}
                noAnimation
              />
            </Dialog>
          )}
        </div>
      </StyledValueContainer>
    </components.ValueContainer>
  )
}

const StyledValueContainer = styled.div`
  display: flex;
  /* min-height: 30px; */
  align-items: center;
`
const StyledValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  overflow: hidden;
  gap: 5px;

  height: fit-content;
  padding: 5px 0px;
`
