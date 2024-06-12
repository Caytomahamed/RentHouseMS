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
      maintanace.createLoad = false;
      maintanace.error = action.payload;
    },
    setType: (maintanace, action) => {
      console.log(action.payload);
      maintanace.type = action.payload;
    },
    setDescription: (maintanace, action) => {
      maintanace.description = action.payload;
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
} = slice.actions;

export default slice.reducer;

// selector
export const getMaintanace = (state) => state.entities.maintenance;
export const getMaintanaceList = (state) => getMaintanace(state).list;
export const getMaintanaceLoading = (state) => getMaintanace(state).isLoading;

// action creator
export const loadMaintanace = () => {
  apiCallBegin({
    url: '/maintenance',
    method: 'get',
    onStart: maintanaceRequest.type,
    onSuccess: maintanaceRecieve.type,
    onError: maintanaceRequestFail.type,
  });
};

export const updateMaintanace = (data) => {
  return apiCallBegin({
    url: `/maintenance/${data.id}`,
    method: 'put',
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
