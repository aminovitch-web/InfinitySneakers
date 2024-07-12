import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product, Size } from "@/types";
import toast from "react-hot-toast";

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
    addItem: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        size: Size;
      }>
    ) => {
      const { product, quantity, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size.id === size.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = parseFloat(
          (existingItem.quantity * Number(product.price)).toFixed(2)
        );
      } else {
        state.items.push({
          product,
          quantity,
          size,
          total: parseFloat((Number(product.price) * quantity).toFixed(2)),
        });
      }

      toast.success("Your product has been added to your cart.", {
        position: "top-center",
        duration: 4000,
      });

      state.totalAmount = parseFloat(
        (state.totalAmount + quantity * Number(product.price)).toFixed(2)
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        quantity: number;
      }>
    ) => {
      const { productId, size, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId && item.size.id === size
      );

      if (existingItem) {
        state.totalAmount = parseFloat(
          (state.totalAmount - existingItem.total).toFixed(2)
        );
        existingItem.quantity = quantity;
        existingItem.total = parseFloat(
          (quantity * Number(existingItem.product.price)).toFixed(2)
        );
        state.totalAmount = parseFloat(
          (state.totalAmount + existingItem.total).toFixed(2)
        );
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ productId: string; size: string }>
    ) => {
      const { productId, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId && item.size.id === size
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalAmount = parseFloat(
          (state.totalAmount - existingItem.total).toFixed(2)
        );
        state.items.splice(existingItemIndex, 1);
      }
    },
    removeAll: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, removeAll } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
