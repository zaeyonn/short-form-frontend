import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uuid: "adfsadfasdfasfd",
    point: 100000000,

    seriesWatchList: new Array<any>(),
    seriesKeepList: new Array<any>(),
  },
  reducers: {
    clearUserState(state: any, action) {
      state[action.payload] = null
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload
    },
    setSeriesKeepList(state, action: PayloadAction<any>) {
      state.seriesKeepList = action.payload
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
    addVideoWatched(state, action: PayloadAction<any>) {
      state.seriesWatchList = [...state.seriesWatchList, {...action.payload}];
    },
    addSeriesKeep() {
    },
    addSeriesKeepSuccess(state: any, action) {
      state.addSeriesKeepResult = action.payload;
    },
    addSeriesKeepFailure(state: any, action) {
      state.addSeriesKeepError = action.payload;

    },
    addSeriesWatched(state, action: PayloadAction<any>) {
      state.seriesWatchList = [...state.seriesWatchList, {...action.payload}];
    },
    removeSeriesWatched(state, action: PayloadAction<any>) {
      console.log(state.seriesWatchList.length);
      let arr = state.seriesWatchList.filter((value: any) => value !== action.payload);
      state.seriesWatchList = arr;
      console.log(state.seriesWatchList.length);
    },
    removeSeriesKeep() {
      
    },
    removeSeriesKeepSuccess(state: any, action: PayloadAction<any>) {
      state.removeSeriesKeepResult = action.payload;
    },
    removeSeriesKeepFailure(state: any, action: PayloadAction<any>) {
      state.removeSeriesKeepError = action.payload;
    },
    changeBookmarkState(state, action: PayloadAction<any>) {
      let index = action.payload.index;
      if(state.seriesWatchList[index].bookmark) {
        state.seriesWatchList[index].bookmark = false;
      }
      else {
        state.seriesWatchList[index].bookmark = true;
      }
    },
    userSeriesKeepList() {},
    userSeriesKeepListSuccess(state: any, action: PayloadAction<any>) {
      state.userSeriesKeepListResult = action.payload
    },
    userSeriesKeepListFailure(state: any, action: PayloadAction<any>) {
      state.userSeriesKeepListFailure = action.payload
    }
  }
});

export const {
  clearUserState, setUser, setSeriesKeepList, authGuest, authGuestSuccess, authGuestFailure,
  addVideoWatched, addSeriesKeep, addSeriesKeepSuccess, addSeriesKeepFailure,
  addSeriesWatched, removeSeriesWatched, removeSeriesKeep, removeSeriesKeepSuccess, removeSeriesKeepFailure, 
  changeBookmarkState, userSeriesKeepList, userSeriesKeepListSuccess, userSeriesKeepListFailure,
} = userSlice.actions;
export default userSlice.reducer;