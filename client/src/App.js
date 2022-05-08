import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from "./components/Main.jsx";
import Profile from "./components/Profile.jsx";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
