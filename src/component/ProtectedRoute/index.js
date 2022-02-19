import React from "react";
import { Route, Redirect } from "react-router-dom"; 

function ProtectedRoute({ component: Component, ...rest }) { 
	return (
		<Route
			{...rest}
			render={(props) => { 
				let token = localStorage.authToken;
				if (token) {
					return <Component history={props.history}/>;
				} else {
					return (
						<Redirect to={{ pathname: "/", state: { from: props.location } }} />
					);
				}
			}}
		/>
	);
}

export default ProtectedRoute;
