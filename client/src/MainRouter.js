import { Switch, Route } from "react-router-dom";
import Homepage from "./views/homepage/homepage";
import Table from "./views/table/table";
import React, { Component } from "react";

class MainRouter extends Component {
  render() {
    return (
    <Switch>
      <Route path="/cards" component={Table} />
      <Route path="/" component={Homepage} />
    </Switch>
    );
  }
};

export default MainRouter;
