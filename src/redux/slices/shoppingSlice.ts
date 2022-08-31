import { createSlice, current } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Product, CartItem } from '../../typings/productTypes';

interface InitialState {
  cartItems: CartItem[];
  favourites: Product['id'][];
}

const INITIAL_STATE: InitialState = {
  cartItems: [],
  favourites: [],
};

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: INITIAL_STATE,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const itemExists = Boolean(state.cartItems.find(item => item.product.id === action.payload.id));
      if (!itemExists) {
        state.cartItems.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.cartItems = current(state.cartItems).map(
          cartItem => cartItem.product.id === action.payload.id ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          } : cartItem
        );
      }
    },
    removeProductFromCart: (state, action: PayloadAction<Product['id']>) => {
      state.cartItems = state.cartItems.filter(
        item => item.product.id !== action.payload
      );
    },
    removeOneProductFromCart: (state, action: PayloadAction<Product['id']>) => {
      state.cartItems = state.cartItems.map(
        item => {
          if (item.product.id !== action.payload) return item;
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
      ).filter(
        item =>
        item.quantity > 0
      );
    },
    toggleProductInFavourites: (state, action: PayloadAction<Product['id']>) => {
      state.favourites.includes(action.payload)
        ? state.favourites.splice(state.favourites.indexOf(action.payload), 1)
        : state.favourites.push(action.payload);
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  removeOneProductFromCart,
  toggleProductInFavourites,
  resetCart,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
