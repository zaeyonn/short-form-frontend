import { useDispatch, useSelector } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { useEffect } from "react";
import { displayPopType } from "common/define";

const UIPopLogin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="popup-wrap">
        <div className='header'>
          <div className="left-section">
            <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_MYPROFILE.name))}}/>
            <span className="title">로그인</span>
          </div>
        </div>

        <div>로그인 팝업</div>
      </div>
    </>
  )
}

export default UIPopLogin;