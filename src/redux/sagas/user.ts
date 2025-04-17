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

export function* handleAuthSns(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.authSns, action.payload);
    
    yield put(slice.authSnsSuccess(response));
  } catch (error) {
    yield put(slice.authSnsFailure(error));
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

export function* handlePaymentsRegist(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.paymentsRegist, action.payload);

    yield put(slice.paymentsRegistSuccess(response));
  } catch (error) {
    yield put(slice.paymentsRegistFailure(error));
  }
}

export function* handlePaymentsConfirm(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.paymentsConfirm, action.payload);

    yield put(slice.paymentsConfirmSuccess(response));
  } catch (error) {
    yield put(slice.paymentsConfirmFailure(error));
  }
}

export function* handleUsersPointDeduct(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.usersPointDeduct, action.payload);

    yield put(slice.usersPointDeductSuccess(response));
  } catch (error) {
    yield put(slice.usersPointDeductFailure(error));
  }
}

export function* handleattendance(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.attendance, action.payload);

    yield put(slice.attendanceSuccess(response));
  } catch (error) {
    yield put(slice.attendanceFailure(error));
  }
}

export function* handleattendanceCheck(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.attendanceCheck, action.payload);

    yield put(slice.attendanceCheckSuccess(response));
  } catch (error) {
    yield put(slice.attendanceCheckFailure(error));
  }
}

export function* handleSubscribe(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.subscribe, action.payload);

    yield put(slice.subscribeSuccess(response));
  } catch (error) {
    yield put(slice.subscribeFailure(error));
  }
}

export function* handleUsersProfileUpdate(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.usersProfileUpdate, action.payload);

    yield put(slice.usersProfileUpdateSuccess(response));
  } catch (error) {
    yield put(slice.usersProfileUpdateFailure(error));
  }
}

export function* handleMissionsComplete(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.missionsComplete, action.payload);

    yield put(slice.missionsCompleteSuccess(response));
  } catch (error) {
    yield put(slice.missionsCompleteFailure(error));
  }
}

export function* handleMissionsUpdate(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.missionsUpdate, action.payload);

    yield put(slice.missionsUpdateSuccess(response));
  } catch (error) {
    yield put(slice.missionsUpdateFailure(error));
  }
}

export function* handleCoinTransactionList(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.coinTransactionList, action.payload);

    yield put(slice.coinTransactionListSuccess(response));
  } catch (error) {
    yield put(slice.coinTransactionListFailure(error));
  }
}