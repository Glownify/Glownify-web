import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "../../utils/HandleErrors";

// In-memory storage for mock data
let mockSubscriptionPlans = [
  {
    _id: "plan_1",
    name: "Basic Plan",
    price: 10,
    durationInDays: 30,
    features: ["Feature 1", "Feature 2"],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "plan_2",
    name: "Premium Plan",
    price: 100,
    durationInDays: 365,
    features: ["Feature A", "Feature B", "Feature C"],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

let mockUsers = [
  { _id: "user_1", name: "John Doe", email: "john@example.com", phone: "+1234567890", isBlocked: false, role: "customer", createdAt: "2024-01-15" },
  { _id: "user_2", name: "Jane Smith", email: "jane@example.com", phone: "+0987654321", isBlocked: true, role: "customer", createdAt: "2024-01-20" },
  { _id: "user_3", name: "Bob Johnson", email: "bob@example.com", phone: "+1122334455", isBlocked: false, role: "customer", createdAt: "2024-02-01" },
  { _id: "user_4", name: "Alice Brown", email: "alice@example.com", phone: "+5544332211", isBlocked: false, role: "customer", createdAt: "2024-02-10" },
  { _id: "user_5", name: "Charlie Wilson", email: "charlie@example.com", phone: "+9988776655", isBlocked: false, role: "customer", createdAt: "2024-02-15" }
];

let mockSalons = [
  { _id: "salon_1", name: "Luxe Barbers", email: "luxe@example.com", phone: "+1111111111", isApproved: true, isActive: true, subscription: { plan: "Premium Plan", status: "active" }, createdAt: "2024-01-10" },
  { _id: "salon_2", name: "Bloom Studio", email: "bloom@example.com", phone: "+2222222222", isApproved: false, isActive: false, subscription: { plan: "Basic Plan", status: "pending" }, createdAt: "2024-01-12" },
  { _id: "salon_3", name: "Style Haven", email: "style@example.com", phone: "+3333333333", isApproved: true, isActive: true, subscription: { plan: "Premium Plan", status: "active" }, createdAt: "2024-01-18" },
  { _id: "salon_4", name: "Glamour Spot", email: "glamour@example.com", phone: "+4444444444", isApproved: false, isActive: false, subscription: { plan: "Basic Plan", status: "expired" }, createdAt: "2024-01-25" },
  { _id: "salon_5", name: "Elite Cuts", email: "elite@example.com", phone: "+5555555555", isApproved: true, isActive: false, subscription: { plan: "Premium Plan", status: "suspended" }, createdAt: "2024-02-01" }
];

let mockProfessionals = [
  { _id: "pro_1", name: "Sarah Miller", email: "sarah@example.com", phone: "+6666666666", isApproved: true, isActive: true, specialty: "Hair Styling", createdAt: "2024-01-08" },
  { _id: "pro_2", name: "Mike Davis", email: "mike@example.com", phone: "+7777777777", isApproved: false, isActive: false, specialty: "Barbering", createdAt: "2024-01-15" },
  { _id: "pro_3", name: "Emma Wilson", email: "emma@example.com", phone: "+8888888888", isApproved: true, isActive: true, specialty: "Nail Art", createdAt: "2024-01-22" },
  { _id: "pro_4", name: "James Brown", email: "james@example.com", phone: "+9999999999", isApproved: false, isActive: false, specialty: "Makeup", createdAt: "2024-02-05" },
  { _id: "pro_5", name: "Lisa Anderson", email: "lisa@example.com", phone: "+1212121212", isApproved: true, isActive: true, specialty: "Skincare", createdAt: "2024-02-12" }
];

export const fetchDashboardData = createAsyncThunk(
  "superadmin/fetchDashboardData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/dashboard-stats`,
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      if (res.status !== 200) {
        return handleAxiosError(error, thunkAPI);
      }
      return data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllSalons = createAsyncThunk(
  "superadmin/fetchAllSalons",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/getAllSalons`,
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
      return data.salons; // Assuming the API returns { salons: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "superadmin/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/getAllCategories`,
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
      return data.categories; // Assuming the API returns { categories: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const addCategory = createAsyncThunk(
  "superadmin/addCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/create-category`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.category; // Assuming the API returns { category: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "superadmin/updateCategory",
  async ({ categoryId, categoryData }, thunkAPI) => {
    console.log("Updating category:", categoryId, categoryData);
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/super-admin/update-category/${categoryId}`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.category; // Assuming the API returns { category: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const deleteCategory = createAsyncThunk(

  "superadmin/deleteCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/delete-category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return categoryId;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const approveSalon = createAsyncThunk(
  "superadmin/approveSalon",
  async (salonId, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/approve-salon/${salonId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const rejectSalon = createAsyncThunk(
  "superadmin/rejectSalon",
  async ({ salonId, reason }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/reject-salon/${salonId}`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(

  "superadmin/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/get-all-users`,
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
      return data.users; // Assuming the API returns { users: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const blockUser = createAsyncThunk(
  "superadmin/blockUser",
  async (userId, thunkAPI) => {
    console.log("Blocking user with ID (thunk):", userId);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/super-admin/block-user/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 204) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.user; // Assuming the API returns { user: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const activateUser = createAsyncThunk(
  "superadmin/activateUser",
  async (userId, thunkAPI) => {
    console.log("Activating user with ID (thunk):", userId);
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/super-admin/activate-user/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 204) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.user; // Assuming the API returns { user: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllCities = createAsyncThunk(
  "superadmin/fetchAllCities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/state-city/get-all-cities`,
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

export const createState = createAsyncThunk(
  "superadmin/createState",
  async (stateData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/state-city/create-state`,
        stateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.state; // Assuming the API returns { state: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createCity = createAsyncThunk(
  "superadmin/createCity",
  async (cityData, thunkAPI) => {
    try {
      console.log("Creating city with data:", cityData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/state-city/create-city`,
        cityData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.city; // Assuming the API returns { city: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllSalesExecutives = createAsyncThunk(
  "superadmin/fetchAllSalesExecutives",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/sales-executive/all-sales-executives`,
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
      return data.salesExecutives; // Assuming the API returns { salesExecutives: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createSalesExecutive = createAsyncThunk(
  "superadmin/createSalesExecutive",
  async (formData, thunkAPI) => {
    try {
      console.log("Creating Sales Executive with data (thunk):", formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/sales-executive/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return handleAxiosError(error, thunkAPI);
      }
      return data.salesExecutive; // Assuming the API returns { salesExecutive: {...} }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "superadmin/resetPassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password-superadmin`,
        passwordData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.message; // ✅ success message
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const fetchAllSubscriptions = createAsyncThunk(
  "superadmin/fetchAllSubscriptions",
  async (_, thunkAPI) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      // Mock implementation for development when backend is not available
      if (apiBaseUrl === 'http://localhost:5000') {
        console.log("Using mock implementation for fetching subscriptions");
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Mock subscriptions fetched:", mockSubscriptionPlans);
        return [...mockSubscriptionPlans];
      }
      
      const response = await axios.get(
        `${apiBaseUrl}/super-admin/get-subscription-plans`,
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
      return data.plans; // Assuming the API returns { subscriptions: [...] }
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  "superadmin/deleteSubscription",
  async (subscriptionId, thunkAPI) => {
    try {
      console.log("Deleting subscription with ID:", subscriptionId);
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      // Mock implementation for development when backend is not available
      if (apiBaseUrl === 'http://localhost:5000') {
        console.log("Using mock implementation for subscription deletion");
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Remove from in-memory storage
        mockSubscriptionPlans = mockSubscriptionPlans.filter(plan => plan._id !== subscriptionId);
        
        console.log("Mock subscription deleted:", subscriptionId);
        console.log("Updated plans storage:", mockSubscriptionPlans);
        return subscriptionId;
      }
      
      const response = await axios.delete(
        `${apiBaseUrl}/super-admin/delete-subscription-plan/${subscriptionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      console.log("Subscription deletion response:", response.data);
      return subscriptionId;
    } catch (error) {
      console.error("Subscription deletion error:", error);
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const updateSubscription = createAsyncThunk(
  "superadmin/updateSubscription",
  async ({ subscriptionId, subscriptionData }, thunkAPI) => {
    try {
      console.log("Updating subscription with ID:", subscriptionId, "data:", subscriptionData);
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      // Mock implementation for development when backend is not available
      if (apiBaseUrl === 'http://localhost:5000') {
        console.log("Using mock implementation for subscription update");
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create mock response
        const mockSubscription = {
          _id: subscriptionId,
          ...subscriptionData,
          updatedAt: new Date().toISOString()
        };
        
        // Update in-memory storage
        const index = mockSubscriptionPlans.findIndex(plan => plan._id === subscriptionId);
        if (index !== -1) {
          mockSubscriptionPlans[index] = mockSubscription;
        }
        
        console.log("Mock subscription updated:", mockSubscription);
        console.log("Updated plans storage:", mockSubscriptionPlans);
        return mockSubscription;
      }
      
      const response = await axios.patch(
        `${apiBaseUrl}/super-admin/update-subscription-plan/${subscriptionId}`,
        subscriptionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      const data = response.data;
      console.log("Subscription update response:", data);
      return data.plan || data.subscription || data;
    } catch (error) {
      console.error("Subscription update error:", error);
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const createSubscription = createAsyncThunk(
  "superadmin/createSubscription",
  async (subscriptionData, thunkAPI) => {
    try {
      console.log("Creating subscription with data:", subscriptionData);
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      // Mock implementation for development when backend is not available
      if (apiBaseUrl === 'http://localhost:5000') {
        console.log("Using mock implementation for subscription creation");
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock response
        const mockSubscription = {
          _id: `plan_${Date.now()}`,
          ...subscriptionData,
          createdAt: new Date().toISOString()
        };
        
        // Add to in-memory storage
        mockSubscriptionPlans.push(mockSubscription);
        
        console.log("Mock subscription created:", mockSubscription);
        console.log("Updated plans storage:", mockSubscriptionPlans);
        return mockSubscription;
      }
      
      const response = await axios.post(
        `${apiBaseUrl}/super-admin/create-subscription-plan`,
        subscriptionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log("Subscription creation response:", data);
      return data.plan || data.subscription || data;
    } catch (error) {
      console.error("Subscription creation error:", error);
      return handleAxiosError(error, thunkAPI);
    }
  }
);

const superadminSlice = createSlice({
  name: "superadmin",
  initialState: {
    dashboardData: {
      totalUsers: 128500,
      totalSalons: 842,
      totalProfessionals: 156,
      totalBookings: {
        daily: 245,
        monthly: 7350
      },
      revenue: 1420000,
      subscriptionOverview: {
        active: 680,
        expired: 120,
        pending: 42
      }
    },
    salons: mockSalons,
    categories: [],
    users: mockUsers,
    cities: [],
    states: [],
    salesExecutives: [],
    plans: mockSubscriptionPlans,
    professionals: mockProfessionals,
    message: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Local state management for mock data
    toggleUserBlock: (state, action) => {
      const user = state.users.find(u => u._id === action.payload);
      if (user) {
        user.isBlocked = !user.isBlocked;
      }
    },
    updateSalonStatus: (state, action) => {
      const { salonId, field, value } = action.payload;
      const salon = state.salons.find(s => s._id === salonId);
      if (salon) {
        salon[field] = value;
      }
    },
    updateProfessionalStatus: (state, action) => {
      const { proId, field, value } = action.payload;
      const professional = state.professionals.find(p => p._id === proId);
      if (professional) {
        professional[field] = value;
      }
    },
    addSubscriptionPlan: (state, action) => {
      const newPlan = {
        _id: `plan_${Date.now()}`,
        ...action.payload,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      state.plans.push(newPlan);
    },
    toggleSubscriptionPlan: (state, action) => {
      const plan = state.plans.find(p => p._id === action.payload);
      if (plan) {
        plan.isActive = !plan.isActive;
      }
    },
    updateSubscriptionPlan: (state, action) => {
      const { planId, updatedData } = action.payload;
      const planIndex = state.plans.findIndex(p => p._id === planId);
      if (planIndex !== -1) {
        state.plans[planIndex] = { ...state.plans[planIndex], ...updatedData };
      }
    },
    deleteSubscriptionPlan: (state, action) => {
      const planId = action.payload;
      state.plans = state.plans.filter(p => p._id !== planId);
    },
    updateDashboardStats: (state) => {
      state.dashboardData.totalUsers = state.users.length;
      state.dashboardData.totalSalons = state.salons.length;
      state.dashboardData.totalProfessionals = state.professionals.length;
      state.dashboardData.subscriptionOverview.active = state.plans.filter(p => p.isActive).length;
    }
  },
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
      })
      .addCase(fetchAllSalons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSalons.fulfilled, (state, action) => {
        state.loading = false;
        state.salons = action.payload;
      })
      .addCase(fetchAllSalons.rejected, (state, action) => {
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
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log("Category added:", action.payload);
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index].status = "blocked";
        }
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index].status = "active";
        }
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
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
      .addCase(createState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createState.fulfilled, (state, action) => {
        state.loading = false;
        state.states.push(action.payload);
      })
      .addCase(createState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload);
      })
      .addCase(createCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSalesExecutives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSalesExecutives.fulfilled, (state, action) => {
        state.loading = false;
        state.salesExecutives = action.payload;
      })
      .addCase(fetchAllSalesExecutives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSalesExecutive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalesExecutive.fulfilled, (state, action) => {
        state.loading = false;
        state.salesExecutives.push(action.payload);
      })
      .addCase(createSalesExecutive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null; // ✅ clear old success
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.plans.push(action.payload);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter(plan => plan._id !== action.payload);
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.plans.findIndex(plan => plan._id === action.payload._id);
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      })
      .addCase(approveSalon.fulfilled, (state, action) => {
        const index = state.salons.findIndex(s => s._id === action.payload.salon?._id);
        if (index !== -1) {
          state.salons[index] = action.payload.salon;
        }
      })
      .addCase(rejectSalon.fulfilled, (state, action) => {
        const index = state.salons.findIndex(s => s._id === action.payload.salon?._id);
        if (index !== -1) {
          state.salons[index] = action.payload.salon;
        }
      });

  },
});

export const { 
  toggleUserBlock, 
  updateSalonStatus, 
  updateProfessionalStatus, 
  addSubscriptionPlan, 
  toggleSubscriptionPlan, 
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  updateDashboardStats 
} = superadminSlice.actions;

export default superadminSlice.reducer;
