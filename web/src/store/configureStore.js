import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middleware/api';
// import logger from './middleware/loger';

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api),
  });
}
