// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  deleteBook,
  getBooking,
  selectBook,
  selectFilteredAndSortedBooks,
  updateBook,
  setSearchQuery,
  setCurrentPage,
  setFilterColumn,
  setFilter,
  setSortOrder,
  setSortKey,
  setItemsPerPage,
} from '../../store/slices/boookSlice';
import TableWrapper from '../../components/Tables/TableWrapper';
import useEditDeleteModal from '../../hooks/useEditDeleteModal';
import bookingsTableData from './../../../config/bookingTableData.json';
import { groupBy } from '../../utils/groupBy';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helperFunction';

function Cars() {
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
  } = useSelector(selectBook);

  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedBooks
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
    dispatch(getBooking());
  }, [deleteLoad, updateLoad, dispatch]);

  // State object to hold user information
  useEffect(() => {
    if (!Object.keys(info).length) {
      onInfoSet({
        propertyId: null,
        tenantId: null,
        startDate: '',
        endDate: '',
      });
    }
  }, [info, onInfoSet]);

  const handleUpdate = () => {
    const booking = {
      id: info.id,
      propertyId: info.propertyId,
      tenantId: info.tenantId,
      startDate: formatDate(info.startDate),
      endDate: formatDate(info.endDate),
    };

    onInfoSet({
      propertyId: null,
      tenantId: null,
      startDate: '',
      endDate: '',
    });

    dispatch(updateBook(booking));
    onCloseEditModal();
    toast.success('Book updated successfully');
  };

  const handleDelete = () => {
    dispatch(deleteBook(+id));
    onId(null);
    onCloseDeleteModal();
    toast.error('Book delete successfully');
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

  const filterData = {
    data: [groupByAddress],
    column: ['address'],
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
      title="All Booking"
      store={store}
      configTableData={bookingsTableData}
      filterData={filterData}
      editDeleteModal={editDeleteModal}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      tableType="bookings"
    />
  );
}

export default Cars;
