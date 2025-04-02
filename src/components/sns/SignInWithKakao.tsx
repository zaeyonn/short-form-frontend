import { useEffect } from "react";

interface Props {
  signInProcess: (code: string, authType: string) => any;
}

const SignInWithKakao = ({ signInProcess }: Props) => {
  const handleCredentialResponse = (e: any) => {
    if (
      e.origin.lastIndexOf(import.meta.env.VITE_WEB_ROOT) >= 0 &&
      e.data.auth_type === "google" &&
      e.data.hasOwnProperty("code")
    ) {
      signInProcess(e.data.code, "google");
    }
  };

  // 로그인 처리
  const handleLogin = () => {
    const loginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_OAUTH_CALLBACK_URI
    }&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;

    window.open(loginUrl, "sso", "height=700,width=480");
  };

  useEffect(() => {
    window.addEventListener("message", handleCredentialResponse);

    return () => {
      window.removeEventListener("message", handleCredentialResponse);
    };
  });

  return (
    <button onClick={handleLogin}>
      <img src="/resources/icons/icon_google.svg" />
      Kakao로 계속하기
    </button>
  );
};

export default SignInWithKakao;
