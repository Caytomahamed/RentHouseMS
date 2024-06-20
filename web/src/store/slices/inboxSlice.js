import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const slice = createSlice({
  name: 'inbox',
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
    isHasReview: false,
    myInbox: [],
    unRead: 0,
    myInboxLoading: false,
  },

  reducers: {
    createInboxRequest: (inbox) => {
      inbox.createLoad = true;
      inbox.error = null;
    },
    createInboxRecieve: (inbox, action) => {
      inbox.createLoad = false;
      inbox.successMsg = action.payload;
    },
    createInboxRequestFail: (inbox, action) => {
      inbox.createLoad = false;
      inbox.error = action.payload;
    },
    unReadRequest: (inbox) => {
      inbox.isLoading = true;
      inbox.error = null;
    },
    unReadRecieve: (inbox, action) => {
      inbox.isLoading = false;
      inbox.unRead = action.payload;
    },
    unReadRequestFail: (inbox, action) => {
      inbox.isLoading = false;
      inbox.error = action.payload;
      inbox.error = action.payload;
    },
    myInboxRequest: (inbox) => {
      inbox.myInboxLoading = true;
      inbox.error = null;
    },
    myInboxRecieve: (inbox, action) => {
      inbox.myInboxLoading = false;
      inbox.myInbox = action.payload;
    },
    myInboxRequestFail: (inbox, action) => {
      inbox.myInboxLoading = false;
      inbox.error = action.payload;
    },
  },
});

export const {
  myInboxRequest,
  myInboxRecieve,
  myInboxRequestFail,
  createInboxRequest,
  createInboxRecieve,
  createInboxRequestFail,
  unReadRequest,
  unReadRecieve,
  unReadRequestFail,
} = slice.actions;

export default slice.reducer;

// Selector
export const selectInboxes = (state) => state.entities.inboxes;

// Action Creators
export const getMyInbox = (userId) => {
  return apiCallBegin({
    url: `/inbox/${userId}`,
    onStart: myInboxRequest.type,
    onSuccess: myInboxRecieve.type,
    onError: myInboxRequestFail.type,
  });
};

export const createInbox = (inbox) => {
  return apiCallBegin({
    url: '/inbox',
    method: 'post',
    data: inbox,
    onStart: createInboxRequest.type,
    onSuccess: createInboxRecieve.type,
    onError: createInboxRequestFail.type,
  });
};

export const getUnReadInbox = (userId) => {
  return apiCallBegin({
    url: `/inbox/${userId}/notReading`,
    onStart: unReadRequest.type,
    onSuccess: unReadRecieve.type,
    onError: unReadRequestFail.type,
  });
};
