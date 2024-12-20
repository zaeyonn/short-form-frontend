import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // ui
  displayPopName: '',
  uiPopName: '',
  navigationBar: {visible: true, title: 'Logo', leftBtn: {icon: 'icon_hamburger.svg', event: () => 0}, rightBtn: {icon: 'icon_search.svg', event: () => 0}},

  // login state
  isLogin: false,

  selectedSeries: null,
  seriesList: [],
  episodeList: [],
}

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    initGlobalState() {
      return { ...initialState };
    },
    clearGlobalState(state: any, action) {
      state[action.payload] = null;
    },
    setDisplayPopName(state, action) {
      console.log(action.payload);
      state.displayPopName = action.payload;
    },
    setUiPopName(state, action) {
      state.uiPopName = action.payload;
    },
    setNavigationBar(state, action) {
      state.navigationBar = action.payload;
    },
    setLoginState(state, action) {
      state.isLogin = action.payload;
    },
    seriesList(state) {
      state.loading = true;
    },
    seriesListSuccess(state: any, action) {
      state.seriesListResult = action.payload;
      state.loading = false;
    },
    seriesListFailure(state: any, action) {
      state.seriesListError = action.payload;
      state.loading = false;
    },
    episodeList(state) {
      state.loading = true;
    },
    episodeListSuccess(state: any, action) {
      state.episodeListResult = action.payload;
      state.loading = false;
    },
    episodeListFailure(state: any, action) {
      state.episodeListResult = action.payload;
      state.loading = false;
    },
    setSelectedSeries(state: any, action) {
      state.selectedSeries = action.payload;
    }
  }
})

export const { 
  initGlobalState, clearGlobalState, setDisplayPopName, setUiPopName, setNavigationBar, setLoginState,
  setSelectedSeries,

  seriesList, seriesListSuccess, seriesListFailure,
  episodeList, episodeListSuccess, episodeListFailure
} = globalSlice.actions;

export default globalSlice.reducer;

