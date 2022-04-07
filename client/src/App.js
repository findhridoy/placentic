import React from "react";
import { Route, Routes } from "react-router-dom";
import Kursor from "./Components/Kursor";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Kursor />
    </>
  );
};

export default App;
