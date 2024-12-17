import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uid: "adfsadfasdfasfd",
    point: 100000000,

    listVideoWatched: new Array<any>(),
    listVideoKeeped: new Array<any>(),
  },
  reducers: {
    addVideoWatched(state, action: PayloadAction<any>) {
      state.listVideoWatched = [...state.listVideoWatched, {...action.payload}];
    },

    addVideoKeeped(state, action: PayloadAction<any>) {
      state.listVideoKeeped = [...state.listVideoKeeped, {...action.payload}];
    },
  }
});

export const {
  addVideoWatched, addVideoKeeped,
} = userSlice.actions;
export default userSlice.reducer;