export interface UserRootState {
  user: any,
  coins: any,

  loading: boolean,

  seriesWatchList: any[],
  seriesKeepList: any[],

  userInfoResult: any,
  userInfoError: any,

  paymentProduct: Product | null,

  subscription: Subscription | null,

  userMissionList: UserMission [],

  coinsTransactionListResult: Response | null,
  coinsTransactionListError: Response | null,
  coinsBalanceResult: Response | null,
  coinsBalanceError: Response | null,
  coinsConsumeResult: Response | null,
  coinsConsumeError: Response | null,
}

export interface GlobalRootState {
  loading: boolean,
  alert: any,
  isMobile: boolean,
  
  displayPopName: string,
  toast: any,
  navigationBar: any,
  seriesPlayer: boolean,
  payments: any,

  series: Series,
  seriesListTitle: string,
  seriesList: Series [],
  episodeList: Episode [],
  productList: Product [],
  missionList: Mission [],

  visibleBottomSheetLogin: false,
}


export type User = {
  id: string,
  nickname: string,
  auth: string,
  email: string,
  profile_img: string,
  paid_coin: number,
  free_coin: number,
  created_at: Date;
  userMissions: UserMission [];
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
  req_point: number // 한 회당 요구 코인
  views: number // 조회 수
  keeps: number // 북마크 수
  created_at: string // 등록 날짜
}

export type Episode = {
  title: string | null;
  video: string;
  description: string | null;
  episode_num: number;
  series_id: number;
  thumbnail_img: string | null;
  created_at: string;
  id: number;
}

export type Product = {
  id: number,
  name: string,
  amount: number,
  paid_coin: number,
  free_coin: number,
  discount_rate: number,
  first_charging_event: boolean,
  description: string,
  is_active: boolean,
  type: string,
  created_at: string,
  updated_at: string,
}

export type Subscription = {
  id: number;
  user_id: string;
  product_id: number;
  status: string;
  start_date: Date,
  end_date: Date,
  duration: string,
}

export type Mission = {
  id: number;
  type: string;
  description: string | null;
  repeat_cycle: string;
  reward: number | null;
  target_value: number;
  is_active: boolean;
  user_type: string;
  created_at: string;
}

export type UserMission = {
  id: number;
  progress_value: number;
  completed_at: Date | null;
  created_at: Date;
  mission_id: number;
  status: string;
  user_id: string;
}

export type CoinTransaction = {
  id: number;
  type: string;
  source_type: string;
  coin: number;
  coin_type: string;
  related_id: number;
  description: string | null;
  created_at: Date;
  user_id: string;
}

