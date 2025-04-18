import { takeLatest, all } from 'redux-saga/effects';
import * as globalHandler from './global.ts';
import * as globalSlice from '../globalSlice';
import * as userHandler from './user.ts';
import * as userSlice from '../userSlice';

export function* watcherSaga() {
  yield all([
    // global
    takeLatest(globalSlice.episodeList.type, globalHandler.handleEpisodeList),
    takeLatest(globalSlice.seriesList.type, globalHandler.handleSeriesList),
    takeLatest(globalSlice.seriesInfo.type, globalHandler.handleSeriesInfo),
    takeLatest(globalSlice.increaseSeriesView.type, globalHandler.handleIncreaseSeriesViews),
    takeLatest(globalSlice.productList.type, globalHandler.handleProductList),
    takeLatest(globalSlice.missionList.type, globalHandler.handleMissionList),
  
    // user
    takeLatest(userSlice.authGuest.type, userHandler.handleAuthGuest),
    takeLatest(userSlice.authSns.type, userHandler.handleAuthSns),
    takeLatest(userSlice.addSeriesKeep.type, userHandler.handleAddSeriesKeep),
    takeLatest(userSlice.removeSeriesKeep.type, userHandler.handleRemoveSeriesKeep),
    takeLatest(userSlice.userSeriesKeepList.type, userHandler.handleUserSeriesKeepList),
    takeLatest(userSlice.userSeriesWatchList.type, userHandler.handleUserSeriesWatchList),
    takeLatest(userSlice.userSeriesProgress.type, userHandler.handleUserSeriesProgress),
    takeLatest(userSlice.addSeriesProgress.type, userHandler.handleAddSeriesProgress),
    takeLatest(userSlice.updateSeriesProgress.type, userHandler.handleUpdateSeriesProgress),
    takeLatest(userSlice.userInfo.type, userHandler.handleUserInfo),
    takeLatest(userSlice.updateSeriesUnlockEpisode.type, userHandler.handleUpdateSeriesUnlockEpisode),
    takeLatest(userSlice.paymentsRegist.type, userHandler.handlePaymentsRegist),
    takeLatest(userSlice.paymentsConfirm.type, userHandler.handlePaymentsConfirm),
    takeLatest(userSlice.attendance.type, userHandler.handleattendance),
    takeLatest(userSlice.attendanceCheck.type, userHandler.handleattendanceCheck),
    takeLatest(userSlice.subscribe.type, userHandler.handleSubscribe),
    takeLatest(userSlice.usersProfileUpdate.type, userHandler.handleUsersProfileUpdate),
    takeLatest(userSlice.missionsComplete.type, userHandler.handleMissionsComplete),
    takeLatest(userSlice.missionsUpdate.type, userHandler.handleMissionsUpdate),
    takeLatest(userSlice.coinsTransactionList.type, userHandler.handleCoinsTransactionList),
    takeLatest(userSlice.coinsBalance.type, userHandler.handleCoinsBalance),
    takeLatest(userSlice.coinsConsume.type, userHandler.handleCoinsConsume),
  ])
}