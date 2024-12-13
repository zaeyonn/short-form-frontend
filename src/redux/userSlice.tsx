import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

    nickName: "게스트",
    uid: "adfsadfasdfasfd",
    point: 100000000,

    listVideoWatched: ["resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg", "resources/icons/icon_profile.svg"],
  },
  reducers: {

  }
});

export const {

} = userSlice.actions;
export default userSlice.reducer;