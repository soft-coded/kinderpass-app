import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { MangerDetails } from "../types";
import { loginManager, signupManger } from "../api/auth";

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
    return res;
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload: MangerDetails) => {
    const res = await signupManger(payload);
    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(_, action) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ email: action.payload.email })
      );
      // fetch from the store after reload
      window.location.href = "/";
    },
    logout() {
      localStorage.removeItem("userData");
      // reload automatically resets all state
      window.location.href = "/";
    },
    loginOnLoad(state) {
      if (localStorage.getItem("userData")) {
        const user = JSON.parse(localStorage.getItem("userData")!);
        state.email = user.email;
        state.isAuthenticated = true;
      }
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
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
