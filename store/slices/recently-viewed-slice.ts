import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface RecentlyViewedState {
  items: Product[];
}

const initialState: RecentlyViewedState = {
  items: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      const itemWithTimestamp = { ...action.payload, timestamp: Date.now() };

      if (!existingItem) {
        state.items.push(itemWithTimestamp);
      } else {
        existingItem.timestamp = Date.now();
      }
    },
    clearItems: (state) => {
      state.items = [];
    },
    clearOldItems: (state, action: PayloadAction<number>) => {
      const currentTime = Date.now();
      state.items = state.items.filter(
        (item) => currentTime - (item.timestamp || 0) < action.payload
      );
    },
  },
});

export const { addItem, clearItems, clearOldItems } =
  recentlyViewedSlice.actions;
export const recentlyViewedReducer = recentlyViewedSlice.reducer;
