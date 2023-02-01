import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: {
      projectname: ""
    }
  },
  reducers: {
    getProjectData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getProjectData } = projectSlice.actions;

export default projectSlice.reducer;
