import WarningCheckIcon from '../Icon/Icons/components/SpecialWarning'
import PositiveCheckIcon from '../Icon/Icons/components/SpeacialCheck'
import NegativeCheck from '../Icon/Icons/components/SpecialWarningInfo'
import { Done, Info, Warning } from '../Icon/Icons'

export enum ToastType {
  WARNING = 'warning',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NORMAL = 'normal',
  WARNING_LOW_INFORMATIONAL = 'warning-low-informational',
  POSITIVE_LOW_INFORMATIONAL = 'positive-low-informational',
  NEGATIVE_LOW_INFORMATIONAL = 'negative-low-informational',
}

export enum ToastActionType {
  LINK = 'link',
  BUTTON = 'Button',
}

export const defaultIconMap = {
  [ToastType.WARNING]: WarningCheckIcon,
  [ToastType.POSITIVE]: PositiveCheckIcon,
  [ToastType.NORMAL]: PositiveCheckIcon,
  [ToastType.NEGATIVE]: NegativeCheck,
  [ToastType.WARNING_LOW_INFORMATIONAL]: Warning,
  [ToastType.POSITIVE_LOW_INFORMATIONAL]: Done,
  [ToastType.NEGATIVE_LOW_INFORMATIONAL]: Info,
}

export type ToastAction = {
  type: ToastActionType
  content?: string
  text?: string
  href?: string
}

export enum ToastIconSize {
  SMALL = '14.67px',
  MEDIUM = '19.67px',
  LARGE = '37.78px',
}

export enum ToastArtWorkType {
  IMG = 'img',
  ICON = 'icon',
}
export enum ToastArtWorkSize {
  SMALL = '24px',
  LARGE = '48px',
}

export enum ToastCloseButtonColor {
  WHITE = 'white',
  GRAY = 'gray',
}

export enum ToastPosition {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}
