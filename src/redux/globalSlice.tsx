import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    displayPopName: "",
  },
  reducers: {
    setDisplayPopName(state, action: PayloadAction<string>) {
      state.displayPopName = action.payload;
    }
  }
});

export const {
  setDisplayPopName,
} = globalSlice.actions;
export default globalSlice.reducer;