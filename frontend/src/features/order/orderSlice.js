import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  orders: [],
  order: null,
  allOrders: [],
  clientSecret: '',
  loading: false,
  error: null,
  success: false
};

export const createPaymentIntent = createAsyncThunk(
  'orders/createPaymentIntent',
  async (amount, thunkAPI) => {
    try {
      const { data } = await api.post('/api/payments/create-intent', { amount });
      return data.clientSecret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to initialize payment');
    }
  }
);

export const createOrder = createAsyncThunk('orders/createOrder', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/api/orders', payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to create order');
  }
});

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/api/orders/my-orders');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to load orders');
  }
});

export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (id, thunkAPI) => {
  try {
    const { data } = await api.get(`/api/orders/${id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to load order');
  }
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/api/orders/admin/all');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to load admin orders');
  }
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } = await api.put(`/api/orders/${id}`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to update order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.clientSecret = '';
      state.error = null;
      state.success = false;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.success = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.allOrders = state.allOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addMatcher(
        (action) => action.type.startsWith('orders/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('orders/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('orders/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
