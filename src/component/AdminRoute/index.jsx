import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from '../layout';

function AdminRoute({ component: Component, ...rest }) {
    let token = localStorage.authToken;
    if (token) {
        return <Route
            {...rest}
            render={(props) => {
                return (
                    // <Layout>
                    <Component history={props.history} />
                    // </Layout>
                )
            }}
        />
    }

    return (
        <Redirect to={{ pathname: "/" }} />
    );
}

export default AdminRoute;
