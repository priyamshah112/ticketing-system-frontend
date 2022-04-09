import React from "react";
import { Route, Redirect } from "react-router-dom"; 
import Header from "../AdminDashboard/header";
import IconTabs from "../AdminDashboard/sidebar";
import Layout from '../layout';

function ProtectedRoute({ component: Component, ...rest }) { 
	let token = localStorage.authToken;
    const userType = JSON.parse(localStorage.user_details).userType;

	if (token) {
		return <Route
			{...rest}
			render={(props) => { 
				if(userType !== 'User')
				{
					return <>		
	
						<Header />
						<IconTabs />
						<Component history={props.history}/>
					</>

				}
				return  <Layout>
							<Component history={props.history}/>
						</Layout>				
			}}
		/>	
	} 
	
	return (
		<Redirect to={{ pathname: "/" }} />
	);
}

export default ProtectedRoute;
