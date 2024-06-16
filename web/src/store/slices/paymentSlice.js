import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const slice = createSlice({
  name: 'payment',
  initialState: {
    list: [],
    isLoading: false,
    error: '',
    searchQuery: '',
    filter: '',
    filterColumn: '',
    sortKey: '',
    currentPage: 1,
    itemsPerPage: 10,
    sortOrder: 'asc',
    successMsg: '',
    updateLoad: false,
    deleteLoad: false,
    createLoad: false,
    type: '',
    description: '',
  },

  reducers: {
    paymentRequest: (payment) => {
      payment.isLoading = true;
      payment.error = null;
    },
    paymentRecieve: (payment, action) => {
      payment.isLoading = false;
      payment.list = action.payload;
    },
    paymentRequestFail: (payment, action) => {
      payment.isLoading = false;
      payment.error = action.payload;
    },
    updateRequest: (payment) => {
      payment.updateLoad = true;
      payment.error = null;
    },
    updateRecieve: (payment) => {
      payment.updateLoad = false;
      payment.successMsg = 'user successFully updated';
    },
    updateRequestFail: (payment, action) => {
      payment.updateLoad = false;
      payment.error = action.payload;
    },
    deleteRequest: (payment) => {
      payment.deleteLoad = true;
      payment.error = null;
    },
    deleteRecieve: (payment) => {
      payment.deleteLoad = false;
      payment.successMsg = 'user successFull deleted';
    },
    deleteRequestFail: (payment, action) => {
      payment.deleteLoad = false;
      payment.error = action.payload;
    },
    // New actions for searching, sorting, filtering, pagination
    setSearchQuery: (users, action) => {
      users.searchQuery = action.payload;
    },
    setFilter: (users, action) => {
      users.filter = action.payload;
    },
    setFilterColumn: (users, action) => {
      users.filterColumn = action.payload;
    },
    setSortKey: (users, action) => {
      users.sortKey = action.payload;
    },
    setCurrentPage: (users, action) => {
      users.currentPage = action.payload;
    },
    setItemsPerPage: (users, action) => {
      users.itemsPerPage = action.payload;
    },
    setSortOrder: (users, action) => {
      users.sortOrder = action.payload;
    },
  },
});

export const {
  paymentRequest,
  paymentRecieve,
  paymentRequestFail,
  updateRequest,
  updateRecieve,
  updateRequestFail,
  deleteRequest,
  deleteRecieve,
  deleteRequestFail,
  setSearchQuery,
  setFilter,
  setFilterColumn,
  setSortKey,
  setCurrentPage,
  setItemsPerPage,
  setSortOrder,
} = slice.actions;

export default slice.reducer;

// SELECTOR
export const selectPayment = (state) => state.entities.payment;

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedPayment = (state) => {
  const {
    list,
    searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.payment;

  // Filtering
  let filteredList = list.filter(
    (user) => user.created_at.toLowerCase().includes(searchQuery.toLowerCase())
    //||
    //user.finish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Applying filter
  if (filter) {
    filteredList = filteredList.filter((user) => user[filterColumn] === filter);
  }

  // Sorting
  if (sortKey) {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    filteredList.sort(
      (a, b) => multiplier * a[sortKey].localeCompare(b[sortKey])
    );
  }
  // Pagination
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  let endIndex = startIndex + itemsPerPage;
  if (endIndex >= list.length) endIndex = list.length;

  const paginatedList = filteredList.slice(startIndex, endIndex);

  return { paginatedList, totalPages, startIndex, endIndex };
};

// ACTION CREATOR
export const getAllPayments = () => {
  return apiCallBegin({
    url: '/payments',
    method: 'get',
    onStart: paymentRequest.type,
    onSuccess: paymentRecieve.type,
    onError: paymentRequestFail.type,
  });
};

export const getPaymentsByLandlordId = (id) => {
  return apiCallBegin({
    url: `/payments/${id}/landlord`,
    method: 'get',
    onStart: paymentRequest.type,
    onSuccess: paymentRecieve.type,
    onError: paymentRequestFail.type,
  });
};

export const updatePayment = (data) => {
  return apiCallBegin({
    url: `/payments/${data.id}`,
    method: 'patch',
    data,
    onStart: updateRequest.type,
    onSuccess: updateRecieve.type,
    onError: updateRequestFail.type,
  });
};

export const deletePayment = (id) => {
  return apiCallBegin({
    url: `/payments/${id}`,
    method: 'delete',
    onStart: deleteRequest.type,
    onSuccess: deleteRecieve.type,
    onError: deleteRequestFail.type,
  });
};
