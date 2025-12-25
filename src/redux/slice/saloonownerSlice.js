import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCategories = createAsyncThunk(
  "saloonowner/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/get-all-categories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log("Categories Response Data:", data);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to fetch categories"
        );
      }
      return data.categories; // Assuming the API returns { categories: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch categories"
      );
    }
  }
);


export const fetchAllServiceItems = createAsyncThunk(
  "saloonowner/fetchAllServiceItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/get-service-items`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to fetch services");
        }
        return data.services;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch services");
    }
    }
);

export const createServiceItem = createAsyncThunk(
  "saloonowner/createServiceItem",
  async (serviceData, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/create-service-item`, serviceData,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 201){
          return thunkAPI.rejectWithValue(data.message || "Failed to create service item");
        }
        return data.service;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create service item");
    }
    }
);

export const editServiceItem = createAsyncThunk(
  "saloonowner/editServiceItem",
  async ({ serviceId, serviceData }, thunkAPI) => {
    console.log("Editing Service Item:", serviceId, serviceData);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/update-service-item/${serviceId}`, serviceData,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to edit service item");
        }
        return data.service;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to edit service item");
    }
    }
);

export const deleteServiceItem = createAsyncThunk(
  "saloonowner/deleteServiceItem",
  async (serviceId, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/delete-service-item/${serviceId}`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to delete service item");
        }
        return serviceId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to delete service item");
    }
    }
);

export const fetchAllSpecialists = createAsyncThunk(
  "saloonowner/fetchAllSpecialists",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/salon-admin/get-specialists`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log("Specialists Response Data:", data);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to fetch specialists"
        );
      }
      return data.specialists; // Assuming the API returns { specialists: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch specialists"
      );
    }
  }
);

export const createSpecialist = createAsyncThunk(
  "saloonowner/createSpecialist",
  async (specialistData, thunkAPI) => {
    console.log("Creating Specialist with Data:", specialistData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/salon-admin/add-specialist`,
        specialistData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 201) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to create specialist"
        );
      }
      return data.specialist;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to create specialist"
      );
    }
  }
);

export const editSpecialist = createAsyncThunk(
  "saloonowner/editSpecialist",
  async ({ specialistId, specialistData }, thunkAPI) => {
    console.log("Editing Specialist:", specialistId, specialistData);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/salon-admin/update-specialist/${specialistId}`,
        specialistData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to edit specialist"
        );
      }
      return data.specialist;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to edit specialist"
      );
    }
  }
);

export const deleteSpecialist = createAsyncThunk(
  "saloonowner/deleteSpecialist",
  async (specialistId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/salon-admin/delete-specialist/${specialistId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to delete specialist"
        );
      }
      return specialistId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete specialist"
      );
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "saloonowner/fetchBookings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/salon-admin/get-bookings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to fetch bookings"
        );
      }
      return data.bookings; // Assuming the API returns { bookings: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch bookings"
      );
    }
  }
);

export const createAddOn = createAsyncThunk(
  "saloonowner/createAddOn",
  async (addOnData, thunkAPI) => {
    try {
      console.log("Creating Add-On Service with Data:", addOnData);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/create-add-on`, addOnData,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 201){
          return thunkAPI.rejectWithValue(data.message || "Failed to create add-on service");
        }
        return data.addOn;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create add-on service");
    }
    }
);

export const editAddOn = createAsyncThunk(
  "saloonowner/editAddOn",
  async ( {addOnId, addOnData }, thunkAPI) => {
    console.log("Editing Add-On Service:", addOnId, addOnData);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/update-add-on/${addOnId}`, addOnData,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to edit add-on service");
        }
        return data.addOn;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to edit add-on service");
    }
    }
);

export const deleteAddOn = createAsyncThunk(
  "saloonowner/deleteAddOn",
  async (addOnId, thunkAPI) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/delete-add-on/${addOnId}`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to delete add-on service");
        }
        return addOnId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to delete add-on service");
    }
    }
);

export const fetchAllAddOns = createAsyncThunk(
  "saloonowner/fetchAllAddOns",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/salon-admin/get-add-ons`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        console.log("Fetch All Add-Ons Response:", response);
        const data = response.data;
        if(response.status !== 200){
          return thunkAPI.rejectWithValue(data.message || "Failed to fetch add-on services");
        }
        return data.addOns;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch add-on services");
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
    addOns: [],
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
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
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
            });
    },
});

export default saloonownerSlice.reducer;