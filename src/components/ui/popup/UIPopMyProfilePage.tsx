import { useSelector, useDispatch } from 'react-redux';
import { displayPopType } from 'src/common/define';
import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';
import { useEffect, useRef } from 'react';
import UISmallContentSlider from '../UISmallContentSlider';

const UIPopMyProfile = () => {
  const { isLogin } = useSelector((state: any) => state.global);
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

  return (
    <>
      <div className='popup-wrap'>
        <div className='header-nonfixed'>
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
            contentList={user.seriesWatchList}
            headerTitle='시청 기록'
            highlight=''
            handleShortFormOpen={()=>{}}/>
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