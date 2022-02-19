const initialState = {
    software: [],
    hardware: []
}

function addInventoryReducer(state = initialState, action) {
    const payload = action.payload;
    switch (action.type) {
        case 'ADD_INVENTORY_ACTION':
            if (payload.inventoryType === "software")
                return {
                    ...state,
                    software: payload.inventory,
                    ...payload
                }
            else
                return {
                    ...state,
                    hardware: payload.inventory,
                    ...payload
                }

        default:
            return state
    }
}

export { addInventoryReducer }