import axios from "axios";
import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { cartReducer } from "./Reducers/cartReducer";
import {placeorderReducer} from "./Reducers/orderReducer";

export const getPizzaBurgers = createAsyncThunk(
  "pizzaburgers/getAll",
  async () => {
    const response = await axios.get("/api/pizzaburgers/getpizzaburgers");
    return response.data;
  }
);

const pizzaburgersSlice = createSlice({
  name: "pizzaburgers",
  initialState: { pizzaburgers: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPizzaBurgers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getPizzaBurgers.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.pizzaburgers = payload;
    });
    builder.addCase(getPizzaBurgers.rejected, (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    });
  },
});

const cartItems = sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [];

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
};

const rootReducer = combineReducers({
  pizzaburgers: pizzaburgersSlice.reducer,
  cartReducer: cartReducer,
  placeorderReducer : placeorderReducer
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
