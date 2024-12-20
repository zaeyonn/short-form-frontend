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

export function* handleAddSeriesKeep(action) {
  try {
    const response = yield call(api.addSeriesKeep, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.addSeriesKeepSuccess(response));
  } catch (error) {
    yield put(slice.addSeriesKeepFailure(error));
  }
}