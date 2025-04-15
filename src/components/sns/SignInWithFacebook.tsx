import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { UserRootState } from "src/types";

import * as userSlice from 'src/redux/userSlice';

interface Props {
  signInProcess: (code: string, authType: string) => any;
}

const SignInWithFacebook = ({ signInProcess }: Props) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: UserRootState) => state.user);

  const handleCredentialResponse = (e: any) => {
    if (
      e.origin.lastIndexOf(import.meta.env.VITE_WEB_ROOT) >= 0 &&
      e.data.auth_type === "meta" &&
      e.data.hasOwnProperty("code")
    ) {
      signInProcess(e.data.code, "meta");
    }
  };

  // 로그인 처리
  const handleLogin = () => {
    if (typeof (window as any).FB === 'undefined') {
      console.error('Facebook SDK not loaded');
      return;
    }
    
    (window as any).FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;

        if(accessToken) {
          dispatch(userSlice.authSns({code: accessToken, userId: user.id,  authType: 'facebook'}))
        }
    };
  }, {scope: 'email'});
  }

  useEffect(() => {
    window.addEventListener("message", handleCredentialResponse);

    return () => {
      window.removeEventListener("message", handleCredentialResponse);
    };
  });

  return (
    <button onClick={handleLogin}>
      <img src="/resources/icons/icon_facebook.png" />
      페이스북으로 계속하기
    </button>
  );
};

export default SignInWithFacebook;
