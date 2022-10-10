import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../Features/counterSlice";
export const store = configureStore({
  reducer: {
    counter: CounterSlice,
  },
});
