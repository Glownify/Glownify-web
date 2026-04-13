import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "../../utils/HandleErrors";
import axiosInstance from "../../api/axiosInstance";

export const fetchAllCategories = createAsyncThunk(
  "saloonowner/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/user/get-all-categories");
      return response.data.categories;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllServiceItems = createAsyncThunk(
  "saloonowner/fetchAllServiceItems",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/salon-admin/get-service-items");
      return response.data.services;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createServiceItem = createAsyncThunk(
  "saloonowner/createServiceItem",
  async (serviceData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/salon-admin/create-service-item", serviceData);
      return response.data.service;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const editServiceItem = createAsyncThunk(
  "saloonowner/editServiceItem",
  async ({ serviceId, serviceData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/salon-admin/update-service-item/${serviceId}`, serviceData);
      return response.data.service;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const deleteServiceItem = createAsyncThunk(
  "saloonowner/deleteServiceItem",
  async (serviceId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/salon-admin/delete-service-item/${serviceId}`);
      return serviceId;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllSpecialists = createAsyncThunk(
  "saloonowner/fetchAllSpecialists",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/salon-admin/get-specialists");
      return response.data.specialists;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createSpecialist = createAsyncThunk(
  "saloonowner/createSpecialist",
  async (specialistData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/salon-admin/add-specialist", specialistData);
      return response.data.specialist;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const editSpecialist = createAsyncThunk(
  "saloonowner/editSpecialist",
  async ({ specialistId, specialistData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/salon-admin/update-specialist/${specialistId}`, specialistData);
      return response.data.specialist;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const deleteSpecialist = createAsyncThunk(
  "saloonowner/deleteSpecialist",
  async (specialistId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/salon-admin/delete-specialist/${specialistId}`);
      return specialistId;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "saloonowner/fetchBookings",
  async (params = {}, thunkAPI) => {
    try {
      const { status, bookingType, page = 1, limit = 10 } = params;
      const response = await axiosInstance.get("/bookings/provider", {
        params: { status, bookingType, page, limit }
      });
      return response.data; // { success, bookings, totalBookings, pendingCount, currentPage, totalPages }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "saloonowner/updateBookingStatus",
  async ({ bookingId, status }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/bookings/${bookingId}/status`, { status });
      return { bookingId, status, data: response.data };
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createAddOn = createAsyncThunk(
  "saloonowner/createAddOn",
  async (addOnData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/salon-admin/create-add-on", addOnData);
      return response.data.addOn;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const editAddOn = createAsyncThunk(
  "saloonowner/editAddOn",
  async ({ addOnId, addOnData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/salon-admin/update-add-on/${addOnId}`, addOnData);
      return response.data.addOn;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const deleteAddOn = createAsyncThunk(
  "saloonowner/deleteAddOn",
  async (addOnId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/salon-admin/delete-add-on/${addOnId}`);
      return addOnId;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllAddOns = createAsyncThunk(
  "saloonowner/fetchAllAddOns",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/salon-admin/get-add-ons");
      return response.data.addOns;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllSubscriptions = createAsyncThunk(
  "saloonowner/fetchAllSubscriptions",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/salon-admin/get-subscription-plans");
      return response.data.plans;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchSalonOwnerDashboard = createAsyncThunk(
  "saloonowner/fetchSalonOwnerDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/salons/owner/dashboard");
      return response.data.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

const saloonownerSlice = createSlice({
  name: "saloonowner",
  initialState: {
    serviceItems: [],
    categories: [],
    specialists: [],
    bookings: [],
    totalBookings: 0,
    pendingCount: 0,
    totalPages: 1,
    currentPage: 1,
    addOns: [],
    subscriptions: [],
    dashboardData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchAllServiceItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllServiceItems.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceItems = action.payload;
      })
      .addCase(fetchAllServiceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createServiceItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceItem.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceItems.push(action.payload);
      })
      .addCase(createServiceItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editServiceItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editServiceItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.serviceItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.serviceItems[index] = action.payload;
        }
      })
      .addCase(editServiceItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteServiceItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceItem.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceItems = state.serviceItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteServiceItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSpecialists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSpecialists.fulfilled, (state, action) => {
        state.loading = false;
        state.specialists = action.payload;
      })
      .addCase(fetchAllSpecialists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSpecialist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSpecialist.fulfilled, (state, action) => {
        state.loading = false;
        state.specialists.push(action.payload);
      })
      .addCase(createSpecialist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editSpecialist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSpecialist.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.specialists.findIndex(
          (specialist) => specialist._id === action.payload._id
        );
        if (index !== -1) {
          state.specialists[index] = action.payload;
        }
      })
      .addCase(editSpecialist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSpecialist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSpecialist.fulfilled, (state, action) => {
        state.loading = false;
        state.specialists = state.specialists.filter(
          (specialist) => specialist._id !== action.payload
        );
      })
      .addCase(deleteSpecialist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalBookings = action.payload.totalBookings;
        state.pendingCount = action.payload.pendingCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(b => b._id === action.payload.bookingId);
        if (index !== -1) {
          state.bookings[index].status = action.payload.status;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAddOn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddOn.fulfilled, (state, action) => {
        state.loading = false;
        state.addOns.push(action.payload);
      })
      .addCase(createAddOn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editAddOn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAddOn.fulfilled, (state, action) => {
        state.loading = false;

        if (!action.payload) return;

        const index = state.addOns.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.addOns[index] = action.payload;
        }
      })

      .addCase(editAddOn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddOn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddOn.fulfilled, (state, action) => {
        state.loading = false;
        state.addOns = state.addOns.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteAddOn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllAddOns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAddOns.fulfilled, (state, action) => {
        state.loading = false;
        state.addOns = action.payload;
      })
      .addCase(fetchAllAddOns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSalonOwnerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalonOwnerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchSalonOwnerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saloonownerSlice.reducer;
