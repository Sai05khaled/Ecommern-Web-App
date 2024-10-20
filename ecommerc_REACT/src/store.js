import { createSlice } from "@reduxjs/toolkit";
import appApi from "./services/appApi";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    resetNotifications: (state) => {
      state.notifications.forEach((obj) => {
        obj.status = "read";
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signup.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.login.matchFulfilled,
      (_, { payload }) => payload
    );
    // Add other matchers like addToCart, removeFromCart, etc.
  },
});

export const { logout, addNotification, resetNotifications } =
  userSlice.actions;
export default userSlice.reducer;

/*
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// reduces
const reducer = combineReducers({
  user: userSlice,
  products: productSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [appApi.reducerPath, "products"],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([appApi.middleware]),
});

export default store;




*/
