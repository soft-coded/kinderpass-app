import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import NavBar from "./components/navbar";
import EmployeeModal from "./components/employee-modal";
import { useAppSelector, useAppDispatch } from "./store/index";
import { authClient } from "./api";
import { authActions } from "./store/auth-slice";

function App() {
  const authStatus = useAppSelector((state) => state.auth.status);
  const employeeModal = useAppSelector((state) => state.employeeModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = authClient.onAuthStateChanged((user) => {
      dispatch(authActions.loginOnLoad({ email: user?.email }));
    });

    return unsubscribe;
  }, [dispatch]);

  return authStatus === "fetching" ? (
    <div className="dynamic-full-screen centered">
      <h1>Loading...</h1>
    </div>
  ) : (
    <main className="app-root dynamic-full-screen">
      <NavBar />
      {employeeModal.showModal && <EmployeeModal />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
  );
}

export default App;
