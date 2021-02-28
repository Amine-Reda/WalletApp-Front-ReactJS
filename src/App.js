import React from "react";
import "./App.css";
import Nav from "./components/shared/Nav";
import Welcome from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import CreateWallet from "./components/dashboard/dashboardoperations/CreateWallet";
import NotFound from "./components/shared/NotFound";
import { Provider } from "react-redux";
import store from "./Store";
import UpdateWallet from "./components/dashboard/dashboardoperations/UpdateWallet";
import Transaction from "./components/transactions/Transaction";
import AddTransaction from "./components/transactions/transactionoperations/AddTransaction";
import UpdateTransaction from "./components/transactions/transactionoperations/UpdateTransaction";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Nav} />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/createwallet" exact component={CreateWallet} />
          <Route path="/updatewallet/:id" exact component={UpdateWallet} />
          <Route path="/transactions/:id" exact component={Transaction} />
          <Route
            path="/transactions/add/:id"
            exact
            component={AddTransaction}
          />
          <Route
            path="/transactions/update/:walletId/:id"
            exact
            component={UpdateTransaction}
          />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
