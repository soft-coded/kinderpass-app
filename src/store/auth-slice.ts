import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { MangerDetails } from "../types";
import { loginManager, logout, signupManger } from "../api/auth";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  status: "fetching" | "loading" | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  status: "fetching",
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const res = await loginManager(payload.email, payload.password);
    return { email: res.user.email };
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload: MangerDetails) => {
    const res = await signupManger(payload);
    return { email: res.user.email };
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload?.email != null) {
        state.email = action.payload.email;
        state.isAuthenticated = true;
      }
      state.status = null;
    },
    logout(state) {
      state.email = null;
      state.isAuthenticated = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.login(state, action);
    });

    builder.addCase(loginThunk.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = action.error.message!;
      state.status = null;
    });

    builder.addCase(signupThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.login(state, action);
    });

    builder.addCase(signupThunk.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(signupThunk.rejected, (state, action) => {
      state.error = action.error.message!;
      state.status = null;
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      authSlice.caseReducers.logout(state);
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.error = action.error.message!;
      state.status = null;
    });
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
