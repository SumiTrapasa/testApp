// redux/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as number[],
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.includes(index)) {
        return state.filter(i => i !== index);
      } else {
        return [...state, index];
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
