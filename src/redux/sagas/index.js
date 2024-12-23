import { takeLatest, all } from 'redux-saga/effects';
import * as globalHandler from './global';
import * as globalSlice from '../globalSlice';
import * as userHandler from './user';
import * as userSlice from '../userSlice';

export function* watcherSaga() {
  yield all([
    // global
    takeLatest(globalSlice.episodeList.type, globalHandler.handleEpisodeList),
    takeLatest(globalSlice.seriesList.type, globalHandler.handleSeriesList),
  
    // user
    takeLatest(userSlice.authGuest.type, userHandler.handleAuthGuest),
    takeLatest(userSlice.addSeriesKeep.type, userHandler.handleAddSeriesKeep),
    takeLatest(userSlice.removeSeriesKeep.type, userHandler.handleRemoveSeriesKeep),
    takeLatest(userSlice.userSeriesKeepList.type, userHandler.handleUserSeriesKeepList)
  ])
}