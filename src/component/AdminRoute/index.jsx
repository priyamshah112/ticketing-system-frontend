import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminLayout from '../layout/adminLayout/adminlayout';

function AdminRoute({ component: Component, ...rest }) {
    let token = localStorage.authToken;
    if (token) {
        return <Route
            {...rest}
            render={(props) => {
                return (
                     <AdminLayout>
                    <Component history={props.history} />
                 </AdminLayout>
                )
            }}
        />
    }

    return (
        <Redirect to={{ pathname: "/" }} />
    );
}

export default AdminRoute;
