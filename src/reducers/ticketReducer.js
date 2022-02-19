const ticketListReducer = (state=[], action) => {
    switch(action.type){
        case "ADD_TICKETS_ACTION":
            return action.payload;
        default:
            return state;
    }
}

export { ticketListReducer }