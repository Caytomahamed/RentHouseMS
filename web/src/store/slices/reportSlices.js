import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';

const init = {
  transportReport: [],
  isTransportLoading: false,
  error: '',
};

const slice = createSlice({
  name: 'ropert',
  initialState: init,

  reducers: {
    transportReportRequest: (reports) => {
      reports.isTransportLoading = true;
      reports.error = null;
    },
    transportReportRecieve: (reports, action) => {
      reports.isTransportLoading = false;
      reports.transportReport = action.payload;
    },
    transportReportRequestFail: (reports, action) => {
      reports.isTransportLoading = false;
      reports.error = action.payload;
    },
  },
});

export const {
  transportReportRequest,
  transportReportRecieve,
  transportReportRequestFail,
} = slice.actions;

export default slice.reducer;

/// api calls
export const getTranportReport = () => {
  return apiCallBegin({
    url: '/reports',
    method: 'get',
    onStart: transportReportRequest.type,
    onSuccess: transportReportRecieve.type,
    onError: transportReportRequestFail.type,
  });
};

// Selectors
export const selectReport = (state) => state.entities.reports;
