import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./pages/Form";
import LoginPage from "./pages/LogIn";
import Dashboards from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/data" element={<Dashboards />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
