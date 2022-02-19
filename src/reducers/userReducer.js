const userLoginReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER_DETAILS':
            return action.payload;
        default:
            return state
    }
}

const userListReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_LIST':
            return action.payload;
        default:
            return state
    }
}

export { userLoginReducer, userListReducer }