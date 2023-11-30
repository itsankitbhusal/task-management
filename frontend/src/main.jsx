import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

axios.interceptors.request.use(
  (request) => {
    if (request.url.includes("/task")) {
      request.headers.Authorization = `Bearer ${localStorage.getItem(
        "access"
      )}`;
      request.headers.refresh = localStorage.getItem("refresh");
    }
    return request;
  },
  (err) => Promise.reject(err)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>
);
