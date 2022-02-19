const roleReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_ROLES':
            return action.payload;
        default:
            return state
    }
}

export { roleReducer }