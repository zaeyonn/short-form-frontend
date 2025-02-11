import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import * as globalSlice from "src/redux/globalSlice";
import * as userSlice from "src/redux/userSlice";

import { displayPopType } from "src/common/define";
import UIBottomSheetLogin from "components/ui/bottomsheet/UIBottomSheetLogin";
import UISmallContentSlider from "components/ui/UISmallContentSlider";
import UIPopLogin from "components/ui/popup/UIPopLogin";
import LayoutFooter from "components/layouts/LayoutFooter";
import UIMediumContentItem from "components/ui/UIMediumContentItem";
import UIPopPaymentProductList from "components/ui/popup/UIPopPaymentProductList";

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile, displayPopName } = useSelector(
    (state: any) => state.global
  );

  const {
    user,
    seriesWatchList,
    authGoogleResult,
    authGoogleError,
    userSeriesWatchListResult,
    userSeriesWatchListError,
  } = useSelector((state: any) => state.user);

  const loginSheetRef = useRef<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [_paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [visibleBottomSheetLogin, setVisibleBottomSheetLogin] = useState(false);
  const [selectedMenu] = useState<string>("WATCH_LIST");

  const handleClose = () => {
    navigate(-1);
  };

  const handleLoginOpen = () => {
    if (isMobile) {
      setVisibleBottomSheetLogin(true);
    } else {
      dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_LOGIN.name));
    }
  };

  const handleLoginClose = () => {
    setVisibleBottomSheetLogin(false);
  };

  const handleLogout = () => {
    dispatch(userSlice.authGuest());
  };

  const handlePayment = () => {
    if (isMobile) {
      navigate("/payments");
    } else {
      dispatch(
        globalSlice.setDisplayPopName(
          displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name
        )
      );
    }
  };

  const handlePaymentComplete = () => {
    dispatch(globalSlice.setDisplayPopName(""));
  };

  const signInProcess = (code: string, authType: string) => {
    dispatch(userSlice.authGoogle({ code, userId: user?.id, authType }));
  };

  // 구글 로그인 결과
  useEffect(() => {
    if (authGoogleError) {
      console.log("authGoogleError ", authGoogleError);
      setVisibleBottomSheetLogin(false);

      dispatch(userSlice.clearUserState("authGoogleError"));
    }

    if (authGoogleResult && authGoogleResult.status === 200) {
      console.log("authGoogleResult ", authGoogleResult);
      const user = authGoogleResult.data;

      if (loginSheetRef.current && isMobile)
        loginSheetRef.current.handleClose();

      if (displayPopName) {
        dispatch(globalSlice.setDisplayPopName(""));
      }

      dispatch(userSlice.setUser(user));

      localStorage.setItem("user-id", user.id);

      dispatch(userSlice.clearUserState("authGoogleResult"));
      return;
    }
  }, [authGoogleResult, authGoogleError, displayPopName, isMobile]);

  // 사용자 시청 기록 조회 결과
  useEffect(() => {
    if (userSeriesWatchListError) {
      console.log("userSeriesWatchListError ", userSeriesWatchListError);
      setLoading(false);

      dispatch(userSlice.clearUserState("userSeriesWatchListError"));
      return;
    }

    if (userSeriesWatchListResult && userSeriesWatchListResult.status === 200) {
      console.log("userSeriesWatchListResult ", userSeriesWatchListResult);
      setLoading(false);
      const watchList = userSeriesWatchListResult.data;

      dispatch(userSlice.setSeriesWatchList(watchList));

      dispatch(userSlice.clearUserState("userSeriesWatchListResult"));
      return;
    }
  }, [userSeriesWatchListResult, userSeriesWatchListError]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 사용자 시청 기록 조회
    dispatch(userSlice.userSeriesWatchList({ userId: user?.id }));
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
        </div>
        {loading && (
          <div className="loading">
            <TailSpin width={60} height={60} color={"#ffffff"} />
          </div>
        )}
        {!loading && (
          <div
            className="page-body"
            style={{ padding: 0, flexDirection: "row" }}
          >
            <div className="profile-container">
              <div className="profile">
                {/* <div className='profile-img'>
              {(user?.auth === 'guest') ? (
                <img className='guest-img' src='resources/icons/icon_guest.svg'/>
              ) : (
                <img className='user-img' src={user?.profile_img}/>
              )}
            </div> */}
                {user?.auth === "guest" ? (
                  <div className="nickname" onClick={handleLoginOpen}>
                    로그인을 해주세요
                    <img src="resources/icons/icon_arrow_right_s.svg" />
                  </div>
                ) : (
                  <div>
                    <div className="nickname">
                      {`${user?.nickname}님`}
                      {/* <img src='resources/icons/icon_arrow_right_s.svg'/> */}
                    </div>
                    <div className="email">{user?.email}</div>
                  </div>
                )}
              </div>
              {user?.auth !== "guest" && (
                <div className="wallet">
                  <div className="head">
                    내 지갑
                    {/* <img src='resources/icons/icon_arrow_right_s.svg'/> */}
                  </div>
                  <div className="divider"></div>
                  <div className="point">
                    <div className="my-point">
                      <img src="resources/icons/icon_point.svg" />
                      <span>{`${user?.paid_point + user?.free_point}`}</span>
                    </div>
                    <button onClick={handlePayment}>충전하기</button>
                  </div>
                </div>
              )}
              {isMobile && (
                <div className="view-list">
                  <div className="head">내 시청 기록</div>
                  {seriesWatchList.length === 0 ? (
                    <div className="no-content">저장된 기록이 없습니다.</div>
                  ) : (
                    <div style={{ marginTop: 14 }}>
                      <UISmallContentSlider
                        seriesList={seriesWatchList}
                        highlight=""
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="setting">
                {/* <div className='head'>설정</div> */}
                <div className="menu-list">
                  {/* <div>
              미션 또는 이벤트
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div>
              고객 센터
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div>
              설정
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div>
            <div>
              회사 소개
              <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
            </div> */}
                  {!isMobile && (
                    <div className="menu-item selected">시청 기록</div>
                  )}
                  {user?.auth !== "guest" && (
                    <div onClick={handleLogout}>
                      로그아웃
                      <img
                        className="arrow-right"
                        src="resources/icons/icon_arrow_right_s.svg"
                        alt="icon-arrow-right"
                        style={{ marginLeft: "auto" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="content-container">
              {selectedMenu === "WATCH_LIST" && (
                <div className="menu-title">내 시청 기록</div>
              )}
              <div className="series-container">
                {seriesWatchList?.map((item: any, index: number) => (
                  <UIMediumContentItem key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isMobile && (
        <>
          <UIBottomSheetLogin
            ref={loginSheetRef}
            visible={visibleBottomSheetLogin}
            signInProcess={signInProcess}
            handleLoginBottomSheetClose={handleLoginClose}
          />
        </>
      )}
      {displayPopName === displayPopType.POPUP_LOGIN.name && (
        <UIPopLogin signInProcess={signInProcess} />
      )}
      {displayPopName === displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name && (
        <UIPopPaymentProductList
          setPaymentLoading={setPaymentLoading}
          handlePaymentComplete={handlePaymentComplete}
        />
      )}
      {!isMobile && <LayoutFooter />}
    </>
  );
};

export default MyProfilePage;
