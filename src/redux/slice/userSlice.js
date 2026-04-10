import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "../../utils/HandleErrors";
import { getNearbySalons, getSalonById, getSalonReviews } from "../../api/salonApi";




import { getCategories } from "../../api/categoryApi";
// new working code
export const fetchAllCategories = createAsyncThunk(
  "user/fetchAllCategories",
  async (gender = "unisex", thunkAPI) => {
    try {
      const data = await getCategories(gender);
      return data.categories;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);



//new code 
// export const fetchNearbySalons = createAsyncThunk(
//   "user/fetchNearbySalons",
//   async ({ lat, lng, category, radius = 50, page = 1, limit = 10 }, { rejectWithValue }) => {
//     try {
//       const res = await getNearbySalons({ lat, lng, category, radius, page, limit });
//       // return res.data; // 👈 only salons array
//       return res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed");
//     }
//   }
// );
// export const fetchNearbySalons = createAsyncThunk(
//   "user/fetchNearbySalons",
//   async (
//     { lat, lng, category, radius = 50, page = 1, limit = 10 },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await getNearbySalons({
//         lat,
//         lng,
//         category,
//         radius,
//         page,
//         limit,
//       });

//       return res.data; // ✅ pura response
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Failed");
//     }
//   }
// );
export const fetchNearbySalons = createAsyncThunk(
  "user/fetchNearbySalons",
  async (params, { rejectWithValue }) => {
    try {

      // console.log("API PARAMS:", params);

      const res = await getNearbySalons(params);

      // console.log("API res:", res);

      return {
        salons: res.data || [],
        page: res.page || 1,
        totalPages: res.totalPages || 1,
      };

    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed");
    }
  }
);

import { getHomeIndependentProfessionals } from "../../api/independentProApi";
// new code
export const fetchHomeIndependentProfessionals = createAsyncThunk(
  "user/fetchIndependentProfessionals",
  async ({ lat, lng, category }, { rejectWithValue }) => {
    try {
      const res = await getHomeIndependentProfessionals({ lat, lng, category });

      // console.log("Home Independent PRO API:", res);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed");
    }
  }
);


// Unisex salons for Home page (new code)
export const fetchUnisexNearbySalons = createAsyncThunk(
  "user/fetchUnisexNearbySalons",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const res = await getNearbySalons({
        lat,
        lng,
        category: "unisex",
      });

      // console.log("UNISEX API:", res);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed");
    }
  }
);




export const fetchAllFeaturedSaloons = createAsyncThunk(
  "user/fetchAllFeaturedSaloons",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-featured-salons`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.salons;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const getSaloonDetailsById = createAsyncThunk(
  "user/getSaloonDetailsById",
  async ({ salonId, lat, lng }, thunkAPI) => {
    try {
      const data = await getSalonById({ salonId, lat, lng });
      const s = data.salon;

      // Normalize API fields to match UI field names used throughout the component
      const firstHours = s.openingHours?.[0];
      return {
        ...s,
        homeService: s.offersHomeService ?? false,
        aboutUs: s.about || "",
        isOpen: s.isOpenNow ?? false,
        hours: firstHours ? `${firstHours.start} - ${firstHours.end}` : null,
        distance: s.distanceInMeters
          ? (s.distanceInMeters / 1000).toFixed(1)
          : null,
        coverImage: s.galleryImages?.[0] || null,
        rating: null,        // comes from reviews API
        reviewCount: null,   // comes from reviews API
      };
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

// ─── New: Fetch salon reviews + rating summary ──────────────────────────────
export const fetchSalonReviews = createAsyncThunk(
  "user/fetchSalonReviews",
  async ({ salonId, page = 1, limit = 5 }, thunkAPI) => {
    try {
      const data = await getSalonReviews({ salonId, page, limit });
      // data = { success, page, totalPages, count, summary: { avgRating, totalReviews }, reviews }
      return data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllSalonsByCategory = createAsyncThunk(
  "user/fetchAllSalonsByCategory",
  async ({ category, lat, lng }, thunkAPI) => {
    console.log("Fetching All Saloons for category:", category, "at lat:", lat, "lng:", lng);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-all-salons-by-category`, {
        params: { category, lat, lng },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("API Response:", response);
      const data = response.data;
      console.log("API Response for All Saloons by Category:", data.salons);
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.salons;
    } catch (error) {
      console.log("Error fetching salons by category:", error);
      return handleAxiosError(error, thunkAPI);
    }
  }
)




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

export const fetchSalonServiceCategories = createAsyncThunk(
  "user/fetchSalonServiceCategories",
  async (salonId, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories/salon/${salonId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.data; // Array of categories
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchSalonServiceItems = createAsyncThunk(
  "user/fetchSalonServiceItems",
  async ({ salonId, categoryId, serviceMode }, thunkAPI) => {
    // console.log("Fetching Service Items for Salon ID:", salonId, "Category ID:", categoryId, "Mode:", serviceMode);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service-items/salon/${salonId}`, {
        params: { serviceCategoryId: categoryId, serviceMode },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.data; // data.data contains the array of services (formattedServices from backend)
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
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/booking/create-booking`, bookingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status !== 200) {
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


export const fetchAllSalonsforhomeServices = createAsyncThunk(
  "user/fetchAllSalonsforhomeServices",
  async ({ category, lat, lng }, thunkAPI) => {
    console.log("Fetching All Saloons for home services category:", category, "at lat:", lat, "lng:", lng);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-home-salons`, {
        params: { category, lat, lng },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response for home services:", response);
      const data = response.data;
      console.log("API Response for All Saloons by Category:", data.salons);
      if (response.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.data;
    } catch (error) {
      console.log("Error fetching salons by category:", error);
      return handleAxiosError(error, thunkAPI);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    nearbySalons: [],
    salonsLoading: false,
    categories: [],
    categoriesLoading: false,
    independentProfessionals: [],
    homeLoading: false,
    lat: null,
    lng: null,
    unisexSalons: [],
    unisexLoading: false,

    page: 1,
    totalPages: 1,
    hasMore: true,

    featuredSalons: [],
    homeSaloonsByCategory: [],
    salons: [],
    states: [],
    cities: [],
    bookings: [],
    salonsforhomeServices: [],
    saloonDetails: null,
    selectedCategory: "women",
    serviceItems: [],
    loading: false,
    detailsLoading: false,
    servicesLoading: false,
    error: null,

    // ─── Categories specific to a salon ──────────────────────────────────
    salonCategories: [],
    salonCategoriesLoading: false,

    // ─── Reviews ───────────────────────────────────────────────────────────
    salonReviews: [],           // array of review objects
    reviewSummary: null,        // { avgRating, totalReviews }
    reviewsLoading: false,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },

    clearSalons: (state) => {
      state.nearbySalons = [];
      state.page = 1;
      state.hasMore = true;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })
      .addCase(fetchNearbySalons.pending, (state) => {
        state.salonsLoading = true;
        // state.nearbySalons = [];   // ✅ always array
      })
      // 
      .addCase(fetchNearbySalons.fulfilled, (state, action) => {
        const { salons = [], page = 1, totalPages = 1 } = action.payload;

        if (page === 1) {
          state.nearbySalons = salons;
        } else {
          state.nearbySalons = [...state.nearbySalons, ...salons];
        }

        state.page = page;
        state.totalPages = totalPages;
        state.hasMore = page < totalPages;
        state.salonsLoading = false;
      })
      .addCase(fetchNearbySalons.rejected, (state) => {
        state.salonsLoading = false;
      })
      .addCase(fetchHomeIndependentProfessionals.pending, (state) => {
        state.homeLoading = true;
        state.independentProfessionals = [];
      })
      .addCase(fetchHomeIndependentProfessionals.fulfilled, (state, action) => {
        state.homeLoading = false;
        state.independentProfessionals = action.payload; // ✅ array
      })
      .addCase(fetchHomeIndependentProfessionals.rejected, (state) => {
        state.homeLoading = false;
      })


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
      .addCase(fetchUnisexNearbySalons.pending, (state) => {
        state.unisexLoading = true;
        state.unisexSalons = [];
      })
      .addCase(fetchUnisexNearbySalons.fulfilled, (state, action) => {
        state.unisexLoading = false;
        state.unisexSalons = action.payload;
      })
      .addCase(fetchUnisexNearbySalons.rejected, (state) => {
        state.unisexLoading = false;
      })





      .addCase(getSaloonDetailsById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(getSaloonDetailsById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.saloonDetails = action.payload;
      })
      .addCase(getSaloonDetailsById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload?.message || "Failed to fetch salon details";
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
      .addCase(fetchSalonServiceItems.pending, (state) => {
        state.servicesLoading = true;
        state.error = null;
      })
      .addCase(fetchSalonServiceItems.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.serviceItems = action.payload;
      })
      .addCase(fetchSalonServiceItems.rejected, (state, action) => {
        state.servicesLoading = false;
        state.error = action.payload;
      })
      // ─── fetchSalonServiceCategories ─────────────────────────────────────
      .addCase(fetchSalonServiceCategories.pending, (state) => {
        state.salonCategoriesLoading = true;
      })
      .addCase(fetchSalonServiceCategories.fulfilled, (state, action) => {
        state.salonCategoriesLoading = false;
        state.salonCategories = action.payload || [];
      })
      .addCase(fetchSalonServiceCategories.rejected, (state) => {
        state.salonCategoriesLoading = false;
      })
      // ─── fetchSalonReviews ───────────────────────────────────────────────
      .addCase(fetchSalonReviews.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(fetchSalonReviews.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        state.salonReviews = action.payload.reviews || [];
        state.reviewSummary = action.payload.summary || null;
      })
      .addCase(fetchSalonReviews.rejected, (state) => {
        state.reviewsLoading = false;
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
      })
      .addCase(fetchAllSalonsforhomeServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSalonsforhomeServices.fulfilled, (state, action) => {
        state.loading = false;
        state.salonsforhomeServices = action.payload;
      })
      .addCase(fetchAllSalonsforhomeServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export const { setSelectedCategory, setLocation, clearSalons } = userSlice.actions;
export default userSlice.reducer;