import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    page: {
        padding: "1rem"
    }
}));

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                props.isLoggedIn ? (
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

function App(props) {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.page}>
                {props.isLoggedIn ? (
                    <div>
                        <Redirect to="/" />
                        <Route exact path="/" component={Tasks} />
                    </div>
                ) : (
                    <div>
                        <Route path="/login" component={Login} />
                        <PrivateRoute
                            exact
                            path="/"
                            component={Tasks}
                            isLoggedIn={props.isLoggedIn}
                        />
                    </div>
                )}
            </div>
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

export default connect(mapStateToProps)(App);
