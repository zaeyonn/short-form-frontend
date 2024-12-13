// app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalReducer from '../redux/globalSlice';
import userReducer from '../redux/userSlice';

const reducer = combineReducers({
    global: globalReducer,
    user: userReducer,
})

export const store = configureStore({
  reducer: reducer
});

// RootState 및 AppDispatch 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;