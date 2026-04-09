import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "../../utils/HandleErrors";
import { getNearbySalons } from "../../api/salonApi";
import { getCategories } from "../../api/categoryApi";
import { getHomeIndependentProfessionals } from "../../api/independentProApi";





const DUMMY_CATEGORIES = [
  { _id: 'c1', name: 'coloring' },
  { _id: 'c2', name: 'massage' },
  { _id: 'c3', name: 'spa' },
  { _id: 'c4', name: 'waxing' },
  { _id: 'c5', name: 'nails' },
  { _id: 'c6', name: 'makeup' },
  { _id: 'c7', name: 'facial' },
  { _id: 'c8', name: 'skin' },
  { _id: 'c9', name: 'hair' },
];


const DUMMY_SALONS = [
  {
    _id: 'd1', shopName: 'Glamour Studio', salonCategory: 'Luxury Salon', distance: '1.2', rating: '4.9', reviewCount: '120',
    galleryImages: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500'],
    popularServices: [{ name: 'Hair Styling', price: 499 }, { name: 'Facial', price: 999 }, { name: 'Manicure', price: 399 }]
  },
  {
    _id: 'd2', shopName: 'The Royal Barbers', salonCategory: 'Men\'s Grooming', distance: '0.8', rating: '4.8', reviewCount: '85',
    galleryImages: ['https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500'],
    popularServices: [{ name: 'Beard Trim', price: 199 }, { name: 'Classic Cut', price: 299 }, { name: 'Hair Color', price: 599 }]
  },
  {
    _id: 'd3', shopName: 'Bliss Spa & Wellness', salonCategory: 'Wellness Center', distance: '2.5', rating: '4.7', reviewCount: '210',
    galleryImages: ['https://images.unsplash.com/photo-1544161515-4ae6b908689e?w=500'],
    popularServices: [{ name: 'Full Body Massage', price: 1499 }, { name: 'Deep Tissue', price: 1999 }]
  },
  {
    _id: 'd4', shopName: 'Elite Hair Lounge', salonCategory: 'Unisex Salon', distance: '1.5', rating: '4.6', reviewCount: '340',
    galleryImages: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500'],
    popularServices: [{ name: 'Bridal Makeup', price: 5000 }, { name: 'Hair Extensions', price: 2500 }]
  }
];

const DUMMY_PROS_CONSTANT = [
  {
    _id: "dp-1",
    user: { name: "Ayesha Professional", gender: "Female" },
    experienceYears: 6,
    specializations: ["Bridal Makeup", "Hair Styling"],
    avgRating: 4.8,
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    availabilityStatus: "available",
    location: { radiusInKm: 10 }
  },
  {
    _id: "dp-2",
    user: { name: "Rohan Barber", gender: "Male" },
    experienceYears: 4,
    specializations: ["Beard Grooming", "Head Massage"],
    avgRating: 4.7,
    profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    availabilityStatus: "busy",
    location: { radiusInKm: 5 }
  },
  {
    _id: "dp-3",
    user: { name: "Mehak Beauty", gender: "Female" },
    experienceYears: 8,
    specializations: ["Skin Therapy", "Facial"],
    avgRating: 4.9,
    profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    availabilityStatus: "available",
    location: { radiusInKm: 15 }
  },
  {
    _id: "dp-4",
    user: { name: "Zoya Stylist", gender: "Female" },
    experienceYears: 5,
    specializations: ["Nail Art", "Hair Coloring"],
    avgRating: 4.6,
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    availabilityStatus: "available",
    location: { radiusInKm: 8 }
  },
  {
    _id: "dp-5",
    user: { name: "Kabir Wellness", gender: "Male" },
    experienceYears: 10,
    specializations: ["Deep Tissue Massage", "Yoga Alignment"],
    avgRating: 5.0,
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    availabilityStatus: "available",
    location: { radiusInKm: 20 }
  },
  {
    _id: "dp-6",
    user: { name: "Sanya Glamour", gender: "Female" },
    experienceYears: 3,
    specializations: ["Party Makeup", "Draping"],
    avgRating: 4.4,
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    availabilityStatus: "available",
    location: { radiusInKm: 12 }
  },
  {
    _id: "dp-7",
    user: { name: "Manish Grooming", gender: "Male" },
    experienceYears: 7,
    specializations: ["Precision Haircut", "Scalp Treatment"],
    avgRating: 4.8,
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    availabilityStatus: "busy",
    location: { radiusInKm: 6 }
  },
  {
    _id: "dp-8",
    user: { name: "Riya Aesthetic", gender: "Female" },
    experienceYears: 6,
    specializations: ["Anti-Aging Facial", "Waxing"],
    avgRating: 4.7,
    profilePhoto: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop",
    availabilityStatus: "available",
    location: { radiusInKm: 10 }
  }
];

// new working code
export const fetchAllCategories = createAsyncThunk(
  "user/fetchAllCategories",
  async (gender = "unisex", thunkAPI) => {
    try {
      const res = await getCategories(gender);
      const categories = Array.isArray(res) ? res : (res?.categories || []);
      return categories.length > 0 ? categories : DUMMY_CATEGORIES;
    } catch (error) {
      return DUMMY_CATEGORIES;
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
<<<<<<< HEAD
      const res = await getNearbySalons({ lat, lng, category });
      const salons = Array.isArray(res) ? res : (res?.salons || []); 
      // Force merge for a full grid
      return [...salons, ...DUMMY_SALONS].slice(0, 10);
=======

      // console.log("API PARAMS:", params);

      const res = await getNearbySalons(params);

      // console.log("API res:", res);

      return {
        salons: res.data || [],
        page: res.page || 1,
        totalPages: res.totalPages || 1,
      };

>>>>>>> 950bafbb85d9aa9da4728eb94ee0fea36ea64ea1
    } catch (err) {
      return DUMMY_SALONS;
    }
  }
);

<<<<<<< HEAD


=======
import { getHomeIndependentProfessionals } from "../../api/independentProApi";
>>>>>>> 950bafbb85d9aa9da4728eb94ee0fea36ea64ea1
// new code
export const fetchHomeIndependentProfessionals = createAsyncThunk(
  "user/fetchIndependentProfessionals",
  async ({ lat, lng, category }, { rejectWithValue }) => {
    try {
      const res = await getHomeIndependentProfessionals({ lat, lng, category });
      const pros = res?.data?.data || res?.data || res;
      const apiPros = Array.isArray(pros) ? pros : [];
      return [...apiPros, ...DUMMY_PROS_CONSTANT]; // Ensure DUMMY_PROS is accessible
    } catch (err) {
      return DUMMY_PROS_CONSTANT;
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

      const salons = Array.isArray(res) ? res : (res?.salons || []);
      return [...salons, ...DUMMY_SALONS].slice(0, 10);
    } catch (err) {
      return DUMMY_SALONS;
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
  async (saloonId, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-salon/${saloonId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status !== 200) {
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

export const fetchServiceItemByCategory = createAsyncThunk(
  "user/fetchServiceItemByCategory",
  async ({ salonId, categoryId }, thunkAPI) => {
    console.log("Fetching Service Items for Salon ID:", salonId, "Category ID:", categoryId);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/get-serviceItems-by-category/${salonId}/${categoryId}`, {

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      if (response.status !== 200) {
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
    unisexSalons: [], // ✅ NEW
    unisexLoading: false,

    // ✅ NEW
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
<<<<<<< HEAD
=======
        // state.nearbySalons = [];   // ✅ always array
>>>>>>> 950bafbb85d9aa9da4728eb94ee0fea36ea64ea1
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
      })
      .addCase(fetchUnisexNearbySalons.fulfilled, (state, action) => {
        state.unisexLoading = false;
        state.unisexSalons = action.payload;
      })
      .addCase(fetchUnisexNearbySalons.rejected, (state) => {
        state.unisexLoading = false;
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