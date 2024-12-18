import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uid: "adfsadfasdfasfd",
    point: 100000000,

    watchedVideos: new Array<any>(),
    keepedVideos: new Array<any>(),
  },
  reducers: {
    addVideoWatched(state, action: PayloadAction<any>) {
      state.watchedVideos = [...state.watchedVideos, {...action.payload}];
    },

    addVideoKeeped(state, action: PayloadAction<any>) {
      state.keepedVideos = [...state.keepedVideos, {...action.payload}];
    },

    changeBookmarkState(state, action: PayloadAction<any>) {
      let index = action.payload.index;
      if(state.watchedVideos[index].bookmark) {
        state.watchedVideos[index].bookmark = false;
      }
      else {
        state.watchedVideos[index].bookmark = true;
      }
    }
  }
});

export const {
  addVideoWatched, addVideoKeeped, changeBookmarkState,
} = userSlice.actions;
export default userSlice.reducer;