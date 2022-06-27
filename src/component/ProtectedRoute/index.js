import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminLayout from '../layout/adminLayout/adminlayout';
import UserLayout from '../layout/userLayout/userlayout';

function ProtectedRoute({ component: Component, ...rest }) {

	let token = localStorage.authToken;

	const userType = JSON.parse(localStorage.user_details).userType;
	console.log(userType,"userType")

	if (true) {
		return <Route
			{...rest}
			render={(props) => {
				if (userType !== 'User') {
					return <>
						<AdminLayout>
							<Component history={props.history} />
						</AdminLayout>

					</>

				}
				return<>
				
				<UserLayout>
					<Component history={props.history} />
				</UserLayout>
				</>
				
			}}
		/>
	}

	return (
		<Redirect to={{ pathname: "/" }} />
	);
}

export default ProtectedRoute;
