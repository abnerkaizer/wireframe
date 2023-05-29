import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Upcoming from "./pages/Upcoming";
import Popular from "./pages/Popular";
import Movie from "./pages/Movie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/wireframe" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/popular" element={<Popular />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
