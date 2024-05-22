import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../apiActionCreator';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const USER_TYPE = 'userType';
const USER_ID = 'userType';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
  userType: null,
  currentUser: null,
  isLogin: false,
};

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isLogin = false;
    },
    registerReceive: (state, action) => {
      state.token = action.payload.token;
      state.error = null;
      state.isLoading = false;
      state.userType = action.payload.userType;
      state.isLogin = true;

      localStorage.setItem(TOKEN_KEY, action.payload.token);
      localStorage.setItem(USER_TYPE, action.payload.userType);
    },
    registerRequestFail: (state, action) => {
      console.log('failed');
      state.token = null;
      state.isLoading = false;
      state.error = action.payload;
      state.isLogin = false;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isLogin = false;
    },
    loginReceive: (state, action) => {
      state.token = action.payload.token;
      // state.userType = action.payload.data.roleId;s
      state.isLoading = false;
      state.userType = action.payload.userType;
      state.isLogin = true;

      localStorage.setItem(TOKEN_KEY, action.payload.token);
      if (!localStorage.getItem(USER_TYPE))
        localStorage.setItem(USER_TYPE, action.payload.userType);
    },
    loginRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLogin = false;
    },
    authCheckStart: (state) => {
      state.isLoading = true;
    },
    authCheckComplete: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.userType = null;
      localStorage.removeItem(TOKEN_KEY); // Clear the token from AsyncStorage
      localStorage.removeItem(USER_TYPE);
      state.isLogin = false;
    },
    currentUserRequest: (state) => {
      // state.isLoading = true;
      state.error = null;
    },
    currentUserReceive: (state, action) => {
      state.error = null;
      state.currentUser = action.payload;
      // state.isLoading = false;
    },
    currentUserRequestFail: (state, action) => {
      // state.isLoading = false;
      console.log('errd', action);
      state.error = action.payload;
    },
  },
});

export const {
  registerReceive,
  registerRequest,
  registerRequestFail,
  loginReceive,
  loginRequest,
  loginRequestFail,
  authCheckComplete,
  authCheckStart,
  logout,
  currentUserReceive,
  currentUserRequest,
  currentUserRequestFail,
} = usersSlice.actions;

export default usersSlice.reducer;

export const signUp = (data) => {
  return apiCallBegin({
    url: '/users/signup',
    method: 'post',
    data,
    onSuccess: registerReceive.type,
    onStart: registerRequest.type,
    onError: registerRequestFail.type,
  });
};

export const login = (data) => {
  return apiCallBegin({
    url: '/users/login',
    method: 'post',
    data,
    onSuccess: loginReceive.type,
    onStart: loginRequest.type,
    onError: loginRequestFail.type,
  });
};
export const getCurrentUser = () => {
  return apiCallBegin({
    url: '/users/getUserInfo',
    method: 'get',
    onSuccess: currentUserReceive.type,
    onStart: currentUserRequest.type,
    onError: currentUserRequestFail.type,
  });
};

export const changePassword = (data) => {
  return apiCallBegin({
    url: '/users/updateMyPassword',
    method: 'patch',
    data,
    onSuccess: currentUserReceive.type,
    onStart: currentUserRequest.type,
    onError: currentUserRequestFail.type,
  });
};

/// selecter
export const appSelectUsers = (state) => state.entities.auth;

// Check for the token in AsyncStorage when the app starts
export const checkAuth = () => {
  return async (dispatch) => {
    dispatch(authCheckStart());
    const tkn = localStorage.getItem(TOKEN_KEY);
    const type = localStorage.getItem(USER_TYPE);
    if (tkn) {
      dispatch(loginReceive({ userType: type, token: tkn }));
    }
    dispatch(authCheckComplete());
  };
};

// logout
export const userLogout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};
