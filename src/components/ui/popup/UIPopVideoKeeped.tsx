import { useDispatch } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { useEffect } from "react";
import { displayPopType } from "common/define";
import UIVideoKeepedList from "../UIVideoKeepedList";

const UIPopVideoKeeped = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="popup-wrap">
        <div className='header'>
          <div className="left-section">
            <img src={`resources/icons/icon_arrow_left_m.svg`}/>
            <span className="title">소장</span>
          </div>

          <div className="right-section">
            <button onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_VIDEO_WATCH_MANAGE.name))}}>리스트 관리</button>
            <button onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_VIDEO_WATCH.name))}}>시청 기록</button>
          </div>
        </div>
        
        <UIVideoKeepedList/>
      </div>
    </>
  )
}

export default UIPopVideoKeeped;