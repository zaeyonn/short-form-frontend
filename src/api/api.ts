import client from './client';

/* Auth API */

// 게스트 사용자 등록
export const authGuest = () => client.post('auth/guest');

// 사용자 구글 인증
export const authSns = ({code, userId, authType}: any) => client.put(`auth/${authType}`, {
  user_id: userId,
  code: code,
  auth_type: authType,
});

/* User API */

// 사용자 정보 조회
export const userInfo = ({userId}: any) => client.get(`users/${userId}`);

// 사용자 시리즈 북마크 리스트
export const userSeriesKeepList = ({userId}: any) => client.get(`keeps/${userId}`);

// 사용자 시리즈 시청 리스트
export const userSeriesWatchList = ({userId}: any) => client.get(`watchs/${userId}`);

// 사용자 시리즈 시청 기록 조회
export const userSeriesProgress = ({userId, seriesId}: any) => client.get(`watchs?userId=${userId}&seriesId=${seriesId}`);

// 사용자 시리즈 시청 기록 추가
export const addSeriesProgress = ({userId, seriesId, ep, free_ep}: any) => client.post('watchs', {
  user_id: userId,
  series_id: Number(seriesId),
  last_episode: ep,
  unlock_episode: free_ep,
});

// 사용자 시리즈 진행 상태 업데이트
export const updateSeriesProgress = ({userId, seriesId, ep}: any) => client.put('watchs', {
  user_id: userId,
  series_id: seriesId,
  last_episode: ep,
});



// 사용자 시리즈 잠금 회차 업데이트
export const updateSeriesUnlockEpisode = ({userId, seriesId, ep}: any) => client.put('watchs/unlock', {
  user_id: userId,
  series_id: seriesId,
  last_episode: ep,
  unlock_episode: ep,
});


// 시리즈 북마크 추가
export const addSeriesKeep = ({userId, seriesId}: any) => client.post('keeps', {
  user_id: userId,
  series_id: seriesId
});


// 시리즈 북마크 삭제
export const removeSeriesKeep = ({userId, seriesIdList}: any) => client.delete('keeps', {
  data: {
    user_id: userId,
    series_id_list: seriesIdList
  }
});

// 사용자 코인 감소
export const usersPointDeduct = ({ userId, point }: any) => client.put('users/point/deduct', {
  user_id: userId,
  point,
});

// 사용자 프로필 업데이트
export const usersProfileUpdate = ({userId, nickname}: any) => client.put('users/profile', {
  user_id: userId,
  nickname: nickname,
});

/* Series API */

// 전체 시리즈 리스트
export const seriesList = () => client.get('series');


// 시리즈 정보 조회
export const seriesInfo = ({seriesId}: {seriesId: number}) => client.get(`series/${seriesId}`);


// 시리즈 조회수 증가
export const increaseSeriesViews = ({seriesId}: {seriesId: number}) => client.put(`series/views/${seriesId}`);


/* Episodes API */

// 시리즈의 에피소드 리스트
export const episodeList = ({seriesId}: any) => client.get(`episodes/${seriesId}`);


/* Payment API */

// 결제 요청
export const paymentsRegist = ({userId, productId, productType, amount, paidPoint, freePoint}: any) => client.post('payments', {
  user_id: userId,
  product_id: productId,
  product_type: productType, 
  amount: amount,
  paid_point: paidPoint,
  free_point: freePoint,
});

// 결제 승인
export const paymentsConfirm = ({ userId, orderId, amount, paymentKey }: any) => client.put('payments/confirm', {
  user_id: userId,
  order_id: orderId,
  amount: amount,
  payment_key: paymentKey
});

/* Product API */

// 전체 상품 리스트
export const productList = () => client.get('products');

/* attendance API */

// 출석 조회
export const attendance = ({ userId }: any) => client.get(`attendance/${userId}`);

// 출석 체크
export const attendanceCheck = ({ userId }: any) => client.post(`attendance/${userId}/check`);

/* Subscription API */

// 구독하기
interface subscribeParams {
  userId: string;
  productId: number;
}

export const subscribe = ({ userId, productId }: subscribeParams) => client.post(`subscriptions`, {
  user_id: userId,
  product_id: productId,
})

/* Mission API */

// 전체 미션 리스트
export const missionList = () => client.get('missions');

interface missionParams {
  userId: string;
  missionType: string;
}

// 사용자 미션 완료 
export const missionsComplete = ({ userId, missionType }: missionParams) => client.put('missions/complete', {
  user_id: userId,
  mission_type: missionType
})

// 사용자 미션 업데이트
export const missionsUpdate = ({ userId, missionType }: missionParams) => client.put('missions/update', {
  user_id: userId,
  mission_type: missionType
})