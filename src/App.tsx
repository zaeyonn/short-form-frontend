import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as globalSlice from 'src/redux/globalSlice';
import RouteManager from "xtend/RouteManager";
import AuthManager from "xtend/AuthManager";
import AlertManager from "xtend/AlertManager";
import LayoutNavigationBar from 'components/layouts/LayoutNavigationBar';
import "styles/index.scss";
// import UIPopPayments from 'components/ui/payments/UIPopPayments';

const App = () => {
  const dispatch = useDispatch();

  //const { payments } = useSelector((state: any) => state.global);
 
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
      {/* { payments && (
        <UIPopPayments/>
      )} */}
    </>
  )
}

export default App
