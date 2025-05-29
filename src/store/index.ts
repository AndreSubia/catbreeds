import { configureStore } from "@reduxjs/toolkit";
import catBreedsReducer from "./cats/slice";

export const store = configureStore({
  reducer: {
    catBreeds: catBreedsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
