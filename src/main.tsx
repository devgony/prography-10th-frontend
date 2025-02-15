import "./tailwind.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import Apply from "./Apply";
import RootLayout from "./RootLayout";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
