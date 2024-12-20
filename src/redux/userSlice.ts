import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uid: "adfsadfasdfasfd",
    point: 100000000,

    seriesWatched: new Array<any>(),
    seriesKeeped: new Array<any>(),
  },
  reducers: {
    addSeriesWatched(state, action: PayloadAction<any>) {
      state.seriesWatched = [...state.seriesWatched, {...action.payload}];
    },

    removeSeriesWatched(state, action: PayloadAction<any>) {
      console.log(state.seriesWatched.length);
      let arr = state.seriesWatched.filter((value: any) => value !== action.payload);
      state.seriesWatched = arr;
      console.log(state.seriesWatched.length);
    },

    addSeriesKeeped(state, action: PayloadAction<any>) {
      state.seriesKeeped = [...state.seriesKeeped, {...action.payload}];
    },

    removeSeriesKeeped(state, action: PayloadAction<any>) {
      console.log(state.seriesKeeped.length);
      let arr = state.seriesKeeped.filter((value: any) => value !== action.payload);
      state.seriesKeeped = arr;
      console.log(state.seriesKeeped.length);
    },

    changeBookmarkState(state, action: PayloadAction<any>) {
      let index = action.payload.index;
      if(state.seriesWatched[index].bookmark) {
        state.seriesWatched[index].bookmark = false;
      }
      else {
        state.seriesWatched[index].bookmark = true;
      }
    }
  }
});

export const {
  addSeriesWatched, removeSeriesWatched,
  addSeriesKeeped, removeSeriesKeeped, 
  changeBookmarkState,
} = userSlice.actions;
export default userSlice.reducer;