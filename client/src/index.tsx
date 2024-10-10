import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
  <BrowserRouter basename="/Comics/">
    <React.StrictMode>
      <AppContext>
        <App />
      </AppContext>
    </React.StrictMode>
  </BrowserRouter>
  </Provider>
);

reportWebVitals();
