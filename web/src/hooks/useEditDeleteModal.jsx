import { useState, useEffect } from 'react';
import { useOutsideClick } from './useOutsideClick';

const useEditDeleteModal = () => {
  const [isAction, setIsAction] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState(null);
  const [isToggled, setToggled] = useState(false);
  const [info, setInfo] = useState({});
  const [isCreate, setIsCreate] = useState(false); // New state for create modal

  const onOpenActions = (data) => {
    setId(data.id);
    setIsAction(true);
    data.isAction && setToggled(data.isActive);
    setInfo(data);
  };

  const onCloseActions = () => {
    setId(null);
    setIsAction(false);
  };

  const onOpenEditModal = () => {
    setIsAction(false);
    setIsEdit(true);
  };

  const onCloseEditModal = () => {
    setIsEdit(false);
    setInfo({});
    setId(null);
  };

  const onOpenDeleteModal = () => {
    setIsAction(false);
    setIsDelete(true);
  };

  const onCloseDeleteModal = () => {
    setIsDelete(false);
  };

  const onOpenCreateModal = () => {
    // Function to open create modal
    setIsCreate(true);
  };

  const onCloseCreateModal = () => {
    // Function to close create modal
    setIsCreate(false);
    setInfo({});
  };

  // Use the useOutsideClick hook to handle outside clicks
  const onModalRef = useOutsideClick(() => {
    onCloseActions();
    onCloseEditModal();
    onCloseDeleteModal();
    onCloseCreateModal(); // Close create modal on outside click
  });

  const onInfoSet = (data) => {
    // Only update the state if the data has changed
    if (JSON.stringify(data) !== JSON.stringify(info)) {
      setInfo(data);
    }
  };

  const onToggle = (value) => {
    setToggled(value);
  };

  const onId = () => {
    setId(null);
  };

  // Cleanup function to reset state on unmount or dependency change
  useEffect(() => {
    return () => {
      setIsAction(false);
      setIsEdit(false);
      setIsDelete(false);
      setId(null);
      setToggled(false);
      setInfo({});
      setIsCreate(false); // Reset create modal state
    };
  }, []);

  return {
    isAction,
    isEdit,
    isDelete,
    id,
    isToggled,
    info,
    isCreate,
    onId,
    onOpenActions,
    onOpenEditModal,
    onOpenDeleteModal,
    onOpenCreateModal,
    onToggle,
    onModalRef,
    onInfoSet,
    onCloseEditModal,
    onCloseDeleteModal,
    onCloseActions,
    onCloseCreateModal,
  };
};

export default useEditDeleteModal;
