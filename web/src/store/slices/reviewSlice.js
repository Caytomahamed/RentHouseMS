import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const slice = createSlice({
  name: 'review',
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
  },

  reducers: {
    reviewRequest: (users) => {
      users.isLoading = true;
      users.error = null;
    },
    reviewRecieve: (users, action) => {
      users.isLoading = false;
      users.list = action.payload;
    },
    reviewRequestFail: (users, action) => {
      users.isLoading = false;
      users.error = action.payload;
    },
    // updateRequest: (users) => {
    //   users.updateLoad = true;
    //   users.error = null;
    // },
    // updateRecieve: (users) => {
    //   users.updateLoad = false;
    //   users.successMsg = 'user successFully updated';
    // },
    // updateRequestFail: (users, action) => {
    //   users.updateLoad = false;
    //   users.error = action.payload;
    // },
    deleteRequest: (users) => {
      users.deleteLoad = true;
      users.error = null;
    },
    deleteRecieve: (users) => {
      users.deleteLoad = false;
      users.successMsg = 'user successFull deleted';
    },
    deleteRequestFail: (users, action) => {
      users.deleteLoad = false;
      users.error = action.payload;
    },
    // propertyRequest: (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // propertyRecieve: (state, action) => {
    //   state.isLoading = false;
    //   state.yourProperty = action.payload;
    // },
    // propertyRequestFail: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    createRequest: (state) => {
      state.createLoad = true;
      state.error = null;
    },
    createRecieve: (state) => {
      state.createLoad = false;
      state.successMsg = 'user successFully created';
    },
    createRequestFail: (state, action) => {
      state.createLoad = false;
      state.error = action.payload;
    },
  },
});

export const {
  reviewRequest,
  reviewRecieve,
  reviewRequestFail,
  //   updateRequest,
  //   updateRecieve,
  //   updateRequestFail,
  deleteRequest,
  deleteRecieve,
  deleteRequestFail,
  //   propertyRequest,
  //   propertyRecieve,
  //   propertyRequestFail,
  createRequest,
  createRecieve,
  createRequestFail,
} = slice.actions;

export default slice.reducer;

// SELECTORS
export const selectReviews = (state) => state.entities.reviews.list;
export const selectReviewLoading = (state) => state.entities.reviews.isLoading;
export const selectReviewError = (state) => state.entities.reviews.error;
export const selectReviewSuccessMsg = (state) =>
  state.entities.reviews.successMsg;
export const selectReviewUpdateLoad = (state) =>
  state.entities.reviews.updateLoad;
export const selectReviewDeleteLoad = (state) =>
  state.entities.reviews.deleteLoad;
export const selectReviewCreateLoad = (state) =>
  state.entities.reviews.createLoad;

// ACTIONS CREATORS
export const getReviewsByPropertyId = (id) => {
  return apiCallBegin({
    url: `/reviews/${id}/property`,
    onStart: reviewRequest.type,
    onSuccess: reviewRecieve.type,
    onError: reviewRequestFail.type,
  });
};
