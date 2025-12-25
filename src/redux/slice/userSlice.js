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
  async ({ category, lat, lng }, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-home-salons`,{
          params: { category, lat, lng },
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to fetch saloons by category");
        }
        return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch saloons by category");
    }
    }
);

export const getSaloonDetailsById = createAsyncThunk(
  "user/getSaloonDetailsById",
  async (saloonId, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-salon/${saloonId}`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data; 
      if(response.status !== 200){
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch saloon details");
      }
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch saloon details");
    }
    }
);

export const fetchAllSalonsByCategory = createAsyncThunk(
  "user/fetchAllSalonsByCategory",
  async ({category,lat,lng}, thunkAPI) => {
    console.log("Fetching All Saloons for category:", category, "at lat:", lat, "lng:", lng);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-all-salons-by-category`,{
        params: { category, lat, lng },
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        // console.log("API Response:", response);
        const data = response.data;
        console.log("API Response for All Saloons by Category:", data.salons);
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to fetch saloons by category");
        }
        return data.salons;
    } catch (error) {
      console.log("Error fetching salons by category:", error);
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch saloons by category");
    }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        featuredSalons: [],
        categories: [],
        homeSaloonsByCategory: [],
        salons: [],
        saloonDetails: null,
        selectedCategory: "women",
        lat: null,
        lng: null,
        loading: false,
        error: null,
    },
    reducers: {
      setSelectedCategory: (state, action) => {
  state.selectedCategory = action.payload;
},
setLocation: (state, action) => {
  state.lat = action.payload.lat;
  state.lng = action.payload.lng;
},

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFeaturedSaloons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllFeaturedSaloons.fulfilled, (state, action) => {
                state.loading = false;
                state.featuredSalons = action.payload;
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
            })
            .addCase(getSaloonDetailsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSaloonDetailsById.fulfilled, (state, action) => {
                state.loading = false;
                state.saloonDetails = action.payload;
            })
            .addCase(getSaloonDetailsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllSalonsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSalonsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = action.payload;
            })
            .addCase(fetchAllSalonsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { setSelectedCategory, setLocation } = userSlice.actions;
export default userSlice.reducer;