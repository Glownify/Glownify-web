import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAxiosError } from '../../utils/HandleErrors';


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
      return res.data; 
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, userData);
      return res.data; 
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
     // just remove token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return;
    } catch (error) {
      return handleAxiosError(error, thunkAPI);
    }
  }
);


 const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || {
      _id: "independent_pro_001",
      name: "Independent Pro",
      email: "pro@glownify.com",
      phone: "+1 (555) 123-4567",
      role: "independent_pro",
      status: "ACTIVE",
      isVerified: true,
      governmentId: "GOV-ID-2024-PRO-001",
      __v: 2,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-04-15T10:30:00Z"
    },
    token: localStorage.getItem('token') || "mock_independent_pro_token_12345",
    role: JSON.parse(localStorage.getItem('user'))?.role || "independent_pro",
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;

        // ✅ token stored centrally
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

  export const { logout, clearError } = authSlice.actions;
  export default authSlice.reducer;
