import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import carsTableData from './../../config/carsTableData.json';
import {
  deleteCar,
  getCars,
  selectCar,
  selectFilteredAndSortedCars,
  setSearchQuery,
  setCurrentPage,
  setFilterColumn,
  setFilter,
  setSortOrder,
  setSortKey,
  updateCar,
  setItemsPerPage,
  createCar,
} from '../store/slices/carSlice';

import TableWrapper from '../components/Tables/TableWrapper';
import useEditDeleteModal from '../hooks/useEditDeleteModal';
import { groupBy } from '../utils/groupBy';
import { toast } from 'react-toastify';
function Cars() {
  // get user call
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
  } = useSelector(selectCar);

  // select users into store
  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedCars
  );

  useEffect(() => {
    dispatch(getCars());
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

  // State object to hold user information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        driverId: '',
        carType: '',
        make: '',
        model: '',
        year: '',
        color: '',
        capacity: '',
        carPlateNumber: '',
        LicenseNumber: '',
        carImg: '',
      });
    }
  }, [info, onInfoSet]);

  // handle update, delete and create cars
  const handleUpdate = () => {
    const car = { ...info };

    onInfoSet({
      driverId: '',
      carType: '',
      make: '',
      model: '',
      year: '',
      color: '',
      capacity: '',
      carPlateNumber: '',
      LicenseNumber: '',
      carImg: '',
    });
    dispatch(updateCar(car));
    onCloseEditModal();
    toast.success('Car updated successfully');
  };

  const handleDelete = () => {
    dispatch(deleteCar(+id));
    onId(null);
    onCloseDeleteModal();
    toast.error('Car deleted successfully');
  };

  const handleCreate = () => {
    const { carImg: file } = info;
    delete info.carImg;
    dispatch(createCar(info, file));
    onInfoSet({
      driverId: '',
      carType: '',
      make: '',
      model: '',
      year: '',
      color: '',
      capacity: '',
      carPlateNumber: '',
      LicenseNumber: '',
      carImg: '',
    });
    onCloseCreateModal();
    toast.success('Car Register successfully');
  };

  // sort by group ddata
  const groupByPrice = groupBy(paginatedList, 'price');

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
    data: [groupByPrice],
    column: ['price'],
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
      title="All cars"
      store={store}
      filterData={filterData}
      editDeleteModal={editDeleteModal}
      configTableData={carsTableData}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      tableType="cars"
      onCreate={handleCreate}
    />
  );
}

export default Cars;
