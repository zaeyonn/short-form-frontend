import { useDispatch, useSelector } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { useEffect } from "react";
import { displayPopType } from "common/define";

const UIPopLogin = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    const navBar = {
      title: 'My profile',
      leftBtn: {
        icon: 'icon_hamburger.svg',
      },
      rightBtn: {
        icon: 'icon_search.svg',
        event: () => 0,
      },
    }
    dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_MYPROFILE.name));
    dispatch(globalSlice.setNavigationBar(navBar));
  }

  useEffect(() => {
    const navBar = {
      title: 'Login',
      leftBtn: {
        icon: 'icon_arrow_left_m.svg',
        event: handleClose
      },
    }
    dispatch(globalSlice.setNavigationBar(navBar));
  }, [])

  return (
    <>
      <div className="popup-wrap">
        <div>로그인 팝업</div>
      </div>
    </>
  )
}

export default UIPopLogin;