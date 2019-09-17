import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login"
import Tasks from "./components/Tasks"

const isAuthenticated = false;

const useStyles = makeStyles(theme => ({
  page : {
    padding: '1rem'
  }
}));

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.page}>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path='/' component={Tasks} />
      </div>
    </Router>
  );
}

export default App;
