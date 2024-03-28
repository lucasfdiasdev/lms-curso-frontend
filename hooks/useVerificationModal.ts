import { useState } from "react";

interface IVerificationModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useVerificationModal = (): IVerificationModal => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
  };
};

export default useVerificationModal;
