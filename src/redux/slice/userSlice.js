import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFeaturedSaloons = createAsyncThunk(
  "user/fetchAllFeaturedSaloons",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-featured-salons`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if(response.status !== 200){
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch featured salons");
      }
      return data.salons;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch featured salons");
    }
    }
);

export const fetchAllCategories = createAsyncThunk(
  "user/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-all-categories`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to fetch categories");
        }
        return data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch categories");
    }
    }
);

export const fetchHomeSaloonsByCategory = createAsyncThunk(
  "user/fetchHomeSaloonsByCategory",
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-home-salons`,{
          params: { category },
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        console.log("API Response for Home Saloons by Category:", data);
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to fetch saloons by category");
        }
        return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch saloons by category");
    }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        salons: [],
        categories: [],
        homeSaloonsByCategory: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFeaturedSaloons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllFeaturedSaloons.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = action.payload;
            })
            .addCase(fetchAllFeaturedSaloons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchHomeSaloonsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeSaloonsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.homeSaloonsByCategory = action.payload;
            })
            .addCase(fetchHomeSaloonsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;