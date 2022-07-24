import React, { memo } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'; 
import Error from '../../component/Error';
import AdminLayout from '../../component/layout/AdminLayout';
import UserLayout from '../../component/layout/UserLayout';

function MapAllowedRoutes({routes, basePath, isAddNotFound}) {
    const match = useRouteMatch(basePath);
    return (
    <Switch>
        {
        routes.map((route) => {
            const { 
                path, 
                component: Component,
                children, 
                title,
                permission,
                ...rest 
            } = route;
            return (
                <Route
                    {...rest}
                    key={path}
                    path={path}
                    render={() => {
                        const userType = JSON.parse(localStorage.user_details).userType;
                        if (userType !== 'User') {
                            return <>
                                <AdminLayout>
                                    <Component children={children} />
                                </AdminLayout>

                            </>

                        }
                        else
                        {
                            return <>				
                                <UserLayout>
                                    <Component children={children} />
                                </UserLayout>
                            </>
                        }
                    }}
                />
            )
        })
        }
        {isAddNotFound && <Route exact path="*" component={() => <Error errorMsg="404 | Page Not Found" /> } />}
    </Switch>
    )
}

export default memo(MapAllowedRoutes);