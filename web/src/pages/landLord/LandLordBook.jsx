// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  deleteBook,
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
  getLandlordBooking,
} from '../../store/slices/boookSlice';
import TableWrapper from '../../components/Tables/TableWrapper';
import useEditDeleteModal from '../../hooks/useEditDeleteModal';
import bookingsTableData from './../../../config/bookingTableData.json';
import { groupBy } from '../../utils/groupBy';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helperFunction';
import { appSelectUsers, getCurrentUser } from '../../store/slices/auth';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const LandLordBook = () => {
  // get user call
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const { currentUser } = useSelector(appSelectUsers);

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
    confirmLoad,
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
    dispatch(getLandlordBooking(currentUser.id));
  }, [deleteLoad, updateLoad, dispatch, currentUser, confirmLoad]);

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

  /// open and close view book modal
  const [isView, setIsView] = useState(false);

  const onOpenView = () => setIsView(true);
  const onCloseView = () => setIsView(false);
  const onRefView = useOutsideClick(() => onCloseView());

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
      menuType={'landlord'}
      view={{ isView, onRefView, onCloseView, onOpenView }}
    />
  );
};

export default LandLordBook;
