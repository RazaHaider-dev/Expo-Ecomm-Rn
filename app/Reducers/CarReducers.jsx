// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



// Async thunk for loading initial state
export const loadInitialState = createAsyncThunk(
  'cart/loadInitialState',
  async () => {
    const cartData = await AsyncStorage.getItem('cart');
    const favoritesData = await AsyncStorage.getItem('favorites');
    return {
      cart: cartData ? JSON.parse(cartData) : [],
      favorites: favoritesData ? JSON.parse(favoritesData) : []
    };
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    favorites: []
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
      AsyncStorage.setItem('cart', JSON.stringify(state.cart));
    },
    addToFavorite: (state, action) => {
      if (!state.favorites.some(item => item.id === action.payload.id)) {
        state.favorites.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorite: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        AsyncStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
        }
        AsyncStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInitialState.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
      state.favorites = action.payload.favorites;
    });
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  addToFavorite, 
  removeFromFavorite, 
  decrementQuantity, 
  incrementQuantity 
} = cartSlice.actions;

export default cartSlice.reducer;
