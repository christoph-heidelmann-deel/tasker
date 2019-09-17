import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {   BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login"
import Tasks from "./components/Tasks"

const isAuthenticated = false;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tasker
          </Typography>
        </Toolbar>
      </AppBar>
      <Route path="/login" component={Login} />
      <PrivateRoute exact path='/' component={Tasks} />
    </Router>
  );
}

export default App;
