import React from "react";
import ReactDOM from "react-dom/client";
import SendCodePage from "./pages/SendCode";
import CheckCodePage from "./pages/EnterCode";
import SuccessPage from "./pages/Success";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SendCodePage />} />
        <Route path="/check-code" element={<CheckCodePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
