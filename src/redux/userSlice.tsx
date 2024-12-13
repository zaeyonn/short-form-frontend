// features/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// slice 생성
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uid: "adfsadfasdfasfd",
    point: 9999999,
  },
  reducers: {

  }
});

export const {

} = userSlice.actions;
export default userSlice.reducer;