import { useState } from "react";

interface ILoginModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = (): ILoginModal => {
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

export default useLoginModal;
