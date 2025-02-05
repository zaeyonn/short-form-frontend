import client from 'api/client';

/* Auth API */

// 게스트 사용자 등록
export const authGuest = () => client.post('api/auth/guest');

// 사용자 구글 인증
export const authGoogle = ({code, userId, authType}: any) => client.put('api/auth/google', {
  user_id: userId,
  code: code,
  auth_type: authType,
});

/* User API */

// 사용자 정보 조회
export const userInfo = ({userId}: any) => client.get(`api/users/${userId}`);

// 사용자 시리즈 북마크 리스트
export const userSeriesKeepList = ({userId}: any) => client.get(`api/keeps/${userId}`);

// 사용자 시리즈 시청 리스트
export const userSeriesWatchList = ({userId}: any) => client.get(`api/watchs/${userId}`);

// 사용자 시리즈 시청 기록 조회
export const userSeriesProgress = ({userId, seriesId}: any) => client.get(`api/watchs?userId=${userId}&seriesId=${seriesId}`);

// 사용자 시리즈 시청 기록 추가
export const addSeriesProgress = ({userId, seriesId, ep, free_ep}: any) => client.post('api/watchs', {
  user_id: userId,
  series_id: Number(seriesId),
  last_episode: ep,
  unlock_episode: free_ep,
});

// 사용자 시리즈 진행 상태 업데이트
export const updateSeriesProgress = ({userId, seriesId, ep}: any) => client.put('api/watchs', {
  user_id: userId,
  series_id: seriesId,
  last_episode: ep,
});



// 사용자 시리즈 잠금 회차 업데이트
export const updateSeriesUnlockEpisode = ({userId, seriesId, ep}: any) => client.put('api/watchs/unlock', {
  user_id: userId,
  series_id: seriesId,
  last_episode: ep,
  unlock_episode: ep,
});


// 시리즈 북마크 추가
export const addSeriesKeep = ({userId, seriesId}: any) => client.post('api/keeps', {
  user_id: userId,
  series_id: seriesId
});


// 시리즈 북마크 삭제
export const removeSeriesKeep = ({userId, seriesIdList}: any) => client.delete('api/keeps', {
  data: {
    user_id: userId,
    series_id_list: seriesIdList
  }
});




/* Series API */

// 전체 시리즈 리스트
export const seriesList = () => client.get('api/series');


// 시리즈 정보 조회
export const seriesInfo = ({seriesId}: {seriesId: number}) => client.get(`api/series/${seriesId}`);


// 시리즈 조회수 증가
export const increaseSeriesViews = ({seriesId}: {seriesId: number}) => client.put(`api/series/views/${seriesId}`);


/* Episodes API */

// 시리즈의 에피소드 리스트
export const episodeList = ({seriesId}: any) => client.get(`api/episodes/${seriesId}`);


