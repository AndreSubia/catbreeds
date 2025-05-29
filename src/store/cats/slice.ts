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
  loading: false,
  error: null,
  hasNextPage: true,
};

type FetchCatBreedsParams = {
  page: number;
  limit: number;
};

export const fetchCatBreeds = createAsyncThunk<
  { breeds: CatBreed[]; page: number },
  FetchCatBreedsParams
>("catBreeds/fetchAll", async ({ page, limit }) => {
  const res = await api.get<CatBreed[]>(`/breeds`, {
    params: { limit, page },
  });

  const breeds = res.data;

  const breedsWithImages = await Promise.all(
    breeds.map(async (breed) => {
      if (!breed.reference_image_id) return breed;

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

  return { breeds: breedsWithImages, page };
});

const catBreedsSlice = createSlice({
  name: "catBreeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatBreeds.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 0) {
          state.data = action.payload.breeds;
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
