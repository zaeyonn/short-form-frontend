import { useDispatch } from "react-redux";
import * as globalSlice from "../../redux/globalSlice";

const PopPurchasePoint = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(globalSlice.setDisplayPopName(""));
  }

  return (
    <>
      <div className="popup-wrap">
        <div>포인트 구매 팝업</div>
        <button onClick={() => handleButtonClick()}>뒤로 가기</button>
      </div>
    </>
  )
}

export default PopPurchasePoint;