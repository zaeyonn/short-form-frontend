import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as globalSlice from 'src/redux/globalSlice';
import { UserRootState } from 'src/types';
 
const LayoutMenu = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: UserRootState) => state.user);

  const handleLogin = () => {
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  }

  return ( 
    <div className="menu">
      <div className='item' style={{margin: '2px 0px 20px 0px'}}>
        {/* <img src='resources/icons/icon_hamburger.svg'/> */}
        <img className='logo' src={"/resources/images/main_logo_white.svg"}/>
      </div>
      <div className="divider"/>
      { user.auth === 'guest' ? (
        <div className='item' onClick={handleLogin}>
          <img src='resources/icons/icon_profile.svg'/>
          로그인
        </div>
      ) : 
        <Link to='/profile' className='item' onClick={handleLogin}>
          <div className='user-profile'>
            <div className='nickname'>
            {user.nickname}
            <img 
            src='resources/icons/icon_arrow_right_s.svg'/>
            </div>
            <div className='email'>
            {user.email}
            </div>
          </div>
        </Link> 
      }
      <Link to='/bookmark' className='item'>
        <img src='resources/icons/icon_bookmark_m.svg'/>
        북마크
      </Link>
      <div className="divider"/>
      <Link to='/mission' className='item'>
        <img src='resources/icons/icon_event_m.svg'/>
        미션 & 이벤트
      </Link>
      <Link to='https://www.gala.biz/ko/contact-us' target='_blank' className='item'>
        <img src='resources/icons/icon_call_m.svg'/>
        고객센터
      </Link>
      <Link to='https://www.gala.biz/ko' target='_blank' className='item'>
        <img src='resources/icons/icon_company_m.svg'/>
        회사소개
      </Link>
      <div className='item'>
        <img src='resources/icons/icon_setting_m.svg'/>
        설정
      </div>
      <div className='divider'/>
    </div>
  )
}

export default LayoutMenu;