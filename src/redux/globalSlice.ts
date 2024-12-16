import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  // ui
  displayPopName: '',
  navigationBar: {title: 'Logo', leftBtn: {icon: 'icon_hamburger.svg', event: () => 0}, rightBtn: {icon: 'icon_search.svg', event: () => 0}},

  // login state
  isLogin: false,
}

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    initGlobalState() {
      return { ...initialState };
    },
    setDisplayPopName(state, action) {
      console.log(action.payload);
      state.displayPopName = action.payload;
    },
    setNavigationBar(state, action) {
      state.navigationBar = action.payload;
    },
    setLoginState(state, action) {
      state.isLogin = action.payload;
    }
  }
})

export const { initGlobalState, setDisplayPopName, setNavigationBar, setLoginState } = globalSlice.actions;
export default globalSlice.reducer;

