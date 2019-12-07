import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderHistory from "./components/OrderHistory";
import Login from "./components/Login";
import Errorpage from "./components/Errorpage";
import ContactCreate from "./components/ContactCreate";
import ErrorBoundary from "./components/ErrorBoundary";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/orderhistory/:id" component={OrderHistory} />
            <Route exact path="/createuser" component={ContactCreate} />
            <Route exact path="/" component={Login} />
            <Route exact path="/menu/:userid" component={Menu} />
            <Route component={Errorpage} />
          </Switch>
        </ErrorBoundary>
        <Footer />
      </Router>
    </>
  );
}

export default App;
