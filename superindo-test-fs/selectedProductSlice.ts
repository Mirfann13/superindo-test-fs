// selectedProductSlice.js
import { createSlice } from "@reduxjs/toolkit";

const selectedProductSlice = createSlice({
    name: "selectedProduct",
    initialState: [],
    reducers: {
        selectProduct: (state: any, action) => {
            return action.payload; // Menyimpan data produk yang dipilih
        },
        clearSelectedProduct: (state) => {
            return []; // Menghapus data produk yang dipilih
        },
        removeSelectedProduct: (state) => {
            return []; // Menghapus data produk yang dipilih
        },
    },
});

export const { selectProduct, clearSelectedProduct, removeSelectedProduct } =
    selectedProductSlice.actions;
export default selectedProductSlice.reducer;
