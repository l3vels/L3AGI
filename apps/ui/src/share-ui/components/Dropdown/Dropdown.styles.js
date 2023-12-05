/* eslint-disable no-param-reassign */
import { SIZES } from '../../constants/sizes'
import { DROPDOWN_KINDS } from './dropdown-constants'
import { getCSSVar } from '../../services/themes'

const borderRadius = '6'

const getKind = kind => {
  switch (kind) {
    case DROPDOWN_KINDS.PRIMARY:
      return 'primary'
    case DROPDOWN_KINDS.SECONDARY:
      return 'secondary'
    case DROPDOWN_KINDS.TERTIARY:
      return 'tertiary'
    default:
      break
  }
}

const getKindColors = kind => {
  const whiteColor = '#FFFFFF'
  const primaryBgColor = 'rgba(0, 0, 0, 0.7)'
  const primaryBgColorHover = 'rgba(255, 255, 255, 0.1)'
  const primaryBgColorActive = 'rgba(255, 255, 255, 0.3)'

  const primaryBgColorDisabled = 'rgba(255, 255, 255, 0.2)'

  const secondaryBgColor = 'rgba(0, 0, 0, 0.2)'
  const secondaryBgColorHover = 'rgba(0, 0, 0, 0.1)'
  const secondaryBgColorActive = 'rgba(0, 0, 0, 0.3)'

  const tertiaryBgColor = 'transparent'
  const tertiaryBgColorHover = primaryBgColorHover
  const tertiaryBgColorActive = primaryBgColorDisabled

  const kindType = getKind(kind)
  switch (kindType) {
    case 'primary':
      return {
        inputColor: primaryBgColorDisabled,
        backgroundColor: primaryBgColor,
        bgHoverColor: primaryBgColorHover,
        bgActiveColor: primaryBgColorActive,
        bgDisabledColor: primaryBgColorDisabled,
        mainWhite: whiteColor,
      }
    case 'secondary':
      return {
        inputColor: secondaryBgColorActive,
        backgroundColor: secondaryBgColor,
        bgHoverColor: secondaryBgColorHover,
        bgActiveColor: secondaryBgColorActive,
        bgDisabledColor: primaryBgColorDisabled,
        mainWhite: whiteColor,
      }
    case 'tertiary':
      return {
        inputColor: primaryBgColorDisabled,
        backgroundColor: tertiaryBgColor,
        bgHoverColor: tertiaryBgColorHover,
        bgActiveColor: tertiaryBgColorActive,
        bgDisabledColor: primaryBgColorDisabled,
        mainWhite: whiteColor,
      }
    default:
      return {}
  }
}

const getSizeInPx = size => {
  switch (size) {
    case SIZES.LARGE:
      return 56
    case SIZES.MEDIUM:
      return 50
    case SIZES.SMALL:
    default:
      return 44
  }
}

const getSize = size => {
  const selectedSize = getSizeInPx(size)
  return { height: `${selectedSize}px` }
}

const getInnerSize = size => {
  const selectedSize = getSizeInPx(size) - 2
  return { height: `${selectedSize}px` }
}

const getIndicatorBoxSize = size => {
  const selectedSize = getSizeInPx(size) - 8
  return {
    height: `${selectedSize}px`,
    width: `${selectedSize}px`,
  }
}

// const getColor = () => {
//   const color = getCSSVar("primary-text-color");
//   const backgroundColor = getCSSVar("primary-background-color");
//   return { color, backgroundColor };
// };

const getFont = size => ({
  fontSize: getSingleValueTextSize(size),
  lineHeight: getSingleValueTextSize(size),
})

const disabledContainerStyle = isDisabled => {
  if (!isDisabled) return {}
  return {
    backgroundColor: getCSSVar('disabled-background-color'),
    color: getCSSVar('disabled-text-color'),
    borderColor: 'transparent',
    cursor: 'not-allowed',
    ':active, :focus, :hover': {
      borderColor: 'transparent',
      cursor: 'not-allowed',
    },
    ':active, :focus': {
      pointerEvents: 'none',
    },
  }
}

const getOptionStyle = (provided, { isDisabled, isSelected, isFocused }) => {
  delete provided[':active']
  delete provided.width
  const general = {
    display: 'flex',
    alignContent: 'center',
    // borderRadius: getCSSVar("border-radius-small"),
    // marginRight: "8px",
    // marginLeft: "8px",
    // paddingLeft: "8px",
    // paddingRight: "8px",

    transition: `all 0.1s ${getCSSVar('expand-animation-timing')}
    `,
    backgroundColor: 'transparent',
  }
  if (isDisabled) {
    return {
      ...provided,
      ...general,
      backgroundColor: 'transparent',
      color: getCSSVar('disabled-text-color'),
      cursor: 'not-allowed',
    }
  }
  if (isSelected) {
    return {
      ...provided,
      ...general,
      color: '#FFF',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
    }
  }
  return {
    ...provided,
    ...general,
    color: '#FFF',
    cursor: 'pointer',
    ...(isFocused && {
      ':hover': {
        color: '#FFF',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    }),
  }
}

const container =
  ({ size, kind }) =>
  (provided, { isDisabled }) => {
    delete provided.pointerEvents
    return {
      ...provided,
      ...getSize(size),
      minHeight: '30px',
      border: 'none',
      boxShadow: 'none',
      borderRadius: `${borderRadius}px`,
      boxSizing: 'border-box',
      transition: `border 0.1s ${getCSSVar('expand-animation-timing')}`,
      ':active, :focus-within': {
        borderColor: 'none',
        backgroundColor: getKindColors(kind).bgActiveColor,
      },
      ':hover': {
        borderColor: 'none',
        borderRadius: 'none',
      },
      ...disabledContainerStyle(isDisabled),
    }
  }

const control =
  ({ size, kind }) =>
  (provided, { isDisabled }) => ({
    ...provided,
    ...getInnerSize(size),
    minHeight: '30px',
    boxShadow: 'none',
    border: '0 solid transparent',
    borderRadius: getCSSVar('border-radius-small'),
    ...(!isDisabled && {
      ':hover': {
        borderColor: 'transparent',
        borderRadius: getCSSVar('border-radius-small'),
      },
      ':active, :focus': {
        backgroundColor: getKindColors(kind).bgActiveColor,
      },
    }),
    cursor: 'pointer',
    // backdropFilter: "blur(10px)",
    backgroundColor: getKindColors(kind).inputColor,
    ...disabledContainerStyle(isDisabled),
  })

const placeholder =
  ({ kind }) =>
  (provided, { isDisabled }) => ({
    ...provided,
    ...getFont(),
    color: isDisabled ? getCSSVar('disabled-text-color') : getKindColors(kind).mainWhite,
    fontWeight: getCSSVar('font-weight-normal'),
  })

const indicatorsContainer =
  ({ size }) =>
  (provided, { isDisabled }) => ({
    ...provided,
    ...getFont(),
    // ...getColor(),
    borderRadius: getCSSVar('border-radius-small'),
    ...disabledContainerStyle(isDisabled),
    ...getInnerSize(size),
  })

const dropdownIndicator =
  ({ size, kind }) =>
  (provided, { selectProps, isDisabled }) => {
    return {
      ...provided,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0px',
      ...getIndicatorBoxSize(size),
      margin: '4px 3px 4px 0px',
      // backgroundColor: "transparent",
      borderRadius: getCSSVar('border-radius-small'),
      svg: {
        transition: `transform 0.1s ${getCSSVar('expand-animation-timing')}`,
        transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      },
      color: isDisabled ? getCSSVar('disabled-text-color') : getKindColors(kind).mainWhite,
      ':hover, :active': {
        // backgroundColor: isDisabled ? undefined : getCSSVar("primary-background-hover-color"),
        color: isDisabled ? getCSSVar('icon-color') : getKindColors(kind).mainWhite,
      },
    }
  }

const clearIndicator =
  ({ size, kind }) =>
  () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: getKindColors(kind).mainWhite,
    backgroundColor: 'transparent',
    borderRadius: getCSSVar('border-radius-small'),
    ...getIndicatorBoxSize(size),
    ':hover': {
      color: getKindColors(kind).mainWhite,
    },
  })

const menuOpenOpacity = ({ menuIsOpen }) => {
  if (menuIsOpen) {
    return {
      // opacity: 0.6
    }
  }
}

const singleValue =
  () =>
  (provided, { isDisabled, selectProps }) => ({
    ...provided,
    ...getFont(),
    // ...getColor(),
    ...disabledContainerStyle(isDisabled),
    ...menuOpenOpacity(selectProps),
    display: 'flex',
    alignItems: 'center',
    color: !isDisabled && '#FFF',
    height: '100%',
  })

function getSingleValueTextSize(size) {
  switch (size) {
    case SIZES.LARGE:
      return '16px'
    case SIZES.MEDIUM:
      return '16px'
    case SIZES.SMALL:
    default:
      return '14px'
  }
}

const input = () => provided => ({
  ...provided,
  ...getFont(),
  // ...getColor(),
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  textIndent: '-2px',
})

// 12px - because we have inner 4px
const getCenterContentStyle = rtl => {
  return {
    display: 'flex',
    alignItems: 'center',
    [`padding${rtl ? 'Right' : 'Left'}`]: '12px',
  }
}

const valueContainer =
  ({ size, rtl }) =>
  (provided, { isDisabled }) => ({
    ...provided,
    ...getCenterContentStyle(rtl),
    ...getFont(),
    // ...getColor(),
    ...getInnerSize(size),
    ...disabledContainerStyle(isDisabled),
    borderRadius: getCSSVar('border-radius-small'),
  })

const menu =
  ({ controlRef, insideOverflowContainer, insideOverflowWithTransformContainer, kind }) =>
  provided => {
    const baseStyle = {
      ...provided,
      ...getFont(),
      color: getKindColors(kind).mainWhite,
      backgroundColor: getKindColors(kind).backgroundColor,
      boxShadow: getCSSVar('box-shadow-small'),
      // backdropFilter: "blur(10px)"
    }

    if (!insideOverflowContainer && !insideOverflowWithTransformContainer) return baseStyle
    const parentPositionData = controlRef?.current?.getBoundingClientRect()
    // If no location found do not add anything to hard coded style
    if (!parentPositionData) return baseStyle

    /** If the dropdown is inside a scroll in a regular container,position: fixed content (like our dropdown menu) will be attached to the start of the viewport.
     * For this case we will override the top menu position value to be the according the the drop down location for correct dispaly.
     * When the dropdown container (with overflow:hidden or overflow:scroll) using transform CSS function, we can use a relative positioned inner container, which our menu will be attach to it's
     * start when the menu position is fixed, and this is why in this case we define top:auto.
     */
    let top = insideOverflowWithTransformContainer ? 'auto' : parentPositionData.bottom

    return { ...baseStyle, top, width: parentPositionData.width }
  }

const option = () => (provided, state) => ({
  // ...getFont(),
  ...getOptionStyle(provided, state),
})

const indicatorSeparator = () => () => ({
  display: 'none',
})

const group = () => () => ({
  paddingBottom: 0,
  marginTop: '4px',
})

const groupHeading = () => () => ({
  height: '32px',
  fontSize: '14px',
  lineHeight: '22px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: getCSSVar('spacing-medium'),
  color: getCSSVar('secondary-text-color'),
})

export const getIndicatorSize = size => {
  switch (size) {
    case SIZES.LARGE:
      return '20px'
    case SIZES.MEDIUM:
      return '20px'
    case SIZES.SMALL:
    default:
      return '16px'
  }
}

export const customTheme = theme => ({
  ...theme,
  borderRadius: getCSSVar('border-radius-small'),
  colors: {
    ...theme.colors,
    primary25: getCSSVar('primary-background-hover-color'),
  },
})

export default data => ({
  container: container(data),
  control: control(data),
  placeholder: placeholder(data),
  indicatorsContainer: indicatorsContainer(data),
  dropdownIndicator: dropdownIndicator(data),
  clearIndicator: clearIndicator(data),
  singleValue: singleValue(data),
  input: input(data),
  valueContainer: valueContainer(data),
  menu: menu(data),
  option: option(data),
  indicatorSeparator: indicatorSeparator(data),
  group: group(data),
  groupHeading: groupHeading(data),
})
