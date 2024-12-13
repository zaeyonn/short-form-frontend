import { Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";

const RouteManager = () => {
  
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
    </Routes>
  )
}

export default RouteManager;