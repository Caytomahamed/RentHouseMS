import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const slice = createSlice({
  name: 'maintanace',
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
    markLoad: false,
    type: '',
    description: '',
  },

  reducers: {
    maintanaceRequest: (maintanace) => {
      maintanace.isLoading = true;
      maintanace.error = null;
    },
    maintanaceRecieve: (maintanace, action) => {
      maintanace.isLoading = false;
      maintanace.list = action.payload;
    },
    maintanaceRequestFail: (maintanace, action) => {
      maintanace.isLoading = false;
      maintanace.error = action.payload;
    },
    updateRequest: (maintanace) => {
      maintanace.updateLoad = true;
      maintanace.error = null;
    },
    updateRecieve: (maintanace) => {
      maintanace.updateLoad = false;
      maintanace.successMsg = 'user successFully updated';
    },
    updateRequestFail: (maintanace, action) => {
      maintanace.updateLoad = false;
      maintanace.error = action.payload;
    },
    deleteRequest: (maintanace) => {
      maintanace.deleteLoad = true;
      maintanace.error = null;
    },
    deleteRecieve: (maintanace) => {
      maintanace.deleteLoad = false;
      maintanace.successMsg = 'user successFull deleted';
    },
    deleteRequestFail: (maintanace, action) => {
      maintanace.deleteLoad = false;
      maintanace.error = action.payload;
    },

    createRequest: (maintanace) => {
      maintanace.createLoad = true;
      maintanace.error = null;
    },
    createRecieve: (maintanace) => {
      maintanace.createLoad = false;
      maintanace.successMsg = 'user successFully created';
    },
    createRequestFail: (maintanace, action) => {
      '🚕🚕🚒🚍🛹🏍maintenance action create', action;
      maintanace.createLoad = false;
      maintanace.error = action.payload;
    },
    markRequest: (maintanace) => {
      maintanace.markLoad = true;
      maintanace.error = null;
    },
    markRecieve: (maintanace) => {
      maintanace.markLoad = false;
      maintanace.successMsg = 'maintaince successFully created';
    },
    markRequestFail: (maintanace, action) => {
      maintanace.markLoad = false;
      maintanace.error = action.payload;
    },
    setType: (maintanace, action) => {
      action.payload;
      maintanace.type = action.payload;
    },
    setDescription: (maintanace, action) => {
      maintanace.description = action.payload;
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
  maintanaceRequest,
  maintanaceRecieve,
  maintanaceRequestFail,
  updateRequest,
  updateRecieve,
  updateRequestFail,
  deleteRequest,
  deleteRecieve,
  deleteRequestFail,
  createRequest,
  createRecieve,
  createRequestFail,
  setType,
  setDescription,
  setSearchQuery,
  setFilter,
  setFilterColumn,
  setSortKey,
  setCurrentPage,
  setItemsPerPage,
  setSortOrder,
  markRequest,
  markRecieve,
  markRequestFail,
} = slice.actions;

export default slice.reducer;

// selector
export const selectMaintanace = (state) => state.entities.maintenance;
export const getMaintanaceList = (state) => selectMaintanace(state).list;
export const getMaintanaceLoading = (state) =>
  selectMaintanace(state).isLoading;

// action creator
export const getMaintanaces = () => {
  return apiCallBegin({
    url: '/maintenance',
    method: 'get',
    onStart: maintanaceRequest.type,
    onSuccess: maintanaceRecieve.type,
    onError: maintanaceRequestFail.type,
  });
};

export const getMaintanaceByLandLordId = (id) => {
  return apiCallBegin({
    url: `/maintenance/${id}/landlord`,
    method: 'get',
    onStart: maintanaceRequest.type,
    onSuccess: maintanaceRecieve.type,
    onError: maintanaceRequestFail.type,
  });
};

export const updateMaintanace = (data) => {
  '👆👆👆', data;
  return apiCallBegin({
    url: `/maintenance/${data.id}`,
    method: 'patch',
    data,
    onStart: updateRequest.type,
    onSuccess: updateRecieve.type,
    onError: updateRequestFail.type,
  });
};

export const deleteMaintanace = (id) => {
  return apiCallBegin({
    url: `/maintenance/${id}`,
    method: 'delete',
    onStart: deleteRequest.type,
    onSuccess: deleteRecieve.type,
    onError: deleteRequestFail.type,
  });
};

export const createMaintanace = (data) => {
  return apiCallBegin({
    url: '/maintenance',
    method: 'post',
    data,
    onStart: createRequest.type,
    onSuccess: createRecieve.type,
    onError: createRequestFail.type,
  });
};

export const markedCompleted = (id) => {
  return apiCallBegin({
    url: `/maintenance/${id}/markAsCompleted`,
    method: 'patch',
    onStart: markRequest.type,
    onSuccess: markRecieve.type,
    onError: markRequestFail.type,
  });
};

// Selector with filtering, sorting, and pagination
export const selectFilteredAndSortedMaintenance = (state) => {
  const {
    list,
    searchQuery,
    filter,
    filterColumn,
    sortKey,
    currentPage,
    itemsPerPage,
    sortOrder,
  } = state.entities.maintenance;

  // Filtering
  let filteredList = list.filter(
    (user) => user.type.toLowerCase().includes(searchQuery.toLowerCase())
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
