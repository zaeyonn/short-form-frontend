import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRootState } from 'src/types';

const initialState: UserRootState = {
  user: {
    id: localStorage.getItem('user-id') ? localStorage.getItem('user-id') : null
  },
  loading: false,

  seriesWatchList: [],
  seriesKeepList: [],

  userInfoResult: null,
  userInfoError: null,

  paymentProduct: null,
  
  subscription: null,
  userMissionList: [],

  coinTransactionListError: null,
  coinTransactionListResult: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState(state: any, action) {
      state[action.payload] = null
    },
    userInfo(_state: any, _action: PayloadAction<any>) {},
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
    setSeriesWatchList(state, action: PayloadAction<any>) {
      state.seriesWatchList = action.payload
    },
    setUserMissionList(state: UserRootState, action:PayloadAction<any>) {
      state.userMissionList = action.payload
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
    authSns(state: any, _action: PayloadAction<any>) {
      state.loading = true;
    },
    authSnsSuccess(state: any, action) {
      state.authSnsResult = action.payload;
      state.loading = false;
    },
    authSnsFailure(state: any, action) {
      state.authSnsError = action.payload;
      state.loading = false;
    },
    addVideoWatched(state, action: PayloadAction<any>) {
      state.seriesWatchList = [...state.seriesWatchList, {...action.payload}];
    },
    addSeriesKeep(_state: any, _action: PayloadAction<any>) {},
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
    removeSeriesKeep(state: any, _action: PayloadAction<any>) {
      state.loading = true;
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
    userSeriesKeepList(_state: any, _action: PayloadAction<any>) {},
    userSeriesKeepListSuccess(state: any, action: PayloadAction<any>) {
      state.userSeriesKeepListResult = action.payload
    },
    userSeriesKeepListFailure(state: any, action: PayloadAction<any>) {
      state.userSeriesKeepListFailure = action.payload
    },
    userSeriesWatchList(state: any, _action: PayloadAction<any>) {
      state.loading = true;
    },
    userSeriesWatchListSuccess(state: any, action: PayloadAction<any>) {
      state.userSeriesWatchListResult = action.payload
    },
    userSeriesWatchListFailure(state: any, action: PayloadAction<any>) {
      state.userSeriesWatchListFailure = action.payload
    },
    userSeriesProgress(_state: any, _action: PayloadAction<any>) {},
    userSeriesProgressSuccess(state: any, action) {
      state.userSeriesProgressResult = action.payload
    },
    userSeriesProgressFailure(state: any, action) {
      state.userSeriesProgressError = action.payload
    },
    addSeriesProgress(_state: any, _action: PayloadAction<any>) {},
    addSeriesProgressSuccess(state: any, action) {
      state.addSeriesProgressResult = action.payload
    },
    addSeriesProgressFailure(state: any, action) {
      state.addSeriesProgressError = action.payload
    },
    updateSeriesProgress(state, _action: PayloadAction<any>) {
      state.loading = true
    },
    updateSeriesProgressSuccess(state: any, action) {
      state.updateSeriesProgressResult = action.payload
    },
    updateSeriesProgressFailure(state: any, action) {
      state.updateSeriesProgressError = action.payload
    },
    updateSeriesUnlockEpisode(_state: any, _action: PayloadAction<any>) {},
    updateSeriesUnlockEpisodeSuccess(state: any, action) {
      state.updateSeriesUnlockEpisodeResult = action.payload
    },
    updateSeriesUnlockEpisodeFailure(state: any, action) {
      state.updateSeriesUnlockEpisodeError = action.payload
    },
    setPaymentProduct(state: any, action: PayloadAction<any>) {
      state.paymentProduct = action.payload;
    },
    paymentsRegist(_state: any, _action: PayloadAction<any>) {

    },
    paymentsRegistSuccess(state: any, action: PayloadAction<any>) {
      state.paymentsRegistResult = action.payload
    },
    paymentsRegistFailure(state: any, action: PayloadAction<any>) {
      state.paymentsRegistError = action.payload
    },
    paymentsConfirm(_state: any, _action: PayloadAction<any>) {},
    paymentsConfirmSuccess(state: any, action: PayloadAction<any>) {
      state.paymentsConfirmResult = action.payload
    },
    paymentsConfirmFailure(state: any, action: PayloadAction<any>) {
      state.paymentsConfirmError = action.payload
    },
    usersPointDeduct(_state: any, _action: PayloadAction<any>) { },
    usersPointDeductSuccess(state: any, action: PayloadAction<any>) {
      state.usersPointDeductResult = action.payload
    },
    usersPointDeductFailure(state: any, action: PayloadAction<any>) {
      state.usersPointDeductError = action.payload
    },
    attendance(_state: any, _action: PayloadAction<any>) {},
    attendanceSuccess(state: any, action: PayloadAction<any>) {
      state.attendanceResult = action.payload
    },
    attendanceFailure(state: any, action: PayloadAction<any>) {
      state.attendanceError = action.payload
    },
    attendanceCheck(_state: any, _action: PayloadAction<any>) {},
    attendanceCheckSuccess(state: any, action: PayloadAction<any>) {
      state.attendanceCheckResult = action.payload
    },
    attendanceCheckFailure(state: any, action: PayloadAction<any>) {
      state.attendanceCheckError = action.payload
    },
    subscribe(_state: any, _action: PayloadAction<any>) {},
    subscribeSuccess(state: any, action: PayloadAction<any>) {
      state.subscribeResult = action.payload
    },
    subscribeFailure(state: any, action: PayloadAction<any>) {
      state.subscribeError = action.payload
    },
    setSubscription(state: UserRootState, action: PayloadAction<any>) {
      state.subscription = action.payload
    },
    usersProfileUpdate(_state: any, _action: PayloadAction<any>) {},
    usersProfileUpdateSuccess(state: any, action: PayloadAction<any>) {
      state.usersProfileUpdateResult = action.payload
    },
    usersProfileUpdateFailure(state: any, action: PayloadAction<any>) {
      state.usersProfileUpdateError = action.payload
    },
    missionsComplete(_state: any, _action: PayloadAction<any>) {

    },
    missionsCompleteSuccess(state: any, action: PayloadAction<any>) {
      state.missionsCompleteResult = action.payload
    },
    missionsCompleteFailure(state: any, action: PayloadAction<any>) {
      state.missionsCompleteError = action.payload
    },
    missionsUpdate(_state: any, _action: PayloadAction<any>) {

    },
    missionsUpdateSuccess(state: any, action: PayloadAction<any>) {
      state.missionsUpdateResult = action.payload
    },
    missionsUpdateFailure(state: any, action: PayloadAction<any>) {
      state.missionsUpdateError = action.payload
    },
    coinTransactionList(_state: UserRootState, _action: PayloadAction<any>) {

    },
    coinTransactionListSuccess(state: UserRootState, action: PayloadAction<any>) {
      state.coinTransactionListResult = action.payload
    },
    coinTransactionListFailure(state: UserRootState, action: PayloadAction<any>) {
      state.coinTransactionListError = action.payload;
    }
  }
});

export const {
  clearUserState, setUser, setSeriesKeepList, setSeriesWatchList, setUserMissionList,
  authGuest, authGuestSuccess, authGuestFailure, authSns, authSnsSuccess, authSnsFailure,
  addVideoWatched, addSeriesKeep, addSeriesKeepSuccess, addSeriesKeepFailure,
  addSeriesWatched, removeSeriesWatched, removeSeriesKeep, removeSeriesKeepSuccess, removeSeriesKeepFailure, 
  changeBookmarkState, userSeriesKeepList, userSeriesKeepListSuccess, userSeriesKeepListFailure,
  userSeriesWatchList, userSeriesWatchListSuccess, userSeriesWatchListFailure,
  userSeriesProgress, userSeriesProgressSuccess, userSeriesProgressFailure, addSeriesProgress, addSeriesProgressSuccess, addSeriesProgressFailure,
  updateSeriesProgress, updateSeriesProgressSuccess, updateSeriesProgressFailure,
  userInfo, userInfoSuccess, userInfoFailure, updateSeriesUnlockEpisode, updateSeriesUnlockEpisodeSuccess, updateSeriesUnlockEpisodeFailure,
  paymentsRegist, paymentsRegistSuccess, paymentsRegistFailure, paymentsConfirm, paymentsConfirmFailure, paymentsConfirmSuccess,
  usersPointDeduct, usersPointDeductSuccess, usersPointDeductFailure,
  attendance, attendanceSuccess, attendanceCheckFailure, attendanceCheck, attendanceCheckSuccess, attendanceFailure, setPaymentProduct,
  subscribe, subscribeSuccess, subscribeFailure, setSubscription, usersProfileUpdate, usersProfileUpdateSuccess, usersProfileUpdateFailure,
  missionsCompleteSuccess, missionsCompleteFailure, missionsComplete, missionsUpdate, missionsUpdateFailure, missionsUpdateSuccess, coinTransactionList, coinTransactionListSuccess, coinTransactionListFailure
} = userSlice.actions;
export default userSlice.reducer;