import { useSelector, useDispatch } from 'react-redux';
import { displayPopType } from 'src/common/define';
import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';
import { useEffect, useRef } from 'react';
import UISmallContentSlider from '../UISmallContentSlider';

const UIPopMyProfile = () => {
  const { displayPopName } = useSelector((state: any) => state.global);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleButtonClick = (displayPopName: string) => {
    dispatch(globalSlice.setDisplayPopName(displayPopName));
  }

  const handleClose = () => {
    const navBar = {
      title: 'Logo',
      leftBtn: {
        icon: 'icon_hamburger.svg',
      },
      rightBtn: {
        icon: 'icon_search.svg',
        event: () => 0,
      },
      loginBtn: true
    }
    dispatch(globalSlice.setDisplayPopName(''));
    dispatch(globalSlice.setNavigationBar(navBar));
  }


  useEffect(() => {
    const navBar = {
      title: 'My profile',
      leftBtn: {
        icon: 'icon_arrow_left_m.svg',
        event: handleClose
      },
      rightBtn: {
        icon: 'icon_kebab.svg',
        event: () => 0,
      }
    }

    dispatch(globalSlice.setNavigationBar(navBar));
  }, [])

  const isFirstTime = useRef<boolean>(false);
  useEffect(() => {
    if(isFirstTime.current) 
      return;

    isFirstTime.current = true;

    //test
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다1.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다2.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다3.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다4.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다5.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다6.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다7.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다8.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다9.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다10.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다11.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다12.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다13.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다14.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다15.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다16.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다17.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다18.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다19.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다20.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다21.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다22.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다23.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다24.', keyword: [], url: 'resources/images/main_poster_3.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다25.', keyword: [], url: 'resources/images/main_poster_1.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다26.', keyword: [], url: 'resources/images/main_poster_2.png'}));
    dispatch(userSlice.addVideoWatched({ title: '차곡 차곡 사랑하고 있습니다27.', keyword: [], url: 'resources/images/main_poster_3.png'}));
  }, [])

  return (
    <>
    <div className='popup-wrap'>
    <div className='profile'>   
        <img src='resources/icons/icon_profile.svg' style={{float:'left'}}/>
        <div className='userinfo'>{`게스트\nUID ${user.uid}`}</div> 
        <button className='login' onClick={() => handleButtonClick(displayPopType.POPUP_LOGIN.name)}>로그인</button>
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