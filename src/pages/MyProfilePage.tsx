import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import * as globalSlice from "src/redux/globalSlice";
import * as userSlice from "src/redux/userSlice";

import { authType, displayPopType, subscriptionType } from "src/common/define";
import UIBottomSheetLogin from "components/ui/bottomsheet/UIBottomSheetLogin";
import UISmallContentSlider from "components/ui/UISmallContentSlider";
import UIPopLogin from "components/ui/popup/UIPopLogin";
import LayoutFooter from "components/layouts/LayoutFooter";
// import UIMediumContentItem from "components/ui/UIMediumContentItem";
import UIPopPaymentProductList from "components/ui/popup/UIPopPaymentProductList";
import { User } from "src/types";

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile, displayPopName, series, visibleBottomSheetLogin } = useSelector(
    (state: any) => state.global
  );

  const {
    user,
    seriesWatchList,
    authSnsResult,
    authSnsError,
    userSeriesWatchListResult,
    userSeriesWatchListError,
    subscription
  } = useSelector((state: any) => state.user);

  const loginSheetRef = useRef<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [_paymentLoading, setPaymentLoading] = useState<boolean>(false);
  // const [selectedMenu] = useState<string>("WATCH_LIST");


  const handleClose = () => {
    navigate(-1);
  };

  const handleLoginOpen = () => {
    // Beta if (isMobile) {
    //   setVisibleBottomSheetLogin(true);
    // } else {
    //   dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_LOGIN.name));
    // }
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  };

  const handleLoginClose = () => {
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  };

  const handlePayment = () => {
    navigate("/payments");
    // Beta
    // if (isMobile) {
    //   navigate("/payments");
    // } else {
    //   dispatch(
    //     globalSlice.setDisplayPopName(
    //       displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name
    //     )
    //   );
    // }
  };

  const handlePaymentComplete = () => {
    dispatch(globalSlice.setDisplayPopName(""));
  };

  const signInProcess = (code: string, authType: string) => {
    dispatch(userSlice.authSns({ code, userId: user?.id, authType }));
  };

  // SNS 로그인 결과
  useEffect(() => {
    if (authSnsError) {
      console.log("authSnsError ", authSnsError);
			dispatch(globalSlice.addToast({
        id: Date.now(),
        message: '로그인에 실패하였습니다.',
        duration: 3000,
      }))

      dispatch(userSlice.clearUserState("authSnsError"));
    }

    if (authSnsResult && authSnsResult.status === 200) {
      const user:User = authSnsResult.data;

      
      if(authSnsResult.data?.request_auth_type !== user.auth) {
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
										<Link to='/profile/edit'>
                    	<div className="nickname">
                      	{`${user?.nickname}님`}
                     	 <img src='resources/icons/icon_arrow_right_s.svg'/>
												</div>
												</Link>
                    <div className="email">{user?.email}</div>
                  </div>
                )}
              </div>
              {user?.auth !== "guest" && (
                <>
                <div className="gradient-border">
                {!subscription && (
                <div className="weekly-pass-wrap">
                  <div className='weekly-pass-name'>
                    <img src='resources/icons/icon_pass.svg'/>
                    주간 패스권
                  </div>
                  <button onClick={handlePayment}>구독하기</button>
                </div>
                )}
                {subscription && (
                <div className="weekly-pass-wrap">
                  <div className='weekly-pass-name'>
                    <img src='resources/icons/icon_pass.svg'/>
                    {subscriptionType[subscription.duration].name}
                  </div>
                  <button disabled>구독 중</button>
                </div>
                )}
                </div>
                <div className="wallet">
                  <div className="head">
                    <Link to='coin'>
                    <div className="coin-history">
                      코인 내역
                      <img src='resources/icons/icon_arrow_right_s.svg'/>
                    </div>
                    </Link>
                    <button onClick={handlePayment}>충전하기</button>
                  </div>
                  <div className="divider"></div>
                  <div className="my-point-wrap">
                    <div className="my-point">
                      <label>
                        내 코인
                        <img src='resources/icons/icon_bang.svg'/>
                      </label>
                      <div className="point-value">
                        {(user?.paid_point) ? (user?.paid_point).toLocaleString() : 0}
                        <img src="resources/icons/icon_coin_s.png" />  
                      </div>
                    </div>
                    <div className="my-point">
                      <label>
                        보너스 코인
                        <img src='resources/icons/icon_bang.svg'/>
                      </label>
                      <div className="point-value">
                      {(user?.free_point) ? (user?.free_point).toLocaleString() : 0}
                        <img src="resources/icons/icon_coin_s.png" />  
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )}
              {(
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
{/* 					Beta
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
              )} */}
              <div className="setting">
                {/* <div className='head'>설정</div> */}
                <div className="setting-list">
                  {/* <div className='setting-item'>
                    미션 & 이벤트
                    <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
                  </div> */}
                  {/* <Link className='setting-item' to='https://www.gala.biz/ko/contact-us' target='_blank'>
                    고객 센터
                    <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
                  </Link>
                  <Link className='setting-item' to='https://www.gala.biz/ko' target='_blank'>
                    회사소개
                    <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
                  </Link> */}
                  {/* <div className='setting-item'>
                    설정
                    <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right' style={{marginLeft:'auto'}}/>
                  </div> */}
                  {/* Beta {!isMobile && (
                    <div className="menu-item selected">시청 기록</div>
                  )} */}
                  {/* {user?.auth !== "guest" && (
                    <div onClick={handleLogout} className="setting-item">
                      로그아웃
                      <img
                        className="arrow-right"
                        src="resources/icons/icon_arrow_right_s.svg"
                        alt="icon-arrow-right"
                        style={{ marginLeft: "auto" }}
                      />
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            {/* Beta <div className="content-container">
              {selectedMenu === "WATCH_LIST" && (
                <div className="menu-title">내 시청 기록</div>
              )}
              <div className="series-container">
                {seriesWatchList?.map((item: any, index: number) => (
                  <UIMediumContentItem key={index} item={item} />
                ))}
              </div>
            </div> */}
          </div>
        )}
        { user.auth === 'guest' && (
          <UIBottomSheetLogin
            ref={loginSheetRef}
            visible={visibleBottomSheetLogin}
            signInProcess={signInProcess}
            handleLoginBottomSheetClose={handleLoginClose}
          />
          )}
      </div>
      {/* Beta {(
        <>
          <UIBottomSheetLogin
            ref={loginSheetRef}
            visible={visibleBottomSheetLogin}
            signInProcess={signInProcess}
            handleLoginBottomSheetClose={handleLoginClose}
          />
        </>
      )} */}
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
