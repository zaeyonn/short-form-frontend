import { useEffect } from "react";
import { Link } from 'react-router-dom';

import { useSpring, animated } from '@react-spring/web';

interface Props {
  visible: boolean;
  handleMenuClose: () => void;
}

const UILeftMenu = (props: Props) => {

  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0 },
    config: {mass: 0.6, tension: 270, friction: 25},
  }));

  const handleClose = () => {
    props.handleMenuClose();

    closeMenu();
  }

  const openMenu = () => {
    api.start({ from: { x: 0 }, to: { x: 230 }});
  }

  const closeMenu = () => {
    api.start({ from: { x: 230 }, to : { x: 0 }})
  }

  useEffect(() => {
    if(props.visible) {
      openMenu();
    }
  }, [props.visible])

  return ( 
    <>
    { props.visible && (
      <div className='scrim' onClick={handleClose}/>
    )}
    <animated.div 
      className="menu"
      style={{
        ...springs,
      }}>
      <div className='item' style={{margin: '2px 0px 20px 0px'}}>
        <img src='resources/icons/icon_hamburger.svg'/>
        Logo
      </div>
      <div className="divider"/>
      <div className='item'>
        <img src='resources/icons/icon_profile.svg'/>
        로그인
      </div>
      <div className='item' onClick={() => handleClose()}>
        <img src='resources/icons/icon_home_m.svg'/>
        홈
      </div>
      <Link to='/bookmark' className='item' onClick={handleClose}>
        <img src='resources/icons/icon_bookmark_m.svg'/>
        북마크
      </Link>
      <div className="divider"/>
      <div className='item'>
        <img src='resources/icons/icon_event_m.svg'/>
        미션 & 이벤트
      </div>
      <div className='item'>
        <img src='resources/icons/icon_call_m.svg'/>
        고객센터
      </div>
      <div className='item'>
        <img src='resources/icons/icon_setting_m.svg'/>
        설정
      </div>
      <div className='item'>
        <img src='resources/icons/icon_company_m.svg'/>
        회사소개
      </div>
      <div className='divider'/>
    </animated.div>
    </>
  )
}

export default UILeftMenu;