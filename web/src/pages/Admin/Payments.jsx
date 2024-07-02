// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import TableWrapper from '../../components/Tables/TableWrapper';
import {
  setSearchQuery,
  setCurrentPage,
  setFilterColumn,
  setFilter,
  setSortOrder,
  setSortKey,
  setItemsPerPage,
  deletePayment,
  updatePayment,
  selectFilteredAndSortedPayment,
  selectPayment,
  getAllPayments,
} from '../../store/slices/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import useEditDeleteModal from '../../hooks/useEditDeleteModal';
import { groupBy } from '../../utils/groupBy';
import { formatDate } from '../../utils/helperFunction';
import { toast } from 'react-toastify';
import paymentTableData from './../../../config/paymentTableData.json';


const Payments = () => {
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
  } = useSelector(selectPayment);

  const { paginatedList, startIndex, endIndex, totalPages } = useSelector(
    selectFilteredAndSortedPayment
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
    dispatch(getAllPayments());
  }, [dispatch, deleteLoad, updateLoad]);

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

    dispatch(updatePayment(booking));
    onCloseEditModal();
    toast.success('Maintenance updated successfully');
  };

  const handleDelete = () => {
    dispatch(deletePayment(+id));
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
      title="Your Payments"
      store={store}
      configTableData={paymentTableData}
      filterData={filterData}
      editDeleteModal={editDeleteModal}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      tableType="payment"
    />
  );
};

export default Payments;
