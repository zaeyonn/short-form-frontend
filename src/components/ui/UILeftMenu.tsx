import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSpring, animated } from '@react-spring/web';

interface Props {
  visible?: boolean;
  handleMenuClose?: () => void;
}

const UILeftMenu = ({handleMenuClose = () => 0, visible = true}: Props) => {

  const { isMobile } = useSelector((state: any) => state.global);

  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0 },
    config: {mass: 0.6, tension: 270, friction: 25},
  }));

  const handleClose = () => {
    handleMenuClose();

    closeMenu();
  }

  const openMenu = () => {
    api.start({ from: { x: 0 }, to: { x: 230 }});
  }

  const closeMenu = () => {
    api.start({ from: { x: 230 }, to : { x: 0 }})
  }

  useEffect(() => {
    if(visible) {
      openMenu();
    }
  }, [visible])

  return ( 
    <>
    { (visible && isMobile) && (
      <div className='scrim' onClick={handleClose}/>
    )}
    <animated.div 
      className="menu"
      style={{
        ...springs,
      }}>
      <div className='item' style={{margin: '2px 0px 20px 0px'}}>
        <img src='resources/icons/icon_hamburger.svg'/>
        <img className='logo' src={"/resources/images/main_logo_white.svg"}/>
      </div>
      <div className="divider"/>
      <div className='item'>
        <img src='resources/icons/icon_profile.svg'/>
        로그인
      </div>
      <Link to='/bookmark' className='item' onClick={handleClose}>
        <img src='resources/icons/icon_bookmark_m.svg'/>
        북마크
      </Link>
      <div className="divider"/>
      <Link to='/mission' className='item' onClick={handleClose}>
        <img src='resources/icons/icon_event_m.svg'/>
        미션 & 이벤트
      </Link>
      {/* <Link to='https://www.gala.biz/ko/contact-us' target='_blank' className='item'>
        <img src='resources/icons/icon_call_m.svg'/>
        고객센터
      </Link>
      <Link to='https://www.gala.biz/ko' target='_blank' className='item'>
        <img src='resources/icons/icon_company_m.svg'/>
        회사소개
      </Link> */}
      <div className='item'>
        <img src='resources/icons/icon_setting_m.svg'/>
        설정
      </div>
      <div className='divider'/>
    </animated.div>
    </>
  )
}

export default UILeftMenu;