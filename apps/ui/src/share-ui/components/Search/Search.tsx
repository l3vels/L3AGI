import React, { forwardRef } from 'react'
import classNames from 'classnames'
import TextField from '../TextField/TextField'
import useMergeRefs from '../../hooks/useMergeRefs'
import { SearchDefaultIconNames, SearchType, SearchTypeClass } from './SearchConstants'
import { getTestId } from '../../tests/test-ids-utils'
import CloseIcon from '../Icon/Icons/components/CloseSmall'
import SearchIcon from '../Icon/Icons/components/Search'
import { NOOP } from '../../utils/function-utils'
import { SubIcon, L3ComponentProps, L3Component } from '../../types'
import { TextFieldTextType } from '../TextField/TextFieldConstants'
import { BASE_SIZES } from '../../constants'
import { ComponentDefaultTestId } from '../../tests/constants'

function getType(type: SearchType) {
  return SearchTypeClass[type] || ''
}

export interface SearchProps extends L3ComponentProps {
  secondaryIconName?: SubIcon
  iconName?: SubIcon
  onChange?: () => void
  autoFocus?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  debounceRate?: number
  onBlur?: (event: React.FocusEvent) => void
  onFocus?: (event: React.FocusEvent) => void
  wrapperClassName?: string
  setRef?: () => void
  autoComplete?: string
  /* BASE_SIZES is exposed on the component itself */
  size?: (typeof BASE_SIZES)[keyof typeof BASE_SIZES]
  /* TYPES is exposed on the component itself */
  type?: SearchType
  validation?:
    | {
        status: 'error' | 'success'
        text: string
      }
    | { text: string }
  inputAriaLabel?: string
  searchResultsContainerId?: string
  activeDescendant?: string
  /*  Icon names labels for a11y */
  iconNames?: {
    layout: string
    primary: string
    secondary: string
  }
  /** shows loading animation */
  loading?: boolean
  defaultIsOpen?: boolean
}

const Search: L3Component<SearchProps, unknown> & {
  sizes?: typeof BASE_SIZES
  types?: typeof SearchType
  // eslint-disable-next-line react/display-name
} = forwardRef<unknown, SearchProps>(
  (
    {
      secondaryIconName = CloseIcon,
      iconName = SearchIcon,
      onChange = NOOP,
      autoFocus = false,
      value = '',
      placeholder = '',
      disabled = false,
      debounceRate = 200,
      onBlur = NOOP,
      onFocus = NOOP,
      wrapperClassName = '',
      setRef = NOOP,
      autoComplete = 'off',
      size = 'large',
      type = SearchType.SQUARE,
      className,
      id = 'search',
      validation = null,
      inputAriaLabel,
      searchResultsContainerId = '',
      activeDescendant = '',
      iconNames = SearchDefaultIconNames,
      loading = false,
      defaultIsOpen = false,
    },
    ref,
  ) => {
    const mergedRef = useMergeRefs({ refs: [ref, setRef] })
    return (
      <TextField
        id={id}
        dataTestId={getTestId(ComponentDefaultTestId.SEARCH, id)}
        iconName={iconName}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        debounceRate={debounceRate}
        className={classNames(className, 'search_component', getType(type))}
        secondaryIconName={secondaryIconName}
        secondaryDataTestId={getTestId(ComponentDefaultTestId.CLEAN_SEARCH_BUTTON, id)}
        wrapperClassName={classNames(wrapperClassName, 'search_component_wrapper')}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={mergedRef}
        autoComplete={autoComplete}
        size={size}
        clearOnIconClick
        validation={validation}
        inputAriaLabel={inputAriaLabel}
        searchResultsContainerId={searchResultsContainerId}
        activeDescendant={activeDescendant}
        iconsNames={iconNames}
        type={TextFieldTextType.SEARCH}
        role='search'
        loading={loading}
        onIconClick={() => console.log('test')}
        defaultIsOpen={defaultIsOpen}
      />
    )
  },
)

Object.assign(Search, {
  sizes: BASE_SIZES,
  types: SearchType,
  defaultTestId: ComponentDefaultTestId.SEARCH,
})

export default Search
