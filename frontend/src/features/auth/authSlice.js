import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

const storedUser = localStorage.getItem('authUser')
  ? JSON.parse(localStorage.getItem('authUser'))
  : null;

const initialState = {
  userInfo: storedUser,
  users: [],
  loading: false,
  error: null
};

const persistUser = (user) => {
  localStorage.setItem('authUser', JSON.stringify(user));
  return user;
};

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/api/auth/login', payload);
    persistUser(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/api/auth/register', payload);
    persistUser(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/api/auth/profile');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to fetch profile');
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload, thunkAPI) => {
  try {
    const { data } = await api.put('/api/auth/profile', payload);
    persistUser(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to update profile');
  }
});

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/api/users');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to load users');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('authUser');
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  }
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
