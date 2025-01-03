export interface UserRootState {
  user: any

  loading: boolean,

  seriesWatchList: any[],
  seriesKeepList: any[],

  userInfoResult: any,
  userInfoError: any,
}