import { uiPopType } from 'common/define';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as globalSlice from "src/redux/globalSlice";

const LayoutNavigationBar = () => {
  const dispatch = useDispatch();
  const { displayPopName, navigationBar, isLogin } = useSelector((state: any) => state.global);

  useEffect(() => {
    const navBar = {
      visible: (displayPopName === ''), 
      title: 'Logo', 
      leftBtn: {
        icon: 'icon_hamburger.svg', 
        event: () => { 
          dispatch(globalSlice.setUiPopName(uiPopType.UI_LEFT_MENU.name));
        }
      }, 
      
      rightBtn: {
        icon: 'icon_search.svg', 
        event: () => 0
      }
    }
    dispatch(globalSlice.setNavigationBar(navBar));
  }, [displayPopName]);

  return (
    <div className='nav-bar' style={{ display: !navigationBar.visible ? 'none' : 'flex'}}>
      <div className="left-section">
        <img src={`resources/icons/${navigationBar?.leftBtn?.icon}`} onClick={navigationBar?.leftBtn?.event}/>
        <span className="title">{navigationBar?.title}</span>
      </div>
      <div className='right-section'>
        <img src={`resources/icons/${navigationBar?.rightBtn?.icon}`} onClick={navigationBar?.rightBtn?.event}/>
        {!isLogin && (
          <button onClick={() => {dispatch(globalSlice.setUiPopName(uiPopType.UI_LOGIN.name))}}>로그인</button>
        )}
      </div>
    </div>
  )
}

export default LayoutNavigationBar;