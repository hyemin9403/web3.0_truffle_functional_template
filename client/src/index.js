import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { TransactionsProvider } from "./context/TransactionContext";
import { CollectionProvider } from "./context/CollectionContext";

ReactDOM.render(
  <Router>
    <TransactionsProvider>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </TransactionsProvider>
  </Router>,

  document.getElementById("root")
);
