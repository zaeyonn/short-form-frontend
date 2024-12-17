import { useSelector, useDispatch } from 'react-redux';
import { displayPopType } from 'src/common/define';
import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';
import { useEffect, useRef } from 'react';
import UISmallContentSlider from '../UISmallContentSlider';

const UIPopMyProfile = () => {
  const { displayPopName, isLogin } = useSelector((state: any) => state.global);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleButtonClick = (displayPopName: string) => {
    dispatch(globalSlice.setDisplayPopName(displayPopName));
  }

  const handleLogInOut = () => {
    if(isLogin) {
      return;
    }
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_LOGIN.name));
  }

  const isFirstTime = useRef<boolean>(false);
  useEffect(() => {
    if(isFirstTime.current) 
      return;

    isFirstTime.current = true;

    //test
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 1, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 2, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 3, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 4, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 5, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 6, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 7, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 8, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 9, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 10, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 11, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 12, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 13, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 14, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 15, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다.', keyword: [], url: 'resources/images/main_poster_1.png', full_ep: 30, cur_ep: 16, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '웹 너무 어지럽다.', keyword: [], url: 'resources/images/main_poster_2.png', full_ep: 27, cur_ep: 1, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '웹 너무 어지럽다.', keyword: [], url: 'resources/images/main_poster_2.png', full_ep: 27, cur_ep: 2, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '웹 너무 어지럽다.', keyword: [], url: 'resources/images/main_poster_2.png', full_ep: 27, cur_ep: 3, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '웹 너무 어지럽다.', keyword: [], url: 'resources/images/main_poster_2.png', full_ep: 27, cur_ep: 4, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '웹 너무 어지럽다.', keyword: [], url: 'resources/images/main_poster_2.png', full_ep: 27, cur_ep: 5, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 1, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 2, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 3, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 4, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 5, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 6, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 7, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 8, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 9, bookmark: false,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 10, bookmark: true,}));
    dispatch(userSlice.addVideoWatched({ title: '퇴근하고 싶다.', keyword: [], url: 'resources/images/main_poster_3.png', full_ep: 15, cur_ep: 11, bookmark: true,}));
  }, [])

  return (
    <>
      <div className='popup-wrap'>
        <div className='header'>
          <div className="left-section">
            <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={() => handleButtonClick('')}/>
            <span className="title">프로필</span>
          </div>
        </div>

        <div className='profile'>   
          <img src='resources/icons/icon_profile.svg'/>
          <div className='userinfo'>{`게스트\nUID ${user.uid}`}</div> 

          <button className='login' onClick={handleLogInOut}>{isLogin ? '로그아웃' : '로그인'}</button>
        </div>

        <div className='wallet'>
          <div className='head'>내지갑</div>
          <div className='body'>
            <div>{`${user.point}`}</div>
            <button className='purchase-point' onClick={() => handleButtonClick(displayPopType.POPUP_PURCHASE_POINT.name)}>충전</button>
          </div>
        </div>

        <div className='viewrlist'>
          <UISmallContentSlider
            headerTitle='시청 기록'
            contentList={user.listVideoWatched}
            highlight=''/>
        </div>

        <div className='profile-etc'>
          <button>
            <img src="resources/icons/icon_play_main.svg"/>
            <div>미션 또는 이벤트</div>
            <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
          </button>

          <button>
            <img src="resources/icons/icon_play_main.svg"/>
            <div>고객 센터</div>
            <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
          </button>

          <button>
            <img src="resources/icons/icon_play_main.svg"/>
            <div>설정</div>
            <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
          </button>

          <button>
            <img src="resources/icons/icon_play_main.svg"/>
            <div>회사 소개</div>
            <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
          </button>
        </div>
      </div>
    </>
  );
};

export default UIPopMyProfile;