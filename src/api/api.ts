import client from 'api/client';

// 게스트 사용자 등록
export const authGuest = () => client.post('auth/guest');

// 전체 시리즈 리스트
export const seriesList = () => client.get('series/list');

// 시리즈의 숏폼 리스트
export const episodeList = ({seriesId}: any) => client.get(`/episodes/list?seriesId=${seriesId}`);

// 시리즈 북마크 추가
export const addSeriesKeep = ({userId, seriesId}: any) => client.post('/series/keep', {
  user_id: userId,
  series_id: seriesId
})