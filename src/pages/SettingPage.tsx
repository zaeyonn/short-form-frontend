import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as globalSlice from "src/redux/globalSlice";
import * as userSlice from "src/redux/userSlice";

import UIBottomSheetLogin from "components/ui/bottomsheet/UIBottomSheetLogin";
import { authType, displayPopType } from "src/common/define";
import { User } from "src/types";

const SettingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile, displayPopName, series, visibleBottomSheetLogin } = useSelector(
    (state: any) => state.global
  );

  const {
    user,
    authSnsResult,
    authSnsError,
  } = useSelector((state: any) => state.user);

  const loginSheetRef = useRef<any>(null);

  const handleClose = () => {
    navigate(-1);
  };

  const handleLoginClose = () => {
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  };

  const signInProcess = (code: string, authType: string) => {
    dispatch(userSlice.authSns({ code, userId: user?.id, authType }));
  };

  // SNS 로그인 결과
  useEffect(() => {
    if (authSnsError) {
      console.log("authSnsError ", authSnsError);
      dispatch(globalSlice.toggleBottomSheetLogin({}));

      dispatch(userSlice.clearUserState("authSnsError"));
    }

    if (authSnsResult && authSnsResult.status === 200) {
      const user: User = authSnsResult.data;


      if (authSnsResult.data?.request_auth_type !== user.auth) {
        dispatch(globalSlice.addToast({
          id: Date.now(),
          message: `${authType[user.auth].name}로 가입된 계정입니다.`,
          duration: 3000,
        }))

        dispatch(userSlice.clearUserState("authSnsResult"));
        return;
      }


      if (loginSheetRef.current)
        loginSheetRef.current.handleClose();

      if (user.free_point + user.paid_point < series.req_point) {
        if (displayPopName) {
          dispatch(
            globalSlice.setDisplayPopName(
              displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name
            )
          );
        }
      } else {
        dispatch(globalSlice.setDisplayPopName(''));
      }

      dispatch(userSlice.setUser(user));

      localStorage.setItem("user-id", user.id);

      dispatch(userSlice.clearUserState("authSnsResult"));
      return;
    }
  }, [authSnsResult, authSnsError, displayPopName, isMobile, series]);


  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  return (
    <>
      <div className="page-wrap">
        <div className="header">
          <div className="left-section">
            <img
              src={`resources/icons/icon_arrow_left_m.svg`}
              onClick={() => handleClose()}
            />
          </div>
          <div className='title'>
            설정
          </div>
          <div className='right-section'>
            <span className='empty'/>
          </div>
        </div>
          <div
            className="page-body"
            style={{ padding: 0, flexDirection: "row" }}
          >
            <div className="setting">
              <div className="setting-list">
                <Link className='setting-item' to='/setting/terms'>
                  서비스 약관
                  <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{ marginLeft: 'auto' }} />
                </Link>
                <Link className='setting-item' to='/setting/privacy'>
                  개인정보 보호정책
                  <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{ marginLeft: 'auto' }} />
                </Link>
                <div className='setting-item'>
                  캐시 지우기
                  <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{ marginLeft: 'auto' }} />
                </div>
                <div className='setting-item'>
                  언어
                  <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{ marginLeft: 'auto' }} />
                </div>
              </div>
            </div>
          </div>
          { user.auth === 'guest' && (
          <UIBottomSheetLogin
            ref={loginSheetRef}
            visible={visibleBottomSheetLogin}
            signInProcess={signInProcess}
            handleLoginBottomSheetClose={handleLoginClose}
          />
          )}
      </div>
    </>
  );
};

export default SettingPage;
