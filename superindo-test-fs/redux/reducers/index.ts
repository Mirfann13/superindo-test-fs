// rootReducer.js
import { combineReducers } from "redux";
import apiSlice from "@/apiSlice";
import selectedProductSlice from "@/selectedProductSlice";
import transactionsSlice from "@/transactionsSlice";

const rootReducer = combineReducers({
    apiData: apiSlice,
    // reducers lainnya
    selectedProduct: selectedProductSlice,
    transactions: transactionsSlice,
});

export default rootReducer;
