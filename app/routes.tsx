import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Ela from "./routes/ela";
import HsRates from "./routes/hs-rates";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ela" element={<Ela />} />
    <Route path="/hs" element={<HsRates />} />
  </Routes>
);

export default AppRoutes;
