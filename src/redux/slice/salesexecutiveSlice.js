import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllSalesman = createAsyncThunk(
  'salesexecutive/fetchAllSalesmen',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/salesman/get-all-salesman`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data=res.data; 
      if(res.status!==200){
        return thunkAPI.rejectWithValue('Failed to fetch salesmen');
      }
      return data.salesman;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch salesmen'
      );
    }
    }
);

export const createSalesman = createAsyncThunk(
    'salesexecutive/createSalesman',
    async (formData, thunkAPI) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/salesman/register-salesman`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to create salesman'
            );
        }
    }
);

    const salesexecutiveSlice = createSlice({
    name: 'salesexecutive',
    initialState: {
        salesman: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllSalesman.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllSalesman.fulfilled, (state, action) => {
            state.loading = false;
            state.salesman = action.payload;
        })
        .addCase(fetchAllSalesman.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createSalesman.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createSalesman.fulfilled, (state, action) => {
            state.loading = false;
            state.salesman.push(action.payload.salesman);
        })
        .addCase(createSalesman.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default salesexecutiveSlice.reducer;