import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    isLoading: false,
    userDaetails: {},
  },
  reducers: {
    // login
    loginFetch: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.userDaetails = action.payload;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },

    // register
    registerFetch: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.userDaetails = action.payload;
    },
    registerFailure: (state) => {
      state.isLoading = false;
    },

    // logout
    logoutFetch: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.userDaetails = {};
    },
    logoutFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  loginFetch,
  loginSuccess,
  loginFailure,

  registerFetch,
  registerSuccess,
  registerFailure,

  logoutFetch,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;
export default userSlice.reducer;
