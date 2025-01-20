import client from 'api/client';

/* Auth API */

// 게스트 사용자 등록
export const authGuest = () => client.post('users/guest');

// SNS 사용자 로그인
export const authLoginGoogle = ({code, userId, authType}: any) => client.put('auth/login/google', {
  user_id: userId,
  code: code,
  auth_type: authType,
});

/* User API */

// 사용자 정보 조회
export const userInfo = ({userId}: any) => client.get(`users/info?userId=${userId}`);

// 사용자 시리즈 북마크 리스트
export const userSeriesKeepList = ({userId}: any) => client.get(`users/keep?userId=${userId}`);

// 사용자 시리즈 시청 리스트
export const userSeriesWatchList = ({userId}: any) => client.get(`users/watch?userId=${userId}`);

// 사용자 시리즈 진행 상태 조회
export const userSeriesProgress = ({userId, seriesId}: any) => client.get(`users/series-progress?userId=${userId}&seriesId=${seriesId}`);

// 사용자 시리즈 진행 상태 추가
export const addSeriesProgress = ({userId, seriesId, ep, free_ep}: any) => client.post('users/series-progress', {
  user_id: userId,
  series_id: seriesId,
  ep: ep,
  free_ep: free_ep,
});

// 사용자 시리즈 진행 상태 업데이트
export const updateSeriesProgress = ({userId, seriesId, ep}: any) => client.put('users/series-progress', {
  user_id: userId,
  series_id: seriesId,
  ep: ep,
});


// 사용자 시리즈 잠금 회차 업데이트
export const updateSeriesUnlockEpisode = ({userId, seriesId, ep}: any) => client.put('users/unlock-episode', {
  user_id: userId,
  series_id: seriesId,
  ep: ep,
});

// 시리즈 북마크 추가
export const addSeriesKeep = ({userId, seriesId}: any) => client.post('users/keep', {
  user_id: userId,
  series_id: seriesId
});

// 시리즈 북마크 삭제
export const removeSeriesKeep = ({userId, seriesIdList}: any) => client.delete('users/keep', {
  data: {
    user_id: userId,
    series_id_list: seriesIdList
  }
});



/* Series API */

// 전체 시리즈 리스트
export const seriesList = () => client.get('series');

// 시리즈 정보 조회
export const seriesInfo = ({seriesId}: {seriesId: number}) => client.get(`series/${seriesId}`);

/* Episodes API */

// 시리즈의 에피소드 리스트
export const episodeList = ({seriesId}: any) => client.get(`episodes/list?seriesId=${seriesId}`);


