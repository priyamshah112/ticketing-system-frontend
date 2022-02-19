const addTicketsAction = (tickets) => (dispatch) => {
    if (!tickets) return null;
    dispatch({ type: "ADD_TICKETS_ACTION", payload: tickets })
}

export { addTicketsAction }