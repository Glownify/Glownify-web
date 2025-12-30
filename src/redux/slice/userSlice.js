import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "../../utils/HandleErrors";

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
        return handleAxiosError(error, thunkAPI);
      }
      return data.salons;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
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
          return handleAxiosError(error, thunkAPI);
        }
        return data.categories;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
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
          return handleAxiosError(error, thunkAPI);
        }
        return data.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
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
        return handleAxiosError(error, thunkAPI);
      }
      return data.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
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
          return handleAxiosError(error, thunkAPI);
        }
        return data.salons;
    } catch (error) {
      console.log("Error fetching salons by category:", error);
      return handleAxiosError(error, thunkAPI);
    }
    }
);

export const fetchAllStates = createAsyncThunk(
  "superadmin/fetchAllStates",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/state-city/get-all-states`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.states; // Assuming the API returns { states: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllCitiesByStateId = createAsyncThunk(
  "superadmin/fetchAllCitiesByStateId",
  async (stateId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/state-city/get-cities-by-state/${stateId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.cities; // Assuming the API returns { cities: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchServiceItemByCategory = createAsyncThunk(
  "user/fetchServiceItemByCategory",
  async ({ salonId, categoryId }, thunkAPI) => {
    console.log("Fetching Service Items for Salon ID:", salonId, "Category ID:", categoryId);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-serviceItems-by-category/${salonId}/${categoryId}`,{
        
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return handleAxiosError(error, thunkAPI);
        }
        return data.services;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
    }
);

export const createBooking = createAsyncThunk(
  "user/createBooking",
  async (bookingData, thunkAPI) => {
    console.log("Creating booking with data:", bookingData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/booking/create-booking`, bookingData,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if(response.status !== 200){
        return handleAxiosError(error, thunkAPI);
      }
      return data.booking;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
    }
);

export const fetchUserBookings = createAsyncThunk(
  "user/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/booking/get-my-bookings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.bookings;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
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
        states: [],
        cities: [],
        bookings: [],
        saloonDetails: null,
        selectedCategory: "women",
        serviceItems: [],
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
            })
            .addCase(fetchAllStates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllStates.fulfilled, (state, action) => {
                state.loading = false;
                state.states = action.payload;
            })
            .addCase(fetchAllStates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllCitiesByStateId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCitiesByStateId.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchAllCitiesByStateId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchServiceItemByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceItemByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.serviceItems = action.payload;
            })
            .addCase(fetchServiceItemByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { setSelectedCategory, setLocation } = userSlice.actions;
export default userSlice.reducer;