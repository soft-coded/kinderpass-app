import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "./authSlice";
import employeeModalReducer from "./employeeModalSlice";

export const store = configureStore({
  reducer: { auth: authReducer, employeeModal: employeeModalReducer },
});

// typed react-redux hooks for typescript
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
