import { createAction } from '@reduxjs/toolkit';

export const apiCallBegin = createAction('api/CallBegin');
export const apiCallSuccess = createAction('api/CallSuccess');
export const apiCallFail = createAction('api/CallFail');
