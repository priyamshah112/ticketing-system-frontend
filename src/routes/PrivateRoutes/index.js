import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { getAllowedRoutes } from "../../utils";
import PrivateRoutesConfig from "../../config/PrivateRoutes"
import MapAllowedRoutes from "../MapAllowedRoutes";

function PrivateRoute({ component: Component, ...rest }) {
	let allowedRoutes = [];
	let token = localStorage.authToken;

	if (token) {
		allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);

	} else {
		return <Redirect to={{ pathname: "/" }} />;
	}

	return (
		<Fragment>
			<MapAllowedRoutes 
				routes={allowedRoutes} 
				basePath="/" 
				isAddNotFound 
		 	/>
		</Fragment>
	);
}

export default PrivateRoute;