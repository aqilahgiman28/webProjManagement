import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "",
      email: "",
      password: "",
      address: "",
      mobile: ""
    }
  },
  reducers: {
    getUserData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getUserData } = userSlice.actions;

export default userSlice.reducer;
