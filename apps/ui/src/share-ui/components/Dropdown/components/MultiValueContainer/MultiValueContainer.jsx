/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useState } from "react";
import { components } from "react-select";
import cx from "classnames";
import { useHiddenOptionsData } from "../../hooks/useHiddenOptionsData";
import Counter from "../../../Counter/Counter";
import Dialog from "../../../Dialog/Dialog";
import DialogContentContainer from "../../../DialogContentContainer/DialogContentContainer";
import Tags from "../../../Tags/Tags";
import { DROPDOWN_TAG_COLORS } from "../../dropdown-constants";
import classes from "./MultiValueContainer.module.scss";

export default function Container({ children, selectProps, ...otherProps }) {
  const {
    isDisabled,
    placeholder,
    inputValue,
    selectProps: customProps = {},
    withMandatoryDefaultOptions
  } = selectProps;
  const { selectedOptions, onSelectedDelete, setIsDialogShown, isDialogShown, isMultiline } = customProps;
  const clickHandler = children[1];
  const [ref, setRef] = useState();
  const showPlaceholder = selectedOptions.length === 0 && !inputValue;
  const tagWrapperClassName = classes["tag-with-input-wrapper"];
  const tagClassName = cx(
    isMultiline ? classes["multiselect-tag-multi-line"] : classes["multiselect-tag-single-line"],
    { [classes["multiselect-tag-disabled"]]: isDisabled }
  );

  const { overflowIndex, hiddenOptionsCount } = useHiddenOptionsData({
    isMultiline,
    ref,
    tagClassName,
    tagWrapperClassName,
    selectedOptionsCount: selectedOptions.length
  });
  const isCounterShown = hiddenOptionsCount > 0;
  const renderOptions = useCallback(
    (from = 0, to = selectedOptions.length) =>
      selectedOptions.map((option, index) => {
        const overrideTagColor = Object.keys(DROPDOWN_TAG_COLORS).includes(option.tagColor)
          ? option.tagColor
          : DROPDOWN_TAG_COLORS.white;
        return index >= from && index < to ? (
          <Tags
            dataTestId="value-container-tag"
            key={option.value}
            className={tagClassName}
            isClickable
            noAnimation
            disabled={isDisabled}
            outlined={option.outlined}
            id={option.value}
            label={option.label}
            onDelete={onSelectedDelete}
            onMouseDown={e => {
              e.stopPropagation();
            }}
            readOnly={withMandatoryDefaultOptions && option.isMandatory}
            leftAvatar={option.leftAvatar}
            leftIcon={option.leftIcon}
            color={overrideTagColor}
          />
        ) : null;
      }),
    [selectedOptions, tagClassName, isDisabled, onSelectedDelete, withMandatoryDefaultOptions]
  );

  return (
    <components.ValueContainer selectProps={selectProps} {...otherProps}>
      <div className={classes["value-container"]}>
        {showPlaceholder && (
          <div className={classes["placeholder-container"]}>
            <components.Placeholder {...otherProps}>{placeholder}</components.Placeholder>
          </div>
        )}
        <div
          className={cx(classes["value-container-tags"], { [classes["without-placeholder"]]: !showPlaceholder })}
          ref={newRef => setRef(newRef)}
          data-testid="value-container-tags"
        >
          {isCounterShown ? (
            <>
              {renderOptions(0, overflowIndex - 1)}
              <div className={tagWrapperClassName}>
                {renderOptions(overflowIndex - 1, overflowIndex)}
                {clickHandler}
              </div>
              {renderOptions(overflowIndex)}
            </>
          ) : (
            <>
              {renderOptions(0, selectedOptions.length - 1)}
              <div className={tagWrapperClassName}>
                {renderOptions(selectedOptions.length - 1)}
                {clickHandler}
              </div>
            </>
          )}
        </div>
        <div>
          {isCounterShown && (
            <Dialog
              content={() => (
                <DialogContentContainer className={classes["value-container-dialog-content"]}>
                  {renderOptions(overflowIndex)}
                </DialogContentContainer>
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
                prefix="+"
                count={hiddenOptionsCount}
                onMouseDown={e => {
                  e.stopPropagation();
                }}
                noAnimation
              />
            </Dialog>
          )}
        </div>
      </div>
    </components.ValueContainer>
  );
}
