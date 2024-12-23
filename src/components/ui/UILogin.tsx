import { useDispatch } from "react-redux";
import * as globalSlice from "src/redux/globalSlice";

const UILogin = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="layer-wrap">
        <div className="login-wrap">
          <img className="close" src="resources/icons/icon_close.svg" onClick={() => {dispatch(globalSlice.setUiPopName(''))}}/>
          <div className="head">{"     로그인 / 회원가입하고\n다양한 컨텐츠를 만나보세요!"}</div>
          <div className="body">
            <img src="resources/icons/icon_naver.svg"/>
            <img src="resources/icons/icon_kakao.svg"/>
            <img src="resources/icons/icon_meta.svg"/>
            <img src="resources/icons/icon_google.svg"/>
            <img src="resources/icons/icon_email.svg"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default UILogin;