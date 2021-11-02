import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({component: Distributor, ...rest}) {
    const token = localStorage.getItem('token')
    return (
        <Route {...rest} render={props => (
            token ?
                <Distributor {...props} />
            : <Redirect to="/login" />
        )} />
    )
}

export default PrivateRoute
