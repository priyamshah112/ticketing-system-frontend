import React from "react";
import { Route, Redirect } from "react-router-dom"; 

function ProtectedRoute({ component: Component, ...rest }) { 
	let token = localStorage.authToken;
	if (token) {
		return <Route
			{...rest}
			render={(props) => { 
				return <Component history={props.history}/>				
			}}
		/>	
	} 
	
	return (
		<Redirect to={{ pathname: "/" }} />
	);
}

export default ProtectedRoute;
