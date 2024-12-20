import { displayPopType } from "common/define";
import { useDispatch } from "react-redux";
import * as globalSlice from "src/redux/globalSlice";

const UILeftMenu = () => {
  const dispatch = useDispatch();

  const handleClick = (popName: string) => {
    dispatch(globalSlice.setDisplayPopName(popName));
    dispatch(globalSlice.setUiPopName(''));
  }

  return ( 
    <>
      <div className="layer-wrap">
        <div className="menu-wrap">
          <button onClick={() => handleClick('')}>메인 화면</button>
          <button onClick={() => handleClick(displayPopType.POPUP_VIDEO_WATCH.name)}>시청 기록</button>
          <button onClick={() => handleClick(displayPopType.POPUP_VIDEO_KEEP.name)}>보관</button>
          <button onClick={() => handleClick(displayPopType.POPUP_MYPROFILE.name)}>프로필</button>
          <button onClick={() => dispatch(globalSlice.setUiPopName(''))}>닫기</button>
        </div>
      </div>
    </>
  )
}

export default UILeftMenu;