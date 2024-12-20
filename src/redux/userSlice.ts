import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uuid: "adfsadfasdfasfd",
    point: 100000000,

    listVideoWatched: new Array<any>(),
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
      state.listVideoWatched = [...state.listVideoWatched, {...action.payload}];
    },
    addSeriesKeep() {
    },
    addSeriesKeepSuccess(state: any, action) {
      state.addSeriesKeepResult = action.payload;
    },
    addSeriesKeepFailure(state: any, action) {
      state.addSeriesKeepError = action.payload;
    }
  }
});

export const {
  clearUserState, setUser, setSeriesKeepList, authGuest, authGuestSuccess, authGuestFailure,
  addVideoWatched, addSeriesKeep, addSeriesKeepSuccess, addSeriesKeepFailure,
} = userSlice.actions;
export default userSlice.reducer;