import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total += product.price * quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          quantity,
          total: product.price * quantity,
          price: product.price,
        });
      }

      state.totalAmount += quantity * product.price;
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        state.totalAmount -= existingItem.quantity * existingItem.price;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    removeAll: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItem, removeItem, removeAll } = cartSlice.actions;
