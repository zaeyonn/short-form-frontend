import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRootState } from 'src/types';

const initialState: UserRootState = {
  user: null,
  loading: false,

  seriesWatchList: [],
  seriesKeepList: [],

  userInfoResult: null,
  userInfoError: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState(state: any, action) {
      state[action.payload] = null
    },
    userInfo(state: any) {
      state.loading = true;
    },
    userInfoSuccess(state: UserRootState, action: PayloadAction<any>) {
      state.userInfoResult = action.payload
    },
    userInfoFailure(state: UserRootState, action: PayloadAction<any>) {
      state.userInfoError = action.payload
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
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
    },
    userSeriesProgress(state) {
      state.loading = true
    },
    userSeriesProgressSuccess(state: any, action) {
      state.userSeriesProgressResult = action.payload
    },
    userSeriesProgressFailure(state: any, action) {
      state.userSeriesProgressError = action.payload
    },
    addSeriesProgress(state) {
      state.loading = true
    },
    addSeriesProgressSuccess(state: any, action) {
      state.addSeriesProgressResult = action.payload
    },
    addSeriesProgressFailure(state: any, action) {
      state.addSeriesProgressError = action.payload
    },
    updateSeriesProgress(state) {
      state.loading = true
    },
    updateSeriesProgressSuccess(state: any, action) {
      state.updateSeriesProgressResult = action.payload
    },
    updateSeriesProgressFailure(state: any, action) {
      state.updateSeriesProgressError = action.payload
    },
    updateSeriesUnlockEpisode(state) {
      state.loading = true
    },
    updateSeriesUnlockEpisodeSuccess(state: any, action) {
      state.updateSeriesUnlockEpisodeResult = action.payload
    },
    updateSeriesUnlockEpisodeFailure(state: any, action) {
      state.updateSeriesUnlockEpisodeError = action.payload
    },
  }
});

export const {
  clearUserState, setUser, setSeriesKeepList, authGuest, authGuestSuccess, authGuestFailure,
  addVideoWatched, addSeriesKeep, addSeriesKeepSuccess, addSeriesKeepFailure,
  addSeriesWatched, removeSeriesWatched, removeSeriesKeep, removeSeriesKeepSuccess, removeSeriesKeepFailure, 
  changeBookmarkState, userSeriesKeepList, userSeriesKeepListSuccess, userSeriesKeepListFailure,
  userSeriesProgress, userSeriesProgressSuccess, userSeriesProgressFailure, addSeriesProgress, addSeriesProgressSuccess, addSeriesProgressFailure,
  updateSeriesProgress, updateSeriesProgressSuccess, updateSeriesProgressFailure,
  userInfo, userInfoSuccess, userInfoFailure, updateSeriesUnlockEpisode, updateSeriesUnlockEpisodeSuccess, updateSeriesUnlockEpisodeFailure,
} = userSlice.actions;
export default userSlice.reducer;