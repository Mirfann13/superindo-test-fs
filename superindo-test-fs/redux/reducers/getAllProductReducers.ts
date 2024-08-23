const initialState = {
    products: [],
    loading: false,
    error: "",
};

function getAllProductsReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case "getAllProduct/start":
            return {
                ...state,
                loading: true,
            };
        case "getAllProduct/success":
            return {
                products: payload.getAllProducts,
                loading: false,
                error: "",
            };
        case "getAllProduct/failed":
            return {
                ...state,
                loading: true,
                error: payload.error,
            };
        default:
            return state;
    }
}

export default getAllProductsReducers;
