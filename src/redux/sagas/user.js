import { call, put } from 'redux-saga/effects';
import * as slice from '../userSlice';
import * as api from '../../api/api';

export function* handleAuthGuest() {
  try {
    const response = yield call(api.authGuest);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.authGuestSuccess(response));
  } catch (error) {
    yield put(slice.authGuestFailure(error));
  }
}

export function* handleUserInfo() {
  try {
    const response = yield call(api.userInfo);

    yield put(slice.userInfoSuccess(response));
  } catch (error) {
    yield put(slice.userInfoFailure(error));
  }
}

export function* handleAddSeriesKeep(action) {
  try {
    const response = yield call(api.addSeriesKeep, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.addSeriesKeepSuccess(response));
  } catch (error) {
    yield put(slice.addSeriesKeepFailure(error));
  }
}

export function* handleRemoveSeriesKeep(action) {
  try {
    const response = yield call(api.removeSeriesKeep, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.removeSeriesKeepSuccess(response));
  } catch (error) {
    yield put(slice.removeSeriesKeepFailure(error));
  }
}



export function* handleUserSeriesKeepList(action) {
  try {
    const response = yield call(api.userSeriesKeepList, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.userSeriesKeepListSuccess(response));
  } catch (error) {
    yield put(slice.userSeriesKeepListFailure(error));
  }
}

export function* handleUserSeriesProgress(action) {
  try {
    const response = yield call(api.userSeriesProgress, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.userSeriesProgressSuccess(response));
  } catch (error) {
    yield put(slice.userSeriesProgressFailure(error));
  }
}

export function* handleAddSeriesProgress(action) {
  try {
    const response = yield call(api.addSeriesProgress, action.payload);
    console.log(`resposne: ${JSON.stringify(response)}`);

    yield put(slice.addSeriesProgressSuccess(response));
  } catch (error) {
    yield put(slice.addSeriesProgressFailure(error));
  }
}

export function* handleUpdateSeriesProgress(action) {
  try {
    const response = yield call(api.updateSeriesProgress, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.updateSeriesProgressSuccess(response));
  } catch (error) {
    yield put(slice.updateSeriesProgressFailure(error));
  }
}