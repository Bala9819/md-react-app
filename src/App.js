import React, { Component } from "react";
import './App.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./context/UserContext";

class App extends Component {

  render(){
      return (
        <UserContextProvider>
          <Header />
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </UserContextProvider>
      );
  }
}

const authUser = {
  authorised: localStorage.getItem('loggedInStatus') ? true : false
}

const PublicRoute = ({ component: PageComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser.authorised ? (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        ) : (
          <PageComponent {...props} />
        )}
    />
  );
};

const PrivateRoute = ({ component: PageComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser.authorised ? (
          <PageComponent {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
    />
  );
};

export default App;
