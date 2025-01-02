import { useDispatch } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { displayPopType } from "common/define";

const UIPopPurchasePoint = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="popup-wrap">
        <div className='header-nonfixed'>
          <div className="left-section">
            <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={() => {dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_MYPROFILE.name))}}/>
            <span className="title">포인트 구매</span>
          </div>
        </div>

        <div>포인트 구매 팝업</div>
      </div>
    </>
  )
}

export default UIPopPurchasePoint;