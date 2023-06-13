import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

const el = document.getElementById("root");

ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
