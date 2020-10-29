import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';

import EmailVerify from './components/LoginForm/EmailVerify';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Resetpassword from './components/ResetPassword/ResetPassword';
import { makeStyles } from "@material-ui/core/styles";

import AuthenticatedRoute from './components/AuthenticatedRoute';
import AppLayout from './components/AppLayout';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

function App() {

  const ForbiddenPage = props => {
    return (
      <div>
        Forbidden page
      </div>
    );
  };

  const NotFoundPage = props => {

    return (
      <div>
        page nor found
      </div>
    );
  };

  return (
    <Router>

    <div className="App">
        <div className="container d-flex align-items-center flex-column">

          <Switch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/forbidden" component={ForbiddenPage} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/verify" component={EmailVerify} />
            <Route exact path="/reset" component={Resetpassword} />
            <AuthenticatedRoute path="/" component={AppLayout} />
            <Route
              exact
              path="/"
              render={() => <Redirect to={{ pathname: "/login" }} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
