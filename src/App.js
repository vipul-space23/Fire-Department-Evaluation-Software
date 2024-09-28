import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import FireNOCForm from "./Pages/FireNOCForm";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login page */}
        <Route path="/" element={<Dashboard />} />

        {/* Route for Signup page */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="Nocform" element={<FireNOCForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
