import { useSelector, useDispatch } from 'react-redux';
import { displayPopType } from 'src/common/define';
import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';
import { useEffect, useRef } from 'react';
import UISmallContentSlider from '../UISmallContentSlider';

const UIPopMyProfile = () => {
  const { isLogin } = useSelector((state: any) => state.global);
  const { user, seriesWatchList } = useSelector((state: any) => state.user);
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

  useEffect(() => {
    console.log(`user : ${JSON.stringify(user)}`);
  }, [user])

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
          <div className='userinfo'>{`${user.nickname}\nUID ${user.id}`}</div> 
        </div>

        <div className='wallet'>
          <div className='over-section'>
            <div>보유한 포인트</div>
              <div className='point-body'>
                <div className='point'>{`${user.paid_point + user.free_point}`}</div>
                <img src='resources/icons/icon_point.svg'/>
              </div>
          </div>

          <div className='under-section'>
            <div>포인트 구매하기</div>
            <img src="resources/icons/icon_purchase.svg" className='purchase-point' onClick={() => handleButtonClick(displayPopType.POPUP_PURCHASE_POINT.name)}/>
            </div>
        </div>

        <div className='viewrlist'>
          {(seriesWatchList.length === 0) ? (
            <>
              <div className='header'>
                시청 기록
                <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
              </div>

              <div className='no-content'>
                <div>저장된 기록이 없습니다.</div>
              </div>
            </>
          ) : (
            <UISmallContentSlider
              contentList={seriesWatchList}
              headerTitle='시청 기록'
              highlight=''
              handleShortFormOpen={()=>{}}/>
          )}

        </div>

        <div className='profile-etc'>
          <div className='head'>설정</div>

          <div className='body'>
            <button>
              <div>미션 또는 이벤트</div>
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </button>

            <button>
              <div>고객 센터</div>
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </button>

            <button>
              <div>설정</div>
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </button>

            <button>
              <div>회사 소개</div>
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default UIPopMyProfile;