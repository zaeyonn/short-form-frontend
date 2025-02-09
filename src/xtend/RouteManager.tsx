import { Route, Routes } from "react-router-dom";

import CallbackGoogle from "components/callback/CallbackGoogle";
import CallbackTossPayment from "components/callback/CallbackTossPayment";
import MainPage from "pages/MainPage";
import SeriesPlayerPage from "pages/SeriesPlayerPage";
import MyProfilePage from "pages/MyProfilePage";
import SeriesKeepPage from "pages/SeriesKeepPage";
import SeriesListPage from "pages/SeriesListPage";
import PaymentProductListPage from "pages/PaymentProductListPage";

const RouteManager = () => {
  
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/home' element={<MainPage/>} />
      <Route path='/bookmark' element={<SeriesKeepPage/>} />
      <Route path='/series/:seriesId' element={<SeriesPlayerPage/>} />
      <Route path='/profile' element={<MyProfilePage/>} />
      <Route path='/series-list' element={<SeriesListPage/>} />
      <Route path='/payments' element={<PaymentProductListPage/>} />
      <Route path='/callback/google' element={<CallbackGoogle/>} />
      <Route path='/callback/tosspayment' element={<CallbackTossPayment/>} />
    </Routes>
  )
}

export default RouteManager;