import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userPersistReducer",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    // login successful
    saveLoginDaetails: (state, action) => {
      state.isLoggedIn = true;
    },

    clearLoginDaetails: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const { saveLoginDaetails, clearLoginDaetails } = userSlice.actions;
export default userSlice.reducer;
