// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../store/slices/userSlice';

import {
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setSearchQuery,
  setSortKey,
  setSortOrder,
  setItemsPerPage,
  getDrivers,
  selectDriver,
  selectFilteredAndSortedDrivers,
  createDriver,
} from '../../store/slices/driverSlice';

import TableWrapper from '../../components/Tables/TableWrapper';
import useEditDeleteModal from '../../hooks/useEditDeleteModal';
import { groupBy } from '../../utils/groupBy';

import driversTableData from '../../../config/driversTableData.json';
import { toast } from 'react-toastify';

function LandLords() {
  const dispatch = useDispatch();
  // drivers selector
  const {
    createLoad,
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
  } = useSelector(selectDriver);

  // Get drivers
  useEffect(() => {
    dispatch(getDrivers());
  }, [deleteLoad, createLoad, updateLoad, dispatch]);

  // edit and delete modol state
  const {
    isAction,
    isEdit,
    isDelete,
    id,
    onId,
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
    isCreate,
    onOpenCreateModal,
    onCloseCreateModal,
    // onCloseActions,
  } = useEditDeleteModal();

  // State object to hold driver information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        driverType: 'normal',
        yearOfStudy: '',
        faculty: '',
        imageUrl: '',
      });
    }
  }, [info, onInfoSet]);

  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedDrivers
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
      driverType: 'normal',
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
    toast.success('Driver updated successfully');
  };

  const handleDelete = () => {
    dispatch(deleteUser(+id));
    onId(null);
    onCloseDeleteModal();
    toast.error('Driver deleted successfully');
  };

  const handleCreate = () => {
    const { imageUrl: file } = info;
    delete info.imageUrl;
    dispatch(createDriver(info, file));
    onCloseCreateModal();
    onInfoSet({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      driverType: 'normal',
      yearOfStudy: '',
      faculty: '',
      imageUrl: '',
    });
    toast.success('Driver create successfully');
  };

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

  // sort by group ddata
  const groupByAddress = groupBy(paginatedList, 'address');
  const groupByType = groupBy(paginatedList, 'driverType');

  const filterData = {
    data: [groupByAddress, groupByType],
    column: ['address', 'driverType'],
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
    isCreate,
    onOpenCreateModal,
    onCloseCreateModal,
  };

  return (
    <TableWrapper
      title="All landlords"
      store={store}
      filterData={filterData}
      configTableData={driversTableData}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      editDeleteModal={editDeleteModal}
      tableType="students"
      onCreate={handleCreate}
    />
  );
}

export default LandLords;
