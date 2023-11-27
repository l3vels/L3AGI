import React, { FC } from 'react'
import cx from 'classnames'
import IconButton from '../../components/IconButton/IconButton'
import Close from '../../components/Icon/Icons/components/Close'
import Icon, { IconSubComponentProps } from '../../components/Icon/Icon'
import L3ComponentProps from '../../types/L3ComponentProps'
import { NOOP } from '../../utils/function-utils'

export interface ModalHeaderProps extends L3ComponentProps {
  /**
   * Title of the modal
   */
  title: string
  /**
   * Description of the modal
   */
  description?: string
  /**
   * Icon to be rendered before the title
   */
  icon?: string | React.FunctionComponent<IconSubComponentProps> | null
  /**
   * Class name for the wrapper
   */
  className?: string
  /**
   * Class name for the title
   */
  titleClassName?: string
  /**
   * closes the Modal. No need to provide it, it is being provided by the modal
   */
  closeModal?: () => void
  /**  /**
   * ID for the title, needed for accessibility. No need to provide it, it is being provided by the modal
   */
  id?: string
  /**
   * Class name for the description
   */
  descriptionClassName?: string
  /**
   * Size of the icon
   */
  iconSize?: number
  /**
   * class name for the icon
   */
  iconClassName?: string
  /**
   * Aria label for the close button
   */
  closeButtonAriaLabel?: string
  /**
   * Should close button be hidden or not
   */
  hideCloseButton?: boolean
}

const ModalHeader: FC<ModalHeaderProps> = ({
  className,
  title,
  titleClassName,
  description = '',
  descriptionClassName,
  icon,
  closeModal = NOOP,
  iconSize = 24,
  iconClassName,
  hideCloseButton,
  closeButtonAriaLabel,
  id,
}) => {
  return (
    <div>
      <p role='heading' aria-level={1} id={id}>
        {icon && (
          <span>
            <Icon
              icon={icon}
              iconType={Icon.type?.SVG}
              iconSize={iconSize}
              ignoreFocusStyle
              clickable={false}
            />
          </span>
        )}
        {title}
      </p>

      {description && <div>{description}</div>}

      {!hideCloseButton && (
        <div>
          <IconButton
            key='xxs'
            onClick={closeModal}
            ariaLabel={closeButtonAriaLabel}
            icon={Close}
            kind={IconButton.kinds?.TERTIARY}
            size={IconButton.sizes?.SMALL}
          />
        </div>
      )}
    </div>
  )
}

Object.assign(ModalHeader, {
  displayName: 'ModalHeader',
})

export default ModalHeader
