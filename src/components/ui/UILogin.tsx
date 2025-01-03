import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as globalSlice from "src/redux/globalSlice";

const UILogin = () => {
  const dispatch = useDispatch();

  const handleClickGoogleLogin = () => {
    const loginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=535162853227-526d2impnl311da6b2q95c2f2st10l7u.apps.googleusercontent.com&redirect_uri=http://localhost:5173&response_type=code&scope=email profile`;

    window.open(loginUrl, "sso", "height=700,width=480");
  }

  const handleGoogleLoginResult = (e: any) => {
    console.log(`result : ${e}`);
  }

  useEffect(() => {
    window.addEventListener("message", handleGoogleLoginResult);

    return () => {
      window.removeEventListener("message", handleGoogleLoginResult);
    }
  }, [])

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
            <img src="resources/icons/icon_google.svg" onClick={handleClickGoogleLogin}/>
            <img src="resources/icons/icon_email.svg"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default UILogin;