import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uid: "adfsadfasdfasfd",
    point: 100000000,

    listVideoWatched: [],
  },
  reducers: {

  }
});

export const {

} = userSlice.actions;
export default userSlice.reducer;