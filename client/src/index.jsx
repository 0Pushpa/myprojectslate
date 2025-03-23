import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store, persister } from "./redux/store/Store";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

setTimeout(
  () =>
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <HelmetProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </HelmetProvider>
          </PersistGate>
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    ),
  1000
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
