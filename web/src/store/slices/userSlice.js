import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const init = {
  list: [],
  isLoading: false,
  error: '',
  searchQuery: '', // For searching
  filter: '', // For filtering
  filterColumn: '',
  sortKey: '', // For sorting
  currentPage: 1, // For pagination
  itemsPerPage: 10, // For pagination - set as needed
  sortOrder: 'asc',
  successMsg: '',
  updateLoad: false,
  deleteLoad: false,
  dash: [],
  dashLoading: false,
  reports: [],
  reportLoad: false,
  totals: {},
  last30Days: {},
  books: [],
  bookingsPerMonth: [],
  payments: [],
  rentORAvailable: [],
  properties: [],
};

const slice = createSlice({
  name: 'users',
  initialState: init,

  reducers: {
    usersRequest: (users) => {
      users.isLoading = true;
      users.error = null;
    },
    usersRecieve: (users, action) => {
      users.isLoading = false;
      users.list = action.payload;
    },
    usersRequestFail: (users, action) => {
      users.isLoading = false;
      users.error = action.payload;
    },
    dashRequest: (users) => {
      users.dashLoading = true;
      users.dash = [];
    },
    dashRecieve: (users, action) => {
      users.dashLoading = false;
      users.dash = action.payload;
    },
    dashRequestFail: (users, action) => {
      users.dashLoading = false;
      users.error = action.payload;
    },
    updateRequest: (users) => {
      users.updateLoad = true;
      users.error = null;
    },
    updateRecieve: (users) => {
      users.updateLoad = false;
      users.successMsg = 'user successFully updated';
    },
    updateRequestFail: (users, action) => {
      users.updateLoad = false;
      users.error = action.payload;
    },
    deleteRequest: (users) => {
      users.deleteLoad = true;
      users.error = null;
    },
    deleteRecieve: (users) => {
      users.deleteLoad = false;
      users.successMsg = 'user successFull deleted';
    },
    delteRequestFail: (users, action) => {
      users.deleteLoad = false;
      users.error = action.payload;
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
    reportRequest: (users) => {
      users.reportLoad = true;
      users.reports = [];
    },
    reportRecieve: (users, action) => {
      console.log('users', action);
      users.reportLoad = false;
      users.reports = action.payload;
      users.totals = action.payload.reports[0];
      users.last30Days = action.payload.reports[1];
      users.books = action.payload.reports[3];
      users.bookingsPerMonth = action.payload.reports[4];
      users.payments = action.payload.reports[5];
      users.rentORAvailable = action.payload.reports[2];
      users.properties = action.payload.reports[7];
    },
    reportRequestFail: (users, action) => {
      users.reportLoad = false;
      users.reports = [];
      users.error = action.payload;
    },
  },
});

export const {
  usersRequest,
  usersRecieve,
  usersRequestFail,
  updateRequest,
  updateRecieve,
  updateRequestFail,
  deleteRequest,
  deleteRecieve,
  delteRequestFail,
  setSearchQuery,
  setFilter,
  setFilterColumn,
  setSortKey,
  setCurrentPage,
  setItemsPerPage,
  setSortOrder,
  dashRecieve,
  dashRequest,
  dashRequestFail,
  reportRequest,
  reportRecieve,
  reportRequestFail,
} = slice.actions;

export default slice.reducer;

/// api calls
export const getUsers = () => {
  return apiCallBegin({
    url: '/users/tenants',
    method: 'get',
    onSuccess: usersRecieve.type,
    onStart: usersRequest.type,
    onError: usersRequestFail.type,
  });
};
export const getAllUsers = () => {
  return apiCallBegin({
    url: '/users',
    method: 'get',
    onSuccess: usersRecieve.type,
    onStart: usersRequest.type,
    onError: usersRequestFail.type,
  });
};

export const getDashSummary = () => {
  return apiCallBegin({
    url: '/users/dash',
    method: 'get',
    onSuccess: dashRecieve.type,
    onStart: dashRequest.type,
    onError: dashRequestFail.type,
  });
};

export const updateUser = (data, file) => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(data));
  formData.append('file', file);
  return apiCallBegin({
    url: `/users/${data.id}`,
    method: 'patch',
    data: formData,
    onSuccess: updateRequest.type,
    onStart: updateRecieve.type,
    onError: updateRequestFail.type,
  });
};
export const deleteUser = (id) => {
  return apiCallBegin({
    url: `/users/${id}`,
    method: 'delete',
    onSuccess: deleteRecieve.type,
    onStart: deleteRequest.type,
    onError: delteRequestFail.type,
  });
};

export const getReports = (id) => {
  return apiCallBegin({
    url: `/reports/${id}/landlord`,
    method: 'get',
    onSuccess: reportRecieve.type,
    onStart: reportRequest.type,
    onError: reportRequestFail.type,
  });
};
export const getReportsAdmin = () => {
  console.log('getReportsAdmin');
  return apiCallBegin({
    url: `/reports/admin`,
    method: 'get',
    onSuccess: reportRecieve.type,
    onStart: reportRequest.type,
    onError: reportRequestFail.type,
  });
};

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedUsers = (state) => {
  const {
    list,
    searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.users;

  // Filtering
  let filteredList = list.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
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

// Selectors
export const selectUsers = (state) => state.entities.users;
export const selectedUser = (state) => state.entities.users.seletedUser;
