import { useDispatch } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { useEffect } from "react";
import { displayPopType } from "common/define";

const UIPopLogin = ({prevPage = ''}) => {
  const dispatch = useDispatch();

const handleClose = () => {
    const navBar = {
      title: 'Logo',
      leftBtn: {
        icon: 'icon_hamburger.svg',
      },
      rightBtn: {
        icon: 'icon_search.svg',
        event: () => 0,
      },
      loginBtn: true
    }

    if(prevPage === displayPopType.POPUP_MYPROFILE.name) {
      dispatch(globalSlice.setDisplayPopName(prevPage));
    }
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