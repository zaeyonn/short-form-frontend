import { PayloadAction } from "@reduxjs/toolkit";

import { call, put } from 'redux-saga/effects';
import * as slice from '../globalSlice';
import * as api from '../../api/api';


export function* handleSeriesList(): Generator<any> {
  try {
    const response = yield call(api.seriesList);

    yield put(slice.seriesListSuccess(response));
  } catch (error) {
    yield put(slice.seriesListFailure(error));
  }
}

export function* handleSeriesInfo(action: PayloadAction<any>): Generator<any>  {
  try {
    const response = yield call(api.seriesInfo, action.payload);

    yield put(slice.seriesInfoSuccess(response));
  } catch (error) {
    yield put(slice.seriesInfoFailure(error));
  }
}

export function* handleEpisodeList(action: PayloadAction<any>): Generator<any> {
  try {
    const response = yield call(api.episodeList, action.payload);
    console.log(`response: ${JSON.stringify(response)}`);

    yield put(slice.episodeListSuccess(response));
  } catch (error) {
    yield put(slice.episodeListFailure(error));
  }
}