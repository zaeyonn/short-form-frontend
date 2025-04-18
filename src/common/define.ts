export const displayPopType = {
  POPUP_PAYMENT_PRODUCT_LIST: { name: "POPUP_PAYMENT_PRODUCT_LIST" },
  POPUP_LOGIN: { name: "POPUP_LOGIN" },
}

export const authType: any = {
  'guest': { name: '게스트' },
  'google': { name: '구글' },
  'kakao': { name: '카카오' },
  'meta': { name: '메타' }
}

export const subscriptionType: any = {
  'weekly': { name: '주간 패스권' },
  'monthly': { name: '월간 패스권' },
  'annual': { name: '연간 패스권' }, 
}

export const missionType: any = {
  'watch_ad': { name: '매일 광고 보기', btn_label: '광고 보기' },
  'watch_ep': { name: '매일 에피소드 10편 보기', btn_label: '시청 하기' },
  'share_ep': { name: '매일 에피소드 공유하기', btn_label: '공유 하기' },
  'connect_sns': { name: '계정 연결하기', btn_label: '계정 연결' },
  'set_alarm': { name: '알림 받기', btn_label: '알림 받기' }
}

export const coinTransactionsType: any = {
  'attendance_earn': { name: '출석 보상'},
  'mission_earn': { name: '미션 보상'},
  'payment_earn': { name: '코인 구매'},
  'payment_event_earn': { name: '코인 구매 보너스'}
}
