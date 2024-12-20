import { useDispatch } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { displayPopType } from "common/define";
import UISeriesWatchList from "../UISeriesWatchList";

const UIPopSeriesWatch = () => {
  const dispatch = useDispatch();

  return ( 
    <>
      <div className="popup-wrap">
        <div className='header'>
          <div className="left-section">
            <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_VIDEO_KEEP.name))}}/>
            <span className="title">시청 기록</span>
          </div>

          <div className="right-section">
            <button onClick={() => {}}>리스트 관리</button>
          </div>
        </div>

        <UISeriesWatchList/>
      </div>
    </>
  )
}

export default UIPopSeriesWatch;