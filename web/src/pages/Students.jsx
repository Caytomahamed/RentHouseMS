import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getUsers,
  selectFilteredAndSortedUsers,
  selectUsers,
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setItemsPerPage,
  setSearchQuery,
  setSortKey,
  setSortOrder,
  updateUser,
} from '../store/slices/userSlice';

import useEditDeleteModal from '../hooks/useEditDeleteModal';

import TableWrapper from '../components/Tables/TableWrapper';
import { groupBy } from '../utils/groupBy';
import studentsTableData from './../../config/studentsTableData.json';
import { toast } from 'react-toastify';

function Users() {
  const {
    isAction,
    isEdit,
    isDelete,
    id,
    isToggled,
    info,
    onId,
    onOpenActions,
    onOpenEditModal,
    onOpenDeleteModal,
    onToggle,
    onModalRef,
    onInfoSet,
    onCloseEditModal,
    onCloseDeleteModal,
    // onCloseActions,
  } = useEditDeleteModal();

  // State object to hold users information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        yearOfStudy: '',
        faculty: '',
        imageUrl: '',
        isAction: false,
      });
    }
  }, [info, onInfoSet]);

  // get user call
  const dispatch = useDispatch();
  const {
    deleteLoad,
    updateLoad,
    isLoading,
    list,
    sortOrder,
    itemsPerPage,
    filter,
    searchQuery,
    sortKey,
    currentPage,
  } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [deleteLoad, updateLoad, dispatch]);

  // select users into store
  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedUsers
  );

  const handleUpdate = () => {
    let role;
    const { imageUrl: file } = info;

    const user = { ...info };

    delete user.imageUrl;

    onInfoSet({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      yearOfStudy: '',
      faculty: '',
      imageUrl: '',
    });

    if (user.userType === 'admin') role = 1;
    if (user.userType === 'landlord') role = 2;
    if (user.userType === 'tenants') role = 3;

    if (!user.userType) role = 3;

    delete user.userType;


    dispatch(updateUser({ ...user, roleId: role, isActive: isToggled }, file));
    onCloseEditModal();
    toast.success('User updated successfully');
  };

  const handleDelete = () => {
    dispatch(deleteUser(+id));
    onId(null);
    onCloseDeleteModal();
    toast.error('user deleted successfully');
  };

  // sort by group ddata
  const groupByAddress = groupBy(paginatedList, 'address');
  const groupByYear = groupBy(paginatedList, 'city');

  const store = {
    dispatch,
    setSearchQuery,
    setCurrentPage,
    setFilterColumn,
    setFilter,
    setSortOrder,
    setSortKey,
    sortOrder,
    list,
    startIndex,
    endIndex,
    totalPages,
    setItemsPerPage,
    itemsPerPage,
    currentPage,
    searchQuery,
    filter,
    sortKey,
    isLoading,
    paginatedList,
  };

  const filterData = {
    data: [groupByAddress, groupByYear],
    column: ['address', 'city'],
  };

  const editDeleteModal = {
    isAction,
    isEdit,
    isDelete,
    id,
    isToggled,
    info,
    onOpenActions,
    onOpenEditModal,
    onOpenDeleteModal,
    onToggle,
    onModalRef,
    onInfoSet,
    onCloseEditModal,
    onCloseDeleteModal,
  };

  return (
    <TableWrapper
      title="All tenants"
      store={store}
      filterData={filterData}
      configTableData={studentsTableData}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      editDeleteModal={editDeleteModal}
      tableType={'students'}
    />
  );
}

export default Users;
