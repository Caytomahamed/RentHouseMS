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
  createLoad: false,
};

const slice = createSlice({
  name: 'cars',
  initialState: init,

  reducers: {
    carRequest: (users) => {
      users.isLoading = true;
      users.error = null;
    },
    carRecieve: (users, action) => {
      users.isLoading = false;
      users.list = action.payload;
    },
    carRequestFail: (users, action) => {
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
    delteRequestFail: (users, action) => {
      users.deleteLoad = false;
      users.error = action.payload;
    },
    createRequest: (users) => {
      users.createLoad = true;
      users.error = null;
    },
    createRecieve: (users) => {
      users.createLoad = false;
      users.successMsg = 'user successFull deleted';
    },
    createRequestFail: (users, action) => {
      users.createLoad = false;
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
  carRequest,
  carRecieve,
  carRequestFail,
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
  createRecieve,
  createRequest,
  createRequestFail,
} = slice.actions;

export default slice.reducer;

/// api calls
export const getCars = () => {
  return apiCallBegin({
    url: '/cars',
    method: 'get',
    onSuccess: carRecieve.type,
    onStart: carRequest.type,
    onError: carRequestFail.type,
  });
};

export const updateCar = (data) => {
  return apiCallBegin({
    url: `/cars/${data.id}`,
    method: 'patch',
    data,
    onSuccess: updateRecieve.type,
    onStart: updateRequest.type,
    onError: updateRequestFail.type,
  });
};
export const createCar = (data, file) => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(data));
  formData.append('file', file);
  return apiCallBegin({
    url: `/cars`,
    method: 'post',
    data: formData,
    onSuccess: createRecieve.type,
    onStart: createRequest.type,
    onError: updateRequestFail.type,
  });
};
export const deleteCar = (id) => {
  return apiCallBegin({
    url: `/cars/${id}`,
    method: 'delete',
    onSuccess: deleteRecieve.type,
    onStart: deleteRequest.type,
    onError: delteRequestFail.type,
  });
};

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedCars = (state) => {
  const {
    list,
    searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.cars;
  // Filtering
  // let filteredList = list;
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
export const selectCar = (state) => state.entities.cars;
export const selectedCar = (state) => state.entities.cars.seletedUser;
