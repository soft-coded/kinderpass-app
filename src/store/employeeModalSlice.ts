import { createSlice } from "@reduxjs/toolkit";

export interface EmployeeDetails {
  empId?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: string;
  mobileNumber?: string;
  city?: string;
}

interface ModalValues extends EmployeeDetails {
  showModal: boolean;
}

const initialState: ModalValues = {
  showModal: false,
};

const employeeModalSlice = createSlice({
  name: "employee-modal",
  initialState,
  reducers: {
    showModal(state, action) {
      state = { ...action.payload }; // assuming all the correct values are passed
      state.showModal = true;
    },
    hideModal(state) {
      state = { showModal: false };
    },
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
