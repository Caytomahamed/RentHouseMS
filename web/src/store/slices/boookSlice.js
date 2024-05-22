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
  yourProperty: [],
};

const slice = createSlice({
  name: 'booking',
  initialState: init,

  reducers: {
    booksRequest: (users) => {
      users.isLoading = true;
      users.error = null;
    },
    booksRecieve: (users, action) => {
      users.isLoading = false;
      users.list = action.payload;
      console.log('booking', action.payload.data);
    },
    booksRequestFail: (users, action) => {
      users.isLoading = false;
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
    propertyRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.yourProperty = [];
    },
    propertyReceive: (state, action) => {
      state.yourProperty = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    propertyRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.yourProperty = [];
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
  },
});

export const {
  booksRequest,
  booksRecieve,
  booksRequestFail,
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
  propertyRequest,
  propertyRequestFail,
  propertyReceive,
} = slice.actions;

export default slice.reducer;

/// api calls
export const getBooking = () => {
  return apiCallBegin({
    url: '/booking',
    method: 'get',
    onSuccess: booksRecieve.type,
    onStart: booksRequest.type,
    onError: booksRequestFail.type,
  });
};

export const rentProperty = (data) => {
  return apiCallBegin({
    url: `/booking/now`,
    method: 'post',
    data,
    onSuccess: booksRecieve.type,
    onStart: booksRecieve.type,
    onError: booksRequestFail.type,
  });
};

export const getYourRentProperty = () => {
  return apiCallBegin({
    url: `/booking/booked`,
    method: 'get',
    onSuccess: propertyReceive.type,
    onStart: propertyRequest.type,
    onError: propertyReceive.type,
  });
};

export const updateBook = (data) => {
  return apiCallBegin({
    url: `/booking/${data.id}`,
    method: 'patch',
    data,
    onSuccess: updateRequest.type,
    onStart: updateRecieve.type,
    onError: updateRequestFail.type,
  });
};
export const deleteBook = (id) => {
  return apiCallBegin({
    url: `/booking/${id}`,
    method: 'delete',
    onSuccess: deleteRecieve.type,
    onStart: deleteRequest.type,
    onError: delteRequestFail.type,
  });
};

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedBooks = (state) => {
  const {
    list,
    // searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.bookings;

  // Filtering
  let filteredList = list;
  // let filteredList = list.filter(
  //   (user) =>
  //     user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
export const selectBook = (state) => state.entities.bookings;
