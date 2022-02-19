const managerReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_MANAGERS':
            return action.payload;
        default:
            return state
    }
}

export { managerReducer }