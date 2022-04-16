import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
ReactDom.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <div>
              lols <Link to="/home/123">Home</Link>
            </div>
          }
        />
        <Route path="/home/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
