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
  
    // user
    takeLatest(userSlice.authGuest.type, userHandler.handleAuthGuest),
    takeLatest(userSlice.authLoginGoogle.type, userHandler.handleauthLoginGoogle),
    takeLatest(userSlice.addSeriesKeep.type, userHandler.handleAddSeriesKeep),
    takeLatest(userSlice.removeSeriesKeep.type, userHandler.handleRemoveSeriesKeep),
    takeLatest(userSlice.userSeriesKeepList.type, userHandler.handleUserSeriesKeepList),
    takeLatest(userSlice.userSeriesWatchList.type, userHandler.handleUserSeriesWatchList),
    takeLatest(userSlice.userSeriesProgress.type, userHandler.handleUserSeriesProgress),
    takeLatest(userSlice.addSeriesProgress.type, userHandler.handleAddSeriesProgress),
    takeLatest(userSlice.updateSeriesProgress.type, userHandler.handleUpdateSeriesProgress),
    takeLatest(userSlice.userInfo.type, userHandler.handleUserInfo),
    takeLatest(userSlice.updateSeriesUnlockEpisode.type, userHandler.handleUpdateSeriesUnlockEpisode)
  ])
}