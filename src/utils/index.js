import { intersection } from 'lodash';

export function isArrayWithLength(arr) {
    return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes) {
    let role = JSON.parse(localStorage.user_details).userType;
    return routes.filter(({ permission }) => {
        if(permission.includes(role)) return true;
    })
}