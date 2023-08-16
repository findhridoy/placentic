import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { categories: [] },
  reducers: {
    getCategories: (state, actions) => {
      state.categories = actions.payload;
    },
  },
});

export const { getCategories } = categorySlice.actions;
export default categorySlice.reducer;
