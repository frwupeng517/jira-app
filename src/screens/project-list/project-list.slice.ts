import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  projectModalVisible: boolean;
}

const initialState: State = {
  projectModalVisible: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalVisible = true;
    },
    closeProjectModal(state) {
      state.projectModalVisible = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModalVisible = (state: RootState) =>
  state.projectList.projectModalVisible;
