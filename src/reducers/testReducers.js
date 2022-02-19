//REDUCER
const counterReducer = (state = 0, action) => {
    switch (action.type) {

        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
};

const testReducer = (state = 0, action) => {
    switch (action.type) {
        case 'TEST_INCREMENT':
            return state + 1;
        case 'TEST_DECREMENT':
            return state - 1;
        default:
            return state
    }
};

export { counterReducer, testReducer };