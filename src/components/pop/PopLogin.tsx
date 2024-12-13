import { useDispatch } from "react-redux";
import * as globalSlice from "../../redux/globalSlice";

const PopLogin = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(globalSlice.setDisplayPopName(""));
  }
  return (
    <>
      <div className="pop">
        <div>로그인 팝업</div>
        <button onClick={() => handleButtonClick()}>뒤로 가기</button>
      </div>
    </>
  )
}

export default PopLogin;