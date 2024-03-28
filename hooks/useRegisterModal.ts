import { useState } from "react";

interface IRegisterModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = (): IRegisterModal => {
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

export default useRegisterModal;
