import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uuid: "adfsadfasdfasfd",
    point: 100000000,

    seriesKeepList: new Array<any>(),
    seriesWatchList: new Array<any>(),
  },
  reducers: {
    clearUserState(state: any, action) {
      state[action.payload] = null
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload
    },

    authGuest(state: any) {
      state.loading = true;
    },
    authGuestSuccess(state: any, action) {
      state.authGuestResult = action.payload;
      state.loading = false;
    },
    authGuestFailure(state: any, action) {
      state.authGuestError = action.payload;
      state.loading = false;
    },

    setSeriesKeepList(state, action: PayloadAction<any>) {
      state.seriesKeepList = action.payload
    },

    addSeriesKeep() {
    },
    addSeriesKeepSuccess(state: any, action) {
      state.addSeriesKeepResult = action.payload;
    },
    addSeriesKeepFailure(state: any, action) {
      state.addSeriesKeepError = action.payload;
    },

    removeSeriesKeep(state, action: PayloadAction<any>) {
      console.log(state.seriesKeepList.length);
      let arr = state.seriesKeepList.filter((value: any) => value !== action.payload);
      state.seriesKeepList = arr;
      console.log(state.seriesKeepList.length);
    },

    addSeriesWatch(state, action: PayloadAction<any>) {
      state.seriesWatchList = [...state.seriesWatchList, {...action.payload}];
    },

    removeSeriesWatch(state, action: PayloadAction<any>) {
      console.log(state.seriesWatchList.length);
      let arr = state.seriesWatchList.filter((value: any) => value !== action.payload);
      state.seriesWatchList = arr;
      console.log(state.seriesWatchList.length);
    },

    changeBookmarkState(state, action: PayloadAction<any>) {
      let index = action.payload.index;
      if(state.seriesWatchList[index].bookmark) {
        state.seriesWatchList[index].bookmark = false;
      }
      else {
        state.seriesWatchList[index].bookmark = true;
      }
    }
  }
});

export const {
  clearUserState, setUser, authGuest, authGuestSuccess, authGuestFailure,
  setSeriesKeepList, addSeriesKeep, addSeriesKeepSuccess, addSeriesKeepFailure, removeSeriesKeep,
  addSeriesWatch, removeSeriesWatch, 
  changeBookmarkState,
} = userSlice.actions;
export default userSlice.reducer;