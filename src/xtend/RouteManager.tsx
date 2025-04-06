import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import CallbackGoogle from "components/callback/CallbackGoogle";
import CallbackTossPayment from "components/callback/CallbackTossPayment";
import CallbackKakao from "components/callback/CallbackKakao";
import MainPage from "pages/MainPage";
import SeriesPlayerPage from "pages/SeriesPlayerPage";
import MyProfilePage from "pages/MyProfilePage";
import SeriesKeepPage from "pages/SeriesKeepPage";
import SeriesListPage from "pages/SeriesListPage";
import PaymentProductListPage from "pages/PaymentProductListPage";
import MissionPage from "pages/MissionPage";
import BetaMainPage from "pages/BetaMainPage";

const RouteManager = () => {
  const { isMobile } = useSelector((state: any) => state.global)
  
  return (
    <Routes>
      <Route path='/' element={<BetaMainPage/>} />
      <Route path='/bookmark' element={<SeriesKeepPage/>} />
      <Route path='/mission' element={<MissionPage/>} />
      <Route path='/series/:seriesId' element={<SeriesPlayerPage/>} />
      <Route path='/profile' element={<MyProfilePage/>} />
      <Route path='/series-list' element={<SeriesListPage/>} />
      <Route path='/payments' element={<PaymentProductListPage/>} />
      <Route path='/callback/google' element={<CallbackGoogle/>} />
      <Route path='/callback/tosspayment' element={<CallbackTossPayment/>} />
      <Route path='/callback/kakao' element={<CallbackKakao/>} />
    </Routes>
  )
}

export default RouteManager;