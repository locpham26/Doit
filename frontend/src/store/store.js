import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export default function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
