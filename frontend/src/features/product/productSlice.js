import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  products: [],
  featuredProducts: [],
  product: null,
  categories: [],
  page: 1,
  pages: 1,
  total: 0,
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params = {}, thunkAPI) => {
  try {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });

    const { data } = await api.get(`/products?${searchParams.toString()}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to fetch products');
  }
});

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/products/featured');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to fetch featured products');
  }
});

export const fetchProductDetails = createAsyncThunk('products/fetchDetails', async (id, thunkAPI) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to fetch product');
  }
});

export const createProduct = createAsyncThunk('products/createProduct', async (payload, thunkAPI) => {
  try {
    const { data } = await api.post('/products', payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to create product');
  }
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } = await api.put(`/products/${id}`, payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  try {
    await api.delete(`/products/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to delete product');
  }
});

export const uploadProductImage = createAsyncThunk('products/uploadImage', async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data.imageUrl;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unable to upload image');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.startsWith('products/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('products/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('products/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
