import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userPersistReducer",
  initialState: {
    isLoggedIn: false,
    userId: null,
  },
  reducers: {
    // login successful
    saveLoginDaetails: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },

    clearLoginDaetails: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const { saveLoginDaetails, clearLoginDaetails } = userSlice.actions;
export default userSlice.reducer;
