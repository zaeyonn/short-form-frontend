import { Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import MyProfilePage from "pages/MyProfilePage";

const RouteManager = () => {
  
  return (
    <Routes>
      <Route path="/" element={<MyProfilePage/>} />
    </Routes>
  )
}

export default RouteManager;