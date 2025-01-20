import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as globalSlice from 'src/redux/globalSlice';
import RouteManager from "xtend/RouteManager";
import AuthManager from "xtend/AuthManager";
import AlertManager from "xtend/AlertManager";
import LayoutNavigationBar from 'components/layouts/LayoutNavigationBar';
import "styles/index.scss";
import LayoutFooter from 'components/layouts/LayoutFooter'

const App = () => {
  const dispatch = useDispatch();

  const { isMobile } = useSelector((state: any) => state.global);
 
  useEffect(() => {
    const handleResize = () => {
      dispatch(globalSlice.setIsMobile(window.innerWidth <= 480));
    }

    // 데스크탑, 모바일 환경 처리
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <>
      <LayoutNavigationBar/>
      <RouteManager/>
      <AuthManager/>
      <AlertManager/>
      { !isMobile && (
        <LayoutFooter/>
      )}
    </>
  )
}

export default App
