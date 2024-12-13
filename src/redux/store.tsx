// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // 슬라이스 리듀서를 등록
  },
});

// RootState 및 AppDispatch 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;