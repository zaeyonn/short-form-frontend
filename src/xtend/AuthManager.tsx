import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'js-cookie';

import * as userSlice from "src/redux/userSlice";
import { Subscription } from 'src/types';

const AuthManager = () => {
  const dispatch = useDispatch();

  const { authGuestResult, authGuestError, userInfoResult, userInfoError } =
    useSelector((state: any) => state.user);

  // 사용자 정보 조회 결과
  useEffect(() => {
    if (userInfoError) {
      console.log("userInfoError ", userInfoError);
      dispatch(userSlice.clearUserState("userInfoError"));
      return;
    }

    if (userInfoResult && userInfoResult.status === 200) {
      console.log("userInfoResult ", userInfoResult.data);
      const user = userInfoResult.data;
      localStorage.setItem("user-id", user.id);
      dispatch(userSlice.setUser(user));
      dispatch(userSlice.setUserMissionList(user.userMissions));

      if(user?.subscriptions?.length > 0) {
        user.subscriptions.forEach((subscription: Subscription) => {
          if(subscription.status === 'active') {
            dispatch(userSlice.setSubscription(subscription));
          }
        })
      }
    }
  }, [userInfoResult, userInfoError]);

  // 게스트 등록 결과
  useEffect(() => {
    if (authGuestError) {
      console.log("authGuestError ", authGuestError);
      dispatch(userSlice.clearUserState("authGuestError"));
      return;
    }

    if (authGuestResult && authGuestResult?.status === 201) {
      console.log("authGuestResult ", authGuestResult);
      const user = authGuestResult.data;
      localStorage.setItem("user-id", user.id);
      dispatch(userSlice.setUser(user));
      dispatch(userSlice.setUserMissionList(user.userMissions));
      dispatch(userSlice.clearUserState("authGuestResult"));
      return;
    }
  }, [authGuestResult, authGuestError]);

  // 실행시 localStorage user-id 값 O -> 사용자 정보 조회
  //                               X -> 게스트 사용자 등록
  useEffect(() => {
    const uuid = localStorage.getItem("user-id");
    console.log('uuid', uuid);

    if(uuid == 'undefined') {
      Cookies.remove('user-id');
    }

    if (uuid && uuid !== 'undefined') {
      dispatch(userSlice.userInfo({ userId: uuid }));
    } else {
      dispatch(userSlice.authGuest());
    }
  }, []);

  return null;
};

export default AuthManager;
