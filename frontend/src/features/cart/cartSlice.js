import { createSlice } from '@reduxjs/toolkit';

const storedCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: null };

const persistCart = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: storedCart.cartItems || [],
    shippingAddress: storedCart.shippingAddress || null
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((cartItem) => cartItem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? item : cartItem
        );
      } else {
        state.cartItems.push(item);
      }

      persistCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      persistCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      persistCart(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = null;
      persistCart(state);
    }
  }
});

export const { addToCart, removeFromCart, saveShippingAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
