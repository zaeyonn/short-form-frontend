import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: null,
  isMobile: window.innerWidth <= 480,
  
  displayPopName: '',
  toast: null,
  navigationBar: {visible: true, title: 'Logo', leftBtn: {icon: 'icon_hamburger.svg', event: () => 0}, rightBtn: {icon: 'icon_search.svg', event: () => 0}},
  seriesPlayer: false,
  payments: null,

  series: {id: 0, title: '', description: '', poster_img: '', ep_count: 0, free_count: 0, keyword: [], req_point: 0, views: 0, keeps: 0, created_at: ''},
  seriesListTitle: '',
  seriesList: [],
  episodeList: [],
  productList: [],
  missionList: [],

  visibleBottomSheetLogin: false,
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
    setIsMobile(state: any, action: PayloadAction<any>) {
      state.isMobile = action.payload;
    },
    setDisplayPopName(state, action) {
      state.displayPopName = action.payload;
    },
    addToast: (state, action: PayloadAction<any>) => {
      state.toast = action.payload;
    },
    removeToast: (state) => {
      state.toast = null;
    },
    setNavigationBar(state, action) {
      state.navigationBar = action.payload;
    },
    seriesInfo(_state: any, _action: PayloadAction<any>) {},
    seriesInfoSuccess(state: any, action: PayloadAction<any>) {
      state.seriesInfoResult = action.payload
    },
    seriesInfoFailure(state: any, action: PayloadAction<any>) {
      state.seriesInfoError = action.payload
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
    episodeList(_state: any, _action: PayloadAction<any>) {},
    episodeListSuccess(state: any, action) {
      state.episodeListResult = action.payload;
      state.loading = false;
    },
    episodeListFailure(state: any, action) {
      state.episodeListResult = action.payload;
      state.loading = false;
    },
    setSeries(state: any, action) {
      state.series = action.payload;
    },
    setSeriesPlayer(state: any, action) {
      state.seriesPlayer = action.payload;
    },
    setAlert(state: any, action: PayloadAction<any>) {
      state.alert = action.payload;
    },
    setSeriesList(state: any, action: PayloadAction<any>) {
      state.seriesList = action.payload;
    },
    setSeriesListTitle(state: any, action: PayloadAction<any>) {
      state.seriesListTitle = action.payload;
    },
    increaseSeriesView(_state: any, _action: PayloadAction<any>) {},
    increaseSeriesViewSuccess(state: any, action: PayloadAction<any>) {
      state.increaseSeriesViewResult = action.payload;
    },
    increaseSeriesViewsFailure(state: any, action: PayloadAction<any>) {
      state.increaseSeriesViewError = action.payload;
    },
    setProductList(state: any, action: PayloadAction<any>) {
      state.productList = action.payload;
    }, 
    productList(_state: any, _action: PayloadAction<any>) {
    },
    productListSuccess(state: any, action: PayloadAction<any>) {
      state.productListResult = action.payload;
    },
    productListFailure(state: any, action: PayloadAction<any>) {
      state.productListError = action.payload;
    },
    toggleBottomSheetLogin(state: any, _action: PayloadAction<any>) {
      state.visibleBottomSheetLogin = !state.visibleBottomSheetLogin
    },
    setMissionList(state: any, action: PayloadAction<any>) {
      state.missionList = action.payload;
    }, 
    missionList(_state: any, _action: PayloadAction<any>) {
    },
    missionListSuccess(state: any, action: PayloadAction<any>) {
      state.missionListResult = action.payload;
    },
    missionListFailure(state: any, action: PayloadAction<any>) {
      state.missionListError = action.payload;
    },
  }
})

export const { 
  initGlobalState, clearGlobalState, setDisplayPopName, setNavigationBar, setIsMobile,
  setSeries, addToast, removeToast, setSeriesPlayer, setSeriesListTitle, setSeriesList,

  seriesList, seriesListSuccess, seriesListFailure,
  episodeList, episodeListSuccess, episodeListFailure,
  setAlert, seriesInfo, seriesInfoSuccess, seriesInfoFailure,
  increaseSeriesView, increaseSeriesViewSuccess, increaseSeriesViewsFailure,
  productList, productListSuccess, productListFailure, setProductList, toggleBottomSheetLogin,
  missionList, setMissionList, missionListSuccess, missionListFailure
} = globalSlice.actions;

export default globalSlice.reducer;

