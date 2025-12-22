import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllSalesmen = createAsyncThunk(
  'salesexecutive/fetchAllSalesmen',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/salesman/get-all-salesmen`,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data=res.data; 
      if(res.status!==200){
        return thunkAPI.rejectWithValue('Failed to fetch salesmen');
      }
      return data.salesmen;
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
        salesmen: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllSalesmen.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllSalesmen.fulfilled, (state, action) => {
            state.loading = false;
            state.salesmen = action.payload;
        })
        .addCase(fetchAllSalesmen.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createSalesman.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createSalesman.fulfilled, (state, action) => {
            state.loading = false;
            state.salesmen.push(action.payload.salesman);
        })
        .addCase(createSalesman.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default salesexecutiveSlice.reducer;