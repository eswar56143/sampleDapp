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
  },
});

export const { loginFetch, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
