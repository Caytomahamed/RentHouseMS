import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  createLoad: false,
  searchQuery: '', // For searching
  filter: '', // For filtering
  filterColumn: '',
  sortKey: '', // For sorting
  currentPage: 1, // For pagination
  itemsPerPage: 12, // For pagination - set as needed
  sortOrder: 'asc',
  property: {},
  selectItem: {},
};

const usersSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    schedulesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    schedulesReceive: (state, action) => {
      state.list = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    schedulesRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    schedulesSearchRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.list = [];
    },
    schedulesSearchReceive: (state, action) => {
      'action payload', action.payload;
      state.list = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    schedulesSearchRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.list = [];
    },
    propertyRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.property = {};
    },
    propertyReceive: (state, action) => {
      state.property = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    propertyRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.property = {};
    },
    createScheduleRequest: (state) => {
      state.createLoad = true;
      state.error = null;
    },
    createScheduleReceive: (state) => {
      state.error = null;
      state.createLoad = false;
    },
    createScheduleRequestFail: (state, action) => {
      state.createLoad = false;
      state.error = action.payload;
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
    setSelectItem: (users, action) => {
      users.selectItem = action.payload;
    },
  },
});

export const {
  schedulesReceive,
  schedulesRequest,
  schedulesRequestFail,
  schedulesSearchReceive,
  schedulesSearchRequest,
  schedulesSearchRequestFail,
  createScheduleReceive,
  createScheduleRequest,
  createScheduleRequestFail,
  setSearchQuery,
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setItemsPerPage,
  setSortKey,
  setSortOrder,
  propertyRequest,
  propertyRequestFail,
  propertyReceive,
  setSelectItem,
} = usersSlice.actions;

export default usersSlice.reducer;

export const getSchedules = () => {
  return apiCallBegin({
    url: '/properties',
    method: 'get',
    onSuccess: schedulesReceive.type,
    onStart: schedulesRequest.type,
    onError: schedulesRequestFail.type,
  });
};
export const getProperty = (id) => {
  return apiCallBegin({
    url: `/properties/${id}`,
    method: 'get',
    onSuccess: propertyReceive.type,
    onStart: propertyRequest.type,
    onError: propertyRequestFail.type,
  });
};
export const getPropertyRow = (id) => {
  return apiCallBegin({
    url: `/properties/${id}`,
    method: 'get',
    onSuccess: propertyReceive.type,
    onStart: propertyRequest.type,
    onError: propertyRequestFail.type,
  });
};
export const getPropertyByLandlord = (id) => {
  return apiCallBegin({
    url: `/properties/${id}/properties`,
    method: 'get',
    onSuccess: schedulesReceive.type,
    onStart: schedulesRequest.type,
    onError: schedulesRequestFail.type,
  });
};

//
export const searchProperties = ({ location, price, type } = {}) => {
  // Build the query string with optional parameters
  let queryString = 'properties/search?';

  if (location) {
    queryString += `location=${location}&`;
  }

  if (price) {
    queryString += `price=${price}&`;
  }

  if (type) {
    queryString += `type=${type}`; // No trailing '&' for the last parameter
  }

  // Remove the trailing '&' if no parameters were added
  if (price && !type) queryString = queryString.slice(0, -1); // Remove the last character (trailing '&')

  return apiCallBegin({
    url: queryString,
    method: 'get',
    onSuccess: schedulesSearchReceive.type,
    onStart: schedulesSearchRequest.type,
    onError: schedulesSearchRequestFail.type,
  });
};
export const createProperties = (data, file) => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(data));
  for (var i = 0; i < file.length; i++) {
    formData.append('file', file[i]);
  }
  return apiCallBegin({
    url: `/properties`,
    method: 'post',
    data: formData,
    onSuccess: createScheduleReceive.type,
    onStart: createScheduleRequest.type,
    onError: createScheduleRequestFail.type,
  });
};

export const updateProperties = (data, file) => {
  const formData = new FormData();
  formData.append('body', JSON.stringify(data));
  for (var i = 0; i < file.length; i++) {
    formData.append('file', file[i]);
  }
  return apiCallBegin({
    url: `/properties/${data.id}`,
    method: 'patch',
    data: formData,
    onSuccess: createScheduleReceive.type,
    onStart: createScheduleRequest.type,
    onError: createScheduleRequestFail.type,
  });
};
export const deleteProperty = (id) => {
  return apiCallBegin({
    url: `/properties/${id}`,
    method: 'delete',
    onSuccess: createScheduleReceive.type,
    onStart: createScheduleRequest.type,
    onError: createScheduleRequestFail.type,
  });
};

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedSchedule = (state) => {
  const {
    list,
    // searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.schedules;

  // Filtering
  let filteredList = list;
  // let filteredList = list.filter(
  //   (user) => user.address.toLowerCase().includes(searchQuery.toLowerCase())
  //   ||
  //   user.finish.toLowerCase().includes(searchQuery.toLowerCase())
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

/// selecter
export const selectProperties = (state) => state.entities.schedules;
