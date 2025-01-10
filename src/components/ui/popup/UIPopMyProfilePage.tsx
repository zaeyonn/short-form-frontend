import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';

import UIBottomSheetLogin from '../UIBottomSheetLogin';
import UISmallContentSlider from '../UISmallContentSlider';

const UIPopMyProfile = () => {
  const dispatch = useDispatch();

  const { 
    user, seriesWatchList, authLoginGoogleResult, authLoginGoogleError,
    userSeriesWatchListResult, userSeriesWatchListError,
   } = useSelector((state: any) => state.user);
  
  const loginSheetRef = useRef<any>(null);

  const [visibleLoginBottomSheet, setVisibleLoginBottomSheet] = useState(false);
  
  const handleButtonClick = (displayPopName: string) => {
    dispatch(globalSlice.setDisplayPopName(displayPopName));
  }

  const handleLoginBottomSheetOpen = () => {
    setVisibleLoginBottomSheet(true);
  }

  const handleLoginBottomSheetClose = () => {
    setVisibleLoginBottomSheet(false);
  }

  const handleLogout = () => {
    dispatch(userSlice.authGuest());
  }

  const signInProcess = (code: string, authType: string) => {
    console.log('signInProcess code, authType', code, authType);
    dispatch(userSlice.authLoginGoogle({code, userId: user.id, authType}));
  }

  // SNS 로그인 결과
  useEffect(() => {
    if(authLoginGoogleError) {
      console.log('authLoginGoogleError ', authLoginGoogleError);
      setVisibleLoginBottomSheet(false);
        
      dispatch(userSlice.clearUserState('authLoginGoogleError'));
    }
  
    if(authLoginGoogleResult && authLoginGoogleResult.data.code === 201) {
      console.log('authLoginGoogleResult ', authLoginGoogleResult);
      const { user } = authLoginGoogleResult.data.data;
      
      if(loginSheetRef.current) loginSheetRef.current.handleClose();
      dispatch(userSlice.setUser(user))

      localStorage.setItem('user-id', user.id);

      dispatch(userSlice.clearUserState('authLoginGoogleResult'));
      return;
    }
  }, [authLoginGoogleResult, authLoginGoogleError]);


  // 사용자 시청 기록 조회 결과
  useEffect(() => {
    if(userSeriesWatchListError) {
      console.log('userSeriesWatchListError ', userSeriesWatchListError);

      dispatch(userSlice.clearUserState('userSeriesWatchListError'));
      return;
    }

    if(userSeriesWatchListResult && userSeriesWatchListResult.data.code === 200) {
      console.log('userSeriesWatchListResult ', userSeriesWatchListResult);
      const { watch_list } = userSeriesWatchListResult.data.data;
      
      dispatch(userSlice.setSeriesWatchList(watch_list));

      dispatch(userSlice.clearUserState('userSeriesWatchListResult'));
      return;
    }

  }, [userSeriesWatchListResult, userSeriesWatchListError])

  useEffect(() => {
    
    // 사용자 시청 기록 조회
    dispatch(userSlice.userSeriesWatchList({ userId: user.id }));

  }, []);

  return (
    <>
      <div className='popup-wrap'>
        <div className='header'>
          <div className="left-section">
            <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={() => handleButtonClick('')}/>
          </div>
        </div>
        <div className='profile-wrap'>
          <div className='profile'>
            <div className='profile-img'>
            {/* <img src='resources/icons/icon_profile.svg'/> */}
            </div>
            {(user.auth === 'guest') ? (
              <div className='nickname' onClick={handleLoginBottomSheetOpen}>
                로그인을 해주세요
                <img src='resources/icons/icon_arrow_right_s.svg'/>
              </div>
            ) : (      
              <div>     
              <div className='nickname'>
                {`${user.nickname}님`}
                <img src='resources/icons/icon_arrow_right_s.svg'/>
              </div>
              <div className='email'>{user.email}</div>
              </div> 
            )}       
          </div>
          { user.auth !== 'guest' && (
          <div className='wallet'>
            <div className='head'>
              내 지갑
              <img src='resources/icons/icon_arrow_right_s.svg'/>
            </div>
            <div className='divider'></div>
            <div className='point'>
              <div className='my-point'>
                <img src='resources/icons/icon_point.svg'/>
                <span>{`${user.paid_point + user.free_point}`}</span>
              </div>
              <button>
                충전하기
              </button>
            </div>
          </div>
          )}
        <div className='view-list'>   
          <div className='head'>
            내 시청 기록
          </div>
          {(seriesWatchList.length === 0) ? (
              <div className='no-content'>
                저장된 기록이 없습니다.
              </div>
          ) : (
            <div style={{marginTop: 14}}>
              <UISmallContentSlider
                contentList={seriesWatchList}
                highlight=''/>
            </div>
          )}
        </div>
        <div className='setting'>
          <div className='head'>설정</div>
          <div className='menu-list'>
            <div>
              미션 또는 이벤트
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div>
              고객 센터
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div>
              설정
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div>
              회사 소개
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div onClick={handleLogout}>
              로그아웃
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
          </div>
        </div>
        </div>
      </div>

      <UIBottomSheetLogin
      ref={loginSheetRef}
      visible={visibleLoginBottomSheet}
      signInProcess={signInProcess}
      handleLoginBottomSheetClose={handleLoginBottomSheetClose}/>
    </>
  );
};

export default UIPopMyProfile;