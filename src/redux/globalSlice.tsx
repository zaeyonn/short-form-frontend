import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    activePage: "",
    displayPopName: "",
  },
  reducers: {
    setActivePage(state, action: PayloadAction<string>) {
      state.activePage = action.payload;
    },

    setDisplayPopName(state, action: PayloadAction<string>) {
      state.displayPopName = action.payload;
    }
  }
});

export const {
  setActivePage,
  setDisplayPopName,
} = globalSlice.actions;
export default globalSlice.reducer;