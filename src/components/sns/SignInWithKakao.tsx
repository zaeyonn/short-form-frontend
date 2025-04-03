import { useEffect } from "react";

interface Props {
  signInProcess: (code: string, authType: string) => any;
}

const SignInWithKakao = ({ signInProcess }: Props) => {
  const handleCredentialResponse = (e: any) => {
    if (e.origin.lastIndexOf(import.meta.env.VITE_WEB_ROOT) >= 0 && e.data.auth_type === "kakao" && e.data.hasOwnProperty("code")) {
      signInProcess(e.data.code, "kakao");
    }
  };

  // 로그인 처리
  const handleLogin = () => {
    const loginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`
    window.open(loginUrl, "sso", "height=700,width=480");
  };

  useEffect(() => {
    window.addEventListener("message", handleCredentialResponse);

    return () => {
      window.removeEventListener("message", handleCredentialResponse);
    };
  });

  return (
    <button className='kakao-login-btn' onClick={handleLogin}>
      <img src="/resources/icons/icon_kakao.svg" />
      카카오로 계속하기
    </button>
  );
};

export default SignInWithKakao;
