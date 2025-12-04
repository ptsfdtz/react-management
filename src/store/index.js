import { configureStore } from "@reduxjs/toolkit";
import TapReducer from "./reducers/tap";

const store = configureStore({
  reducer: {
    tab: TapReducer,
  },
});

export default store;
