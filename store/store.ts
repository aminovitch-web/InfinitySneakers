import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";

import { cartReducer } from "./slices/cart-slice";
import { recentlyViewedReducer } from "./slices/recently-viewed-slice";

// Persist config for cart
const cartPersistConfig = {
  key: "cart",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "m9INwKQFIAzxYHrz3i2I29PtJRtNJBWC",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

// Persist config for recentlyViewed
const recentlyViewedPersistConfig = {
  key: "recentlyViewed",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "m9INwKQFIAzxYHrz3i2I29PtJRtNJBWC",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  recentlyViewed: persistReducer(
    recentlyViewedPersistConfig,
    recentlyViewedReducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
