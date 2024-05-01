import { useState } from 'react';
import { useOutsideClick } from './useOutsideClick';

export const useModal = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalRef = useOutsideClick(closeModal);

  return { isOpen, openModal, closeModal, modalRef };
};
