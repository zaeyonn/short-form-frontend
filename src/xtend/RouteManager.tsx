import { Route, Routes } from "react-router-dom";

import CallbackGoogle from "components/sns/callback/CallbackGoogle";
import MainPage from "pages/MainPage";
import SeriesPlayerPage from "pages/SeriesPlayerPage";
import MyProfilePage from "pages/MyProfilePage";
import SeriesKeepPage from "pages/SeriesKeepPage";
import SeriesListPage from "pages/SeriesListPage";

const RouteManager = () => {
  
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/bookmark' element={<SeriesKeepPage/>} />
      <Route path='/series/:seriesId' element={<SeriesPlayerPage/>} />
      <Route path='/profile' element={<MyProfilePage/>} />
      <Route path='/series-list' element={<SeriesListPage/>} />
      <Route path='/callback/google' element={<CallbackGoogle/>} />
    </Routes>
  )
}

export default RouteManager;