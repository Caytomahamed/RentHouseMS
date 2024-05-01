import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { groupBy } from '../utils/groupBy';
import {
  getRoutes,
  selectFilteredAndSortedRoutes,
  setFilterColumn,
  setFilter,
  setSortOrder,
  setSortKey,
  selectRoute,
  setItemsPerPage,
  updateRoute,
  deleteRoute,
  createRoute,
} from '../store/slices/routeSlice';
import useEditDeleteModal from '../hooks/useEditDeleteModal';

import routesTableData from '../../config/routesTableData.json';
import { setCurrentPage, setSearchQuery } from '../store/slices/boookSlice';
import { toast } from 'react-toastify';
import TableWrapper from '../components/Tables/TableWrapper';
function OurRoutes() {
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
  } = useSelector(selectRoute);

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

  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedRoutes
  );

  useEffect(() => {
    dispatch(getRoutes());
  }, [deleteLoad, createLoad, updateLoad, dispatch]);

  // State object to hold routes information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        start: '',
        finish: '',
        description: '',
        price: '',
      });
    }
  }, [info, onInfoSet]);

  const handleUpdate = () => {
    const route = { ...info };
    dispatch(updateRoute(route));
    onCloseEditModal();
    onInfoSet({
      start: '',
      finish: '',
      description: '',
      price: '',
    });
    toast.success('Route update successfully');
  };

  const handleDelete = () => {
    dispatch(deleteRoute(+id));
    onCloseDeleteModal();
    onId(null);
    toast.error('Route delete successfully');
  };

  const handleCreate = () => {
    dispatch(createRoute(info));
    onInfoSet({
      price: '',
      start: '',
      finish: '',
      description: '',
    });
    onCloseCreateModal();
    toast.success('Route create successfully');
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
      title="All routes"
      store={store}
      editDeleteModal={editDeleteModal}
      filterData={filterData}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      configTableData={routesTableData}
      tableType="routes"
      onCreate={handleCreate}
    />
  );
}

export default OurRoutes;
