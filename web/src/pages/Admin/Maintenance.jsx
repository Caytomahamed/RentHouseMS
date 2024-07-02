/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import TableWrapper from '../../components/Tables/TableWrapper';
import {
  selectFilteredAndSortedMaintenance,
  selectMaintanace,
  setSearchQuery,
  setCurrentPage,
  setFilterColumn,
  setFilter,
  setSortOrder,
  setSortKey,
  setItemsPerPage,
  getMaintanaceByLandLordId,
  updateMaintanace,
  deleteMaintanace,
  getMaintanaces,
} from '../../store/slices/maintanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import useEditDeleteModal from '../../hooks/useEditDeleteModal';
import { groupBy } from '../../utils/groupBy';

import { toast } from 'react-toastify';
import maintenanceTableData from './../../../config/maintenanceTableData.json';

const Maintenance = () => {
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
    markLoad,
  } = useSelector(selectMaintanace);

  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedMaintenance
  );

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
    // onCloseActions,
  } = useEditDeleteModal();

  useEffect(() => {
    dispatch(getMaintanaces());
  }, [dispatch, deleteLoad, updateLoad, markLoad]);

  // State object to hold user information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        description: null,
        type: '',
        status: '',
      });
    }
  }, [info, onInfoSet]);

  const handleUpdate = () => {
    const maintenance = {
      id: info.id,
      description: info.description,
      type: info.type,
      status: info.status,
    };

    onInfoSet({
      description: null,
      type: '',
      status: '',
    });

    dispatch(updateMaintanace(maintenance));
    onCloseEditModal();
    toast.success('Maintenance updated successfully');
  };

  const handleDelete = () => {
    dispatch(deleteMaintanace(+id));
    onId(null);
    onCloseDeleteModal();
    toast.error('Maintenance delete successfully');
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
  const groupByType = groupBy(paginatedList, 'type');
  const groupByStatus = groupBy(paginatedList, 'status');

  const filterData = {
    data: [groupByType, groupByStatus],
    column: ['type', 'status'],
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
      title="Your Maintenance"
      store={store}
      configTableData={maintenanceTableData}
      filterData={filterData}
      editDeleteModal={editDeleteModal}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      tableType="maintenance"
    />
  );
};

export default Maintenance;
