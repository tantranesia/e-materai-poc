import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({component: Login, restricted, ...rest}) {
    const token = localStorage.getItem("token")
    return (
        <Route {...rest} render={props => (
            token && restricted ?
                <Redirect to="/home" />
            : <Login {...props} />
        )} />
    );
};

export default PublicRoute
