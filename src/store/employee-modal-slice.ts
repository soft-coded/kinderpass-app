import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    // pass an empty object if no values are needed
    showModal(state, action: PayloadAction<EmployeeDetails>) {
      state = { ...action.payload, showModal: true }; // assuming all the correct values are passed
      // since the entire state is changing, it must be returned
      return state;
    },
    hideModal(state) {
      state = { showModal: false };
      return state;
    },
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
