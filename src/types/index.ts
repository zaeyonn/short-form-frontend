export interface UserRootState {
  user: any

  loading: boolean,

  seriesWatchList: any[],
  seriesKeepList: any[],

  userInfoResult: any,
  userInfoError: any,
}


export type User = {
  id: string,
  nickname: string,
  auth: string,
  email: string,
  profile_img: string,
  paid_point: number,
  free_point: number,
  created_at: Date;
}

export type Series = {
  id: number,
  title: string,
  description: string,
  poster_img: string,
  horizontal_poster_img: string,
  ep_count: number, // 전체 에피소드 회차 수
  free_count: number, // 무료 에피소드 회차 수
  keyword: string [], // 키워드 목록
  req_point: number // 한 회당 요구 포인트
  views: number // 조회 수
  keeps: number // 북마크 수
  created_at: string // 등록 날짜
}

export type PaymentProduct = {
  id: number,
  amount: number,
  paid_point: number,
  free_point: number
}