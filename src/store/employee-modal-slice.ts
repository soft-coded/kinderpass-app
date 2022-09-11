import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EmployeeDetails } from "../types";

interface ModalValues extends EmployeeDetails {
  mode: "edit" | "add"; // corresponding to editing or adding an employee
  showModal: boolean;
}

const initialState: ModalValues = {
  mode: "add",
  showModal: false,
};

const employeeModalSlice = createSlice({
  name: "employee-modal",
  initialState,
  reducers: {
    // pass an empty object if no values are needed
    showModal(
      state,
      action: PayloadAction<EmployeeDetails & { mode: "edit" | "add" }>
    ) {
      state = { ...action.payload, showModal: true }; // assuming all the correct values are passed
      // since the entire state is changing, it must be returned
      return state;
    },
    hideModal(state) {
      state = { showModal: false, mode: "add" };
      return state;
    },
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
