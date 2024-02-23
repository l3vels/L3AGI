import React, { cloneElement, FC, ReactElement, useMemo } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { useA11yDialog } from './a11yDialog'
import ModalContent from '../ModalContent/ModalContent'
import ModalHeader from '../ModalHeader/ModalHeader'
import useBodyScrollLock from './useBodyScrollLock'
import useShowHideModal from './useShowHideModal'
import L3ComponentProps from '../../types/L3ComponentProps'
import {
  isModalContent,
  isModalFooter,
  isModalHeader,
  ModalBackgroundColor,
  validateTitleProp,
} from './ModalHelper'
import { NOOP } from '../../utils/function-utils'
import styled, { css } from 'styled-components'
// import styles from "./Modal.module.scss";

interface ModalProps extends L3ComponentProps {
  /**
   * Id of the modal, used internally and for accessibility
   */
  id?: string
  /**
   * Show/hide the Dialog
   */
  show: boolean
  /**
   * Title for the modal, mandatory when ModalHeader isn't provided in children
   */
  title?: string
  /**
   * Description for the modal title
   */
  description?: string
  /**
   * Called when the modal is closed (by close button/click outside/esc key)
   */
  onClose: () => void
  /**
   *  Makes the dialog behave like a modal (preventing closing on click outside of
   *  ESC key)..
   */
  alertDialog?: boolean
  /**
   *  Used for the fromOrigin animation
   */
  triggerElement?: Element
  /**
   *  Hide the modal close button
   */
  hideCloseButton?: boolean
  /**
   *  Aria label for the close button
   */
  closeButtonAriaLabel?: string
  /**
   *  classNames for specific parts of the dialog
   */
  classNames?: {
    container: string
    overlay: string
    modal: string
    header: string
  }
  /**
   *  Dialog content
   */
  children?: ReactElement | ReactElement[]
  backgroundColor?: 'light' | 'dark'
  modalWidth?: string
  modalHeight?: string
  className?: string

  fullscreen?: boolean
  isClean?: boolean
  isTransparent?: boolean
  zIndex?: number
  noOverlay?: boolean
}

const Modal: FC<ModalProps> & {
  backgroundColor?: 'light' | 'dark'
  modalWidth?: string
  modalHeight?: string
} = ({
  classNames = { container: '', overlay: '', modal: '', header: '' },
  id,
  show,
  title = '',
  description = '',
  onClose = NOOP,
  alertDialog = false,
  children,
  triggerElement,
  backgroundColor = 'light',
  hideCloseButton = false,
  closeButtonAriaLabel = 'close',
  modalWidth,
  modalHeight,
  className,
  fullscreen = false,
  isClean,
  isTransparent = false,
  zIndex = 10000,
  noOverlay = false,
}) => {
  const childrenArray: ReactElement[] = useMemo(
    () => (children ? (React.Children.toArray(children) as ReactElement[]) : []),
    [children],
  )
  validateTitleProp(title, childrenArray)

  const [instance, attr] = useA11yDialog({
    id,
    alertDialog,
  })

  // lock body scroll when modal is open
  useBodyScrollLock({ instance })

  // show/hide and animate the modal
  const { closeDialogIfNeeded } = useShowHideModal({
    instance,
    show,
    triggerElement,
    onClose,
    alertDialog,
  })

  const header = useMemo(() => {
    const { id } = attr.title
    const header = childrenArray.find(isModalHeader)
    if (header) {
      return cloneElement(header, { id, closeModal: onClose })
    }

    return (
      <ModalHeader
        title={title}
        description={description}
        closeModal={onClose}
        id={id}
        hideCloseButton={hideCloseButton}
        closeButtonAriaLabel={closeButtonAriaLabel}
      />
    )
  }, [
    attr.title,
    childrenArray,
    title,
    description,
    onClose,
    hideCloseButton,
    closeButtonAriaLabel,
  ])

  const content = useMemo(() => {
    return (
      childrenArray.find(isModalContent) || (
        <ModalContent>
          {childrenArray.filter(child => !isModalHeader(child) && !isModalFooter(child))}
        </ModalContent>
      )
    )
  }, [childrenArray])

  const footer = useMemo(() => {
    return childrenArray.find(isModalFooter) || null
  }, [childrenArray])

  const dialog = ReactDOM.createPortal(
    <StyledModalContainer
      {...attr.container}
      data-testid='l3-dialog-container'
      style={{ zIndex: zIndex }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}

      <StyledOverlay
        noOverlay={noOverlay}
        onClick={closeDialogIfNeeded}
        data-testid='l3-modal-overlay'
      />

      <StyledDialog
        backgroundColor={backgroundColor}
        fullscreen={fullscreen}
        isTransparent={isTransparent}
      >
        {!isClean && header}
        <StyledContainer className={className}>{content}</StyledContainer>
        {!isClean && footer}
      </StyledDialog>
    </StyledModalContainer>,
    document.body,
  )

  return ReactDOM.createPortal(dialog, document.body)
}

Object.assign(Modal, {
  backgroundColor: ModalBackgroundColor,
})

export default Modal

const StyledModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`
const StyledOverlay = styled.div<{ noOverlay: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: overlay-fade-in 70ms var(--motion-timing-enter);

  @keyframes overlay-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes overlay-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  ${props =>
    props.noOverlay &&
    css`
      /* background: transparent; */
      backdrop-filter: unset;
    `}
`

const StyledContainer = styled.div`
  /* padding: 16px; */
`

const StyledDialog = styled.div<{
  backgroundColor: string
  fullscreen: boolean
  isTransparent: boolean
}>`
  z-index: 2;
  display: flex;
  position: relative;
  flex-direction: column;

  /* padding: 2px; */
  overflow: auto;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(50px);

  border-radius: 14px;

  ${props =>
    props.backgroundColor === 'dark' &&
    css`
      background-color: rgba(0, 0, 0, 0.3);
    `}
  ${props =>
    props.backgroundColor === 'light' &&
    css`
      background-color: rgba(255, 255, 255, 0.4);
    `}

  ${props =>
    props.fullscreen &&
    css`
      padding: 0px;
      border-radius: 0px;
    `}

  ${props =>
    props.isTransparent &&
    css`
      background: transparent;
      backdrop-filter: unset;
      box-shadow: unset;
      border: unset;
    `}
`
