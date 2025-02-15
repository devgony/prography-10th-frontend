import "./tailwind.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import RootLayout from "./layouts/RootLayout";
import Complete from "./pages/Complete";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/complete" element={<Complete />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
