import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: null,
    reducers: {
        transactions: (state: any, action) => {
            return action.payload; // Menyimpan data produk yang dipilih
        },
    },
});

export const { transactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
