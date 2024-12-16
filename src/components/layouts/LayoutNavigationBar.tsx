import { displayPopType } from 'common/define';
import { useDispatch, useSelector } from 'react-redux';
import * as globalSlice from 'src/redux/globalSlice';

const LayoutNavigationBar = () => {
  const { navigationBar, displayPopName } = useSelector((state: any) => state.global)
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_MYPROFILE.name));
  }

  return (
    <div className='nav-bar'>
      <div className="left-section">
        <img src={`resources/icons/${navigationBar.leftBtn.icon}`} onClick={navigationBar.leftBtn.event}/>
        <span className="title">{navigationBar.title}</span>
      </div>

      {(displayPopName !== displayPopType.POPUP_LOGIN.name) && 
      (displayPopName !== displayPopType.POPUP_PURCHASE_POINT.name) && 
      (displayPopName !== displayPopType.POPUP_VIDEO_KEEP.name) && (
        <div className='right-section'>
          <img src={`resources/icons/${navigationBar.rightBtn.icon}`} onClick={navigationBar.rightBtn.event}/>
          {navigationBar.loginBtn && (
            <button onClick={handleButtonClick}>로그인</button>
          )}
        </div>
      )}

      {(displayPopName === displayPopType.POPUP_VIDEO_KEEP.name) && (
        <button>
          <div className='right--section'>
            <div>취소</div>
            <div>시청 기록</div>
          </div>
        </button>
      )}
    </div>
  )
}

export default LayoutNavigationBar;