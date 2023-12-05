import { Button, Flex } from "../../../components";
import React, { useRef, useState } from "react";

// internal custom hook to help with writing tests and stories.
export const useModalHelper = ({ openButtonTitle = "Open", openOnStart = false, ...props } = {}) => {
  const [show, setShow] = useState(openOnStart);
  const buttonRef = useRef(null);
  const closeModal = () => setShow(false);

  const openModalButton = (
    <Button onClick={() => setShow(true)} ref={buttonRef}>
      {openButtonTitle}
    </Button>
  );

  const modalButtons = <ModalButtons closeModal={closeModal} />;

  const modalProps = {
    ...props,
    show,
    onClose: closeModal,
    triggerElement: buttonRef.current
  };

  return { modalProps, openModalButton, modalButtons, show, closeModal, ref: buttonRef };
};

export const ModalButtons = ({ closeModal }) => {
  return (
    <div>
      <Flex justify={Flex.justify.END} gap={15}>
        <Button onClick={closeModal} size={Button.sizes.LARGE} kind={Button.kinds.TERTIARY}>
          Cancel
        </Button>
        <Button onClick={closeModal}>Confirm</Button>
      </Flex>
    </div>
  );
};
