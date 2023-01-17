import { configureStore } from "@reduxjs/toolkit";
import { drawer } from "./drawer";

export const store = configureStore({
  reducer: {
    drawer: drawer.reducer,
  },
});
