import axios from 'axios';
import * as actions from '../apiActionCreator';

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegin.type) return next(action);

    const { url, data, method, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = axios.request({
        baseURL: 'http://localhost:9000/api/v1',
        url,
        data,
        method,
      });

      // General
      // dispatch(actions.apiCallSuccess(response.data));

      // Specific
      if (onSuccess)
        dispatch({ type: onSuccess, payload: (await response).data.data });
    } catch (error) {
      //General
      // dispatch(actions.apiCallFail(error.message));

      // Specific
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch({ type: onError, payload: error.response.data.message });
      } else {
        // handle the case where error.response is not available
        dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default apiMiddleware;
