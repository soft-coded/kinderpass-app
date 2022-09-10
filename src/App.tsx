import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import NavBar from "./components/navbar";
import { useAppSelector, useAppDispatch } from "./store/index";
import { authActions } from "./store/auth-slice";

function App() {
  const authStatus = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.loginOnLoad());
  }, [dispatch]);

  return authStatus === "fetching" ? (
    <div className="dynamic-full-screen centered">
      <h1>Loading...</h1>
    </div>
  ) : (
    <main className="app-root dynamic-full-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
  );
}

export default App;
