import { apipaths } from "../api/apiPaths"
import { getResponse } from "../api/apiResponse"
import { dateFormatHandler } from "./commonAction";

const roleListAction = () => async (dispatch) => {
    const { data, statusText, status } = await getResponse(apipaths.listroles);
    if (statusText === "OK", status === 200) {
        let roles = data.data.roles;
        roles.map(role => {
            role.enable = parseInt(role.enable) === 1 ? "Yes" : "No"
            // role.role_access.map(role_access => {
            //     role.role_access_string = role.role_access_string ? role.role_access_string + role_access.manager.manager_name
            //         + ` (${role_access.mode})` : role_access.manager.manager_name
            //         + ` (${role_access.mode})` + ", "
            // })

            role.role_access_string = role.role_access.map((access, i) => {
                // eslint-disable-next-line no-useless-concat
                let last = (role.role_access).length - 1 === i ? true : false;
                console.log(last)
                let str = access.manager.manager_name + ` (${access.mode})`;
                if (last === false) {
                    str = str + " ,"
                }
                return str;
            })

            // role.role_access_string = role.role_access_string.toString()

            role.updated_at = dateFormatHandler(role.updated_at);
            role.created_at = dateFormatHandler(role.created_at);
        })
        dispatch({ type: "ADD_ROLES", payload: roles });
        dispatch({ type: "ADD_MANAGERS", payload: data.data.managers })
    }

}

export { roleListAction }