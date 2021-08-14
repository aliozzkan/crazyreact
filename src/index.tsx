import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";
import { store } from "store";
import reportWebVitals from "./reportWebVitals";
import SiemensTheme from "themes/siemens";
import "./App.css";
import { ErrorBoundary } from "components/organisms/ErrorBoundary";

ReactDOM.render(
  <ReduxProvider {...{ store }}>
    {/* <ChakraProvider portalZIndex={2} theme={SiemensTheme}> */}
    <ChakraProvider portalZIndex={2}>
      <CSSReset />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
