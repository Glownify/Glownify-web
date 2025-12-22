import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllSaloons = createAsyncThunk(
  'superadmin/fetchAllSaloons',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/super-admin/getAllSaloons`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(data.message || 'Failed to fetch saloons');
        }
      return data.saloons; // Assuming the API returns { saloons: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch saloons');
    }
    }
);

export const fetchAllCategories = createAsyncThunk(
  'superadmin/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/super-admin/getAllCategories`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(data.message || 'Failed to fetch categories');
        }
        return data.categories; // Assuming the API returns { categories: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch categories');
    }
    }
);

export const addCategory = createAsyncThunk(
  'superadmin/addCategory',
  async (categoryData, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/super-admin/create-category`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to add category');
      }
      return data.category; // Assuming the API returns { category: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'superadmin/updateCategory',
  async ({ categoryId, categoryData }, thunkAPI) => {
    console.log("Updating category:", categoryId, categoryData);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/super-admin/update-category/${categoryId}`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to update category');
      }
      return data.category; // Assuming the API returns { category: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update category');
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'superadmin/fetchAllUsers',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/super-admin/get-all-users`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(data.message || 'Failed to fetch users');
        }
        return data.users; // Assuming the API returns { users: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
    }
    }
);

export const blockUser = createAsyncThunk(
  'superadmin/blockUser',
  async (userId, thunkAPI) => {
    console.log("Blocking user with ID (thunk):", userId);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/super-admin/block-user/${userId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 204) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to block user');
      }
      return data.user; // Assuming the API returns { user: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to block user');
    }
  }
);

export const activateUser = createAsyncThunk(
  'superadmin/activateUser',
  async (userId, thunkAPI) => {
    console.log("Activating user with ID (thunk):", userId);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/super-admin/activate-user/${userId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 204) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to activate user');
      }
      return data.user; // Assuming the API returns { user: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to activate user');
    }
  }
);

export const fetchAllCities = createAsyncThunk(
  'superadmin/fetchAllCities',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/state-city/get-all-cities`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(data.message || 'Failed to fetch cities');
        }
        return data.cities; // Assuming the API returns { cities: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch cities');
    }
    }
);

export const fetchAllStates = createAsyncThunk(
  'superadmin/fetchAllStates',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/state-city/get-all-states`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(data.message || 'Failed to fetch states');
        }
        return data.states; // Assuming the API returns { states: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch states');
    }
    }
);

export const createState = createAsyncThunk(
  'superadmin/createState',
  async (stateData, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/state-city/create-state`, stateData, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to add state');
      }
      return data.state; // Assuming the API returns { state: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add state');
    }
  }
);

export const createCity = createAsyncThunk(
  'superadmin/createCity',
  async (cityData, thunkAPI) => {
    try {
      console.log("Creating city with data:", cityData);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/state-city/create-city`, cityData, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to add city');
      }
      return data.city; // Assuming the API returns { city: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add city');
    } 
  }
);

export const fetchAllSalesExecutives = createAsyncThunk(
  'superadmin/fetchAllSalesExecutives',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sales-executive/all-sales-executives`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(data.message || 'Failed to fetch sales executives');
        }
        return data.salesExecutives; // Assuming the API returns { salesExecutives: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch sales executives');
    }
    }
);

export const createSalesExecutive = createAsyncThunk(
  'superadmin/createSalesExecutive',
  async (formData, thunkAPI) => {
    try {
      console.log("Creating Sales Executive with data (thunk):", formData);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/sales-executive/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data;
      if (response.status !== 200 && response.status !== 201) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to add sales executive');
      }
      return data.salesExecutive; // Assuming the API returns { salesExecutive: {...} }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add sales executive');
    } 
  }
);

const superadminSlice = createSlice({
    name: 'superadmin',
    initialState: {
        saloons: [],
        categories: [],
        users: [],
        cities: [],
        states: [],
        salesExecutives: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSaloons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSaloons.fulfilled, (state, action) => {
                state.loading = false;
                state.saloons = action.payload;
            })
            .addCase(fetchAllSaloons.rejected, (state, action) => {
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
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
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
                const index = state.users.findIndex(user => user._id === action.payload._id);
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
                const index = state.users.findIndex(user => user._id === action.payload._id);
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
            });
    }
});

export default superadminSlice.reducer;