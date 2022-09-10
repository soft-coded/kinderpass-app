import { createSlice } from "@reduxjs/toolkit";

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

const authSlice = createSlice({
  name: "auth-slice",
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
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
