import { configureStore } from "@reduxjs/toolkit";
import selectedBreedReducer from "./cats/selectedCatBreed.slice";
import catBreedsReducer from "./cats/slice";

export const store = configureStore({
  reducer: {
    catBreeds: catBreedsReducer,
    selectedCatBreed: selectedBreedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
