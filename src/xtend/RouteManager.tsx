import { Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import CallbackGoogle from "components/sns/callback/CallbackGoogle";

const RouteManager = () => {
  
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/callback/google' element={<CallbackGoogle/>} />
    </Routes>
  )
}

export default RouteManager;