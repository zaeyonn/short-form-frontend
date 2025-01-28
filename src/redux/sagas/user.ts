import { PayloadAction } from "@reduxjs/toolkit";

import { call, put } from 'redux-saga/effects';
import * as slice from '../userSlice';
import * as api from '../../api/api';

export function* handleAuthGuest(): Generator<any> {
  try {
    const response = yield call(api.authGuest);
    console.log(`guest response: ${JSON.stringify(response)}`);

    yield put(slice.authGuestSuccess(response));
  } catch (error) {
    yield put(slice.authGuestFailure(error));
  }
}

export function* handleAuthGoogle(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.authGoogle, action.payload);
    
    yield put(slice.authGoogleSuccess(response));
  } catch (error) {
    yield put(slice.authGoogleFailure(error));
  }
}

export function* handleUserInfo(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.userInfo, action.payload);

    yield put(slice.userInfoSuccess(response));
  } catch (error) {
    yield put(slice.userInfoFailure(error));
  }
}

export function* handleAddSeriesKeep(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.addSeriesKeep, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.addSeriesKeepSuccess(response));
  } catch (error) {
    yield put(slice.addSeriesKeepFailure(error));
  }
}

export function* handleRemoveSeriesKeep(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.removeSeriesKeep, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.removeSeriesKeepSuccess(response));
  } catch (error) {
    yield put(slice.removeSeriesKeepFailure(error));
  }
}



export function* handleUserSeriesKeepList(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.userSeriesKeepList, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.userSeriesKeepListSuccess(response));
  } catch (error) {
    yield put(slice.userSeriesKeepListFailure(error));
  }
}

export function* handleUserSeriesWatchList(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.userSeriesWatchList, action.payload);

    yield put(slice.userSeriesWatchListSuccess(response));
  } catch (error) {
    yield put(slice.userSeriesWatchListFailure(error));
  }
}

export function* handleUserSeriesProgress(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.userSeriesProgress, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.userSeriesProgressSuccess(response));
  } catch (error) {
    yield put(slice.userSeriesProgressFailure(error));
  }
}

export function* handleAddSeriesProgress(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.addSeriesProgress, action.payload);
    console.log(`resposne: ${JSON.stringify(response)}`);

    yield put(slice.addSeriesProgressSuccess(response));
  } catch (error) {
    yield put(slice.addSeriesProgressFailure(error));
  }
}

export function* handleUpdateSeriesProgress(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.updateSeriesProgress, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.updateSeriesProgressSuccess(response));
  } catch (error) {
    yield put(slice.updateSeriesProgressFailure(error));
  }
}

export function* handleUpdateSeriesUnlockEpisode(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.updateSeriesUnlockEpisode, action.payload);

    yield put(slice.updateSeriesUnlockEpisodeSuccess(response));
  } catch (error) {
    yield put(slice.updateSeriesUnlockEpisodeFailure(error));
  }
}