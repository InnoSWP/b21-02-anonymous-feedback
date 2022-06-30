import "./polyfillBuffer";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import client from "./client";

const root = ReactDom.createRoot(document.getElementById(`root`)!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
