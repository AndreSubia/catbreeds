import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CatBreed } from "../../types/cats";

interface SelectedBreedState {
  data: CatBreed | null;
}

const initialState: SelectedBreedState = {
  data: null,
};

const selectedBreedSlice = createSlice({
  name: "selectedCatBreed",
  initialState,
  reducers: {
    setSelectedBreed: (state, action: PayloadAction<CatBreed>) => {
      state.data = action.payload;
    },
    clearSelectedBreed: (state) => {
      state.data = null;
    },
  },
});

export const { setSelectedBreed, clearSelectedBreed } =
  selectedBreedSlice.actions;
export default selectedBreedSlice.reducer;
