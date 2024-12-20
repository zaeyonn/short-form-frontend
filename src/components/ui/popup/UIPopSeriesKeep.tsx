import { useDispatch } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { useRef, useState } from "react";
import { displayPopType } from "common/define";
import UISeriesKeepList from "../UISeriesKeepList";

const UIPopSeriesKeep = () => {
  const dispatch = useDispatch();

  const [isManageMode, setManageMode] = useState<boolean>(false);

  const removeVideos = useRef<Array<any>>([]);

  const handleClick = () => {
    
  }

  return (
    <>
      <div className="popup-wrap">
        <div className='header'>
          {(isManageMode) ? (
            <>
              <div className="right-section">
                <button onClick={() => {setManageMode(false)}}>취소</button>
              </div>
            </>
          ) : (
            <>
              <div className="left-section">
                <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={() => {dispatch(globalSlice.setDisplayPopName(''))}}/>
                <span className="title">소장</span>
              </div>

              <div className="right-section">
                <button onClick={() => {setManageMode(true)}}>리스트 관리</button>
                <button onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_VIDEO_WATCH.name))}}>시청 기록</button>
              </div>
            </>
          )}
        </div>

        {isManageMode && (
          <div className="footer">
            <div className="right-section">
              <button >저장</button>
            </div>
          </div>)}

          <UISeriesKeepList isManageMode={isManageMode} removeVideos={removeVideos}/>
      </div>
    </>
  )
}

export default UIPopSeriesKeep;