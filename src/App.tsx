import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

function App() {
  return (
    <main className="app-root dynamic-full-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
  );
}

export default App;
