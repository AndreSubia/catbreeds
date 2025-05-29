import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/config";
import { CatBreed } from "../../types/cats";

interface CatBreedsState {
  data: CatBreed[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
}

const initialState: CatBreedsState = {
  data: [],
  loading: true,
  error: null,
  hasNextPage: true,
};

type FetchCatBreedsParams = {
  page: number;
  limit: number;
  searchName?: string;
};

export const fetchCatBreeds = createAsyncThunk<
  { breeds: CatBreed[]; page: number; searchName?: string },
  FetchCatBreedsParams
>("catBreeds/fetchAll", async ({ page, limit, searchName }) => {
  try {
    let breeds: CatBreed[];
    if (searchName) {
      const res = await api.get<CatBreed[]>(`/breeds/search`, {
        params: { q: searchName },
      });
      breeds = res.data;
    } else {
      const res = await api.get<CatBreed[]>(`/breeds`, {
        params: { limit, page },
      });
      breeds = res.data;
    }
    const breedsWithImages = await Promise.all(
      breeds.map(async (breed) => {
        if (!breed.reference_image_id)
          return {
            ...breed,
            image_url: undefined,
          };
        try {
          const imgRes = await api.get(`/images/${breed.reference_image_id}`);
          return {
            ...breed,
            image_url: imgRes.data.url,
          };
        } catch {
          console.warn(`Could not fetch image for ${breed.name}`);
          return {
            ...breed,
            image_url: undefined,
          };
        }
      }),
    );
    return { breeds: breedsWithImages, page, searchName };
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      throw new Error(`Failed to fetch cat breeds: ${e.message}`);
    }
    throw new Error("Failed to fetch cat breeds");
  }
});

const catBreedsSlice = createSlice({
  name: "catBreeds",
  initialState,
  reducers: {
    resetCatBreeds: (state) => {
      state.data = [];
      state.hasNextPage = true;
      state.error = null;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatBreeds.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 0 || action.payload.searchName) {
          state.data = action.payload.breeds;
          state.hasNextPage = action.payload.searchName ? false : true;
        } else if (action.payload.breeds.length === 0) {
          state.hasNextPage = false;
        } else {
          state.data = [...state.data, ...action.payload.breeds];
        }
      })
      .addCase(fetchCatBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cat breeds";
      });
  },
});

export default catBreedsSlice.reducer;
export const { resetCatBreeds } = catBreedsSlice.actions;
