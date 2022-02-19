const addUserDetailsAction = (data) => (dispatch) => {
    if (data.token) localStorage.setItem("authToken", data.token); 
    localStorage.setItem("user_details", JSON.stringify(data));
    dispatch({ type: "ADD_USER_DETAILS", payload: data })

}

const getUserLists = (data) => async (dispatch) => {
    if(!data) return null;
    return dispatch({ type: "GET_USER_LIST", payload: data });
}
 
export { addUserDetailsAction, getUserLists };
