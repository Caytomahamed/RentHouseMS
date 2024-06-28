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
  paidLoad: false,
  yourProperty: [],
  confirmLoad: false,
  alreadyLoading: false,
  booked: [],
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
    },
    booksRequestFail: (users, action) => {
      users.isLoading = false;
      users.error = action.payload;
    },
    paidRequest: (users) => {
      users.paidLoad = true;
      users.error = null;
    },
    paidRecieve: (users) => {
      users.paidLoad = false;
    },
    paidRequestFail: (users, action) => {
      users.paidLoad = false;
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
    confirmRequest: (users) => {
      users.confirmLoad = true;
      users.error = null;
    },
    confirmRecieve: (users) => {
      users.confirmLoad = false;
      users.successMsg = 'user successFully confirm';
    },
    confirmRequestFail: (users, action) => {
      users.confirmLoad = false;
      users.error = action.payload;
    },
    alreadyBookedRequest: (users) => {
      users.alreadyLoading = true;
      users.error = null;
    },
    alreadyBookedRecieve: (users, action) => {
      users.alreadyLoading = false;
      users.booked = action.payload;
    },
    alreadyBookedRequestFail: (users, action) => {
      users.alreadyLoading = false;
      users.error = action.payload;
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
  confirmRequest,
  confirmRecieve,
  confirmRequestFail,
  alreadyBookedRequest,
  alreadyBookedRecieve,
  alreadyBookedRequestFail,
  paidRequest,
  paidRequestFail,
  paidRecieve,
} = slice.actions;

export default slice.reducer;

// SELECTORS
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

  console.log('filteredList', list);

  let endIndex = startIndex + itemsPerPage;
  if (list && endIndex >= list?.length) endIndex = list?.length;

  const paginatedList =
    filteredList && filteredList?.slice(startIndex, endIndex);

  return { paginatedList, totalPages, startIndex, endIndex };
};

export const selectBook = (state) => state.entities.bookings;

/// ACTION CREATORS
export const getBooking = () => {
  return apiCallBegin({
    url: '/booking',
    method: 'get',
    onSuccess: booksRecieve.type,
    onStart: booksRequest.type,
    onError: booksRequestFail.type,
  });
};
export const getLandlordBooking = (id) => {
  return apiCallBegin({
    url: `/booking/${id}/landlord`,
    method: 'get',
    onSuccess: booksRecieve.type,
    onStart: booksRequest.type,
    onError: booksRequestFail.type,
  });
};

export const getAlreadyBooked = (id) => {
  return apiCallBegin({
    url: `/booking/${id}/tenant`,
    method: 'get',
    onSuccess: alreadyBookedRecieve.type,
    onStart: alreadyBookedRequest.type,
    onError: alreadyBookedRequestFail.type,
  });
};

export const rentProperty = (data) => {
  return apiCallBegin({
    url: `/booking/now`,
    method: 'post',
    data,
    onSuccess: booksRecieve.type,
    onStart: booksRequest.type,
    onError: booksRequestFail.type,
  });
};

export const confirmRentProperty = (id) => {
  return apiCallBegin({
    url: `/booking/${id}/confirm`,
    method: 'patch',
    onSuccess: confirmRecieve.type,
    onStart: confirmRequest.type,
    onError: confirmRequestFail.type,
  });
};
export const rejectRentProperty = (id) => {
  return apiCallBegin({
    url: `/booking/${id}/reject`,
    method: 'patch',
    onSuccess: confirmRequest.type,
    onStart: confirmRequest.type,
    onError: confirmRequestFail.type,
  });
};

export const paidRentProperty = (data) => {
  return apiCallBegin({
    url: `/booking/paid`,
    method: 'post',
    data,
    onSuccess: paidRecieve.type,
    onStart: paidRequest.type,
    onError: paidRequestFail.type,
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
    onSuccess: updateRecieve.type,
    onStart: updateRequest.type,
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

export const requestCancellation = (id) => {
  return apiCallBegin({
    url: `/booking/${id}/requestCancellation`,
    method: 'patch',
    onSuccess: deleteRecieve.type,
    onStart: deleteRequest.type,
    onError: delteRequestFail.type,
  });
};
