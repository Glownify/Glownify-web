import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardData = createAsyncThunk(
  "salesman/fetchDashboardData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/salesman/dashboard-stats`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        const data = res.data;
        if (res.status !== 200) {
          return thunkAPI.rejectWithValue("Failed to fetch dashboard data");
        }
        return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    }
    }
);

const salesmanSlice = createSlice({
    name: "salesman",
    initialState: {
        dashboardData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDashboardData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.loading = false;
            state.dashboardData = action.payload;
        })
        .addCase(fetchDashboardData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default salesmanSlice.reducer;