import { getAllProducts } from "@/services";
import { AnyAction } from "redux"; // Import AnyAction
import { ThunkAction } from "redux-thunk"; // Import ThunkAction
import { RootState } from "../reducers";

export const getAllProductsAsync = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch: any) => {
        dispatch({
            type: "getAllProduct/start",
        });
        getAllProducts()
            .then((res) => {
                dispatch(getAllProductsSuccess(res.data));
            })
            .catch((err) => {
                dispatch(getAllProductsFailed(err));
            });
    };
};

export const getAllProductsSuccess = (getAllProducts: any) => ({
    type: "getAllProducts/succes",
    payload: {
        getAllProducts,
    },
});

export const getAllProductsFailed = (error: any) => ({
    type: "getAllProducts/failed",
    payload: {
        error,
    },
});
