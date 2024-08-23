// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Buat fungsi asinkron untuk mengambil data dari API
export const fetchApiData = createAsyncThunk("api/product", async () => {
    const response = await fetch("http://localhost:4000/api/productvariants");
    const data = await response.json();
    return data;
});

const apiSlice = createSlice({
    name: "apiProduct",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApiData.fulfilled, (state: any, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiData.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default apiSlice.reducer;
