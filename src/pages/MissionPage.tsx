import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";
import { useSpring, animated } from '@react-spring/web';
import moment from 'moment';

import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';
import UIBottomSheetLogin from 'components/ui/bottomsheet/UIBottomSheetLogin';
import { authType, missionType } from 'common/define';
import { Mission, User, UserMission } from 'src/types';

const MissionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { missionList, visibleBottomSheetLogin, isMobile, missionListResult, missionListError } = useSelector((state: any) => state.global);
  const { user, userMissionList, attendanceResult, attendanceError, attendanceCheckError, attendanceCheckResult, authSnsResult, authSnsError, missionsCompleteResult, missionsCompleteError } = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isAttended, setIsAttended] = useState(false);
  const [watchEpPercent, setWatchEpPercent] = useState(0);
  const [watchAdPercent, setWatchAdPercent] = useState(0);

  const watchEpSpring: any = useSpring({
    width: `${(watchEpPercent > 100 ? 100 : watchEpPercent)}%`, // 100% 초과 방지
    config: { mass: 1, friction: 18, tension: 115 },
  });

  const watchAdSpring: any = useSpring({
    width: `${(watchAdPercent > 100 ? 100 : watchAdPercent)}%`, // 100% 초과 방지
    config: { mass: 1, friction: 18, tension: 115 },
  });


  const loginSheetRef = useRef<any>(null);
  const progressBarRef = useRef<any>(null);

  const handleClose = () => {
    navigate(-1);
  }

  const handleLoginClose = useCallback(() => {
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  }, []);

  const handleAttend = () => {
    if (isAttended) return;

    dispatch(userSlice.attendanceCheck({ userId: user.id }));
  }

  const handleConnectSns = (mission: Mission, status: string) => {
    if (status === 'in_progress') {
      dispatch(globalSlice.toggleBottomSheetLogin({}));
    } else if (status === 'completed') {
      dispatch(userSlice.missionsComplete({ userId: user.id, missionType: mission.type }))
    }
  }


  const handleWatchAd = (mission: Mission, status: string) => {
    if (status === 'in_progress') {
      dispatch(globalSlice.toggleBottomSheetLogin({}));
    } else if (status === 'completed') {
      dispatch(userSlice.missionsComplete({ userId: user.id, missionType: mission.type }))
    }
  }

  const handleWatchEp = (mission: Mission, status: string) => {
    if (status === 'in_progress') {
      navigate('/');
    } else if (status === 'completed') {
      dispatch(userSlice.missionsComplete({ userId: user.id, missionType: mission.type }))
    }
  }

  const handleShareEp = (mission: Mission, status: string) => {
    if (status === 'in_progress') {
      dispatch(globalSlice.toggleBottomSheetLogin({}));
    } else if (status === 'completed') {
      dispatch(userSlice.missionsComplete({ userId: user.id, missionType: mission.type }))
    }
  }

  const signInProcess = (code: string, authType: string) => {
    dispatch(userSlice.authSns({ code, userId: user?.id, authType }));
  };

  // SNS 로그인 결과
  useEffect(() => {
    if (authSnsError) {
      console.log('authSnsError ', authSnsError);
      dispatch(globalSlice.addToast({
        id: Date.now(),
        message: '로그인에 실패하였습니다.',
        duration: 3000,
      }))

      dispatch(userSlice.clearUserState("authSnsError"));
    }

    if (authSnsResult && authSnsResult.status === 200) {
      console.log('authSnsResult ', authSnsResult);
      const user: User = authSnsResult.data.user;


      if (authSnsResult.data?.request_auth_type !== user?.auth) {
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


      dispatch(globalSlice.addToast({
        id: Date.now(),
        message: '로그인 성공',
        duration: 2000,
      }))

      dispatch(userSlice.setUser(user));
      dispatch(userSlice.setUserMissionList(user.userMissions))

      localStorage.setItem("user-id", user.id);

      dispatch(userSlice.clearUserState("authSnsResult"));
      return;
    }
  }, [authSnsResult, authSnsError, isMobile]);


  // 사용자 출석 체크
  useEffect(() => {
    if (attendanceCheckError) {
      console.log("attendanceCheckError ", attendanceCheckError);

      dispatch(userSlice.clearUserState("attendanceCheckError"));
    }

    if (attendanceCheckResult && attendanceCheckResult.status === 201) {
      console.log("attendanceCheckResult ", attendanceCheckResult);

      setIsAttended(true);
      setStreak(attendanceCheckResult.data.streak);

      dispatch(globalSlice.addToast({
        id: Date.now(),
        message: `${attendanceCheckResult.data.reward} 코인을 받았어요!`,
        duration: 1500,
      }))

      dispatch(userSlice.setUser({
        ...user,
        free_point: user.free_point + attendanceCheckResult.data.reward
      }))


      dispatch(userSlice.clearUserState("attendanceCheckResult"));
    }
  }, [attendanceCheckResult, attendanceCheckError]);

  // 사용자 출석일차 조회
  useEffect(() => {
    if (attendanceError) {
      console.log("attendanceError ", attendanceError);
      setLoading(false);

      dispatch(userSlice.clearUserState("attendanceError"));
    }

    if (attendanceResult && attendanceResult.status === 200) {
      console.log("attendanceResult ", attendanceResult);

      const today = moment().format('YYYY-MM-DD');
      setStreak(attendanceResult.data.currentStreak);

      if (attendanceResult.data.lastAttendance === today) {
        setIsAttended(true);
      }

      dispatch(userSlice.clearUserState("attendanceResult"));
    }
  }, [attendanceResult, attendanceError])

  // 미션 완료 업데이트
  useEffect(() => {
    if (missionsCompleteError) {
      console.log('missionsCompleteError ', missionsCompleteError);

      dispatch(userSlice.clearUserState("missionsCompleteError"));
    }

    if (missionsCompleteResult && missionsCompleteResult.status === 200) {
      console.log("missionsCompleteResult ", missionsCompleteResult);
      const mission = missionsCompleteResult.data.mission;

      const freePoint = user.free_point + mission.reward;
      const userMissions = userMissionList.map((item: any) => {
        if (item.mission_id === missionsCompleteResult.data.mission_id) {
          return {
            ...item,
            status: missionsCompleteResult.data.status
          }
        } else {
          return item;
        }
      })

      dispatch(globalSlice.addToast({
        id: new Date(),
        duration: 2000,
        message: `${missionsCompleteResult.data.mission.reward} 코인을 받았어요!`
      }))

      dispatch(userSlice.setUser({ ...user, free_point: freePoint }));
      dispatch(userSlice.setUserMissionList(userMissions));

      dispatch(userSlice.clearUserState("missionsCompleteResult"));
    }

  }, [missionsCompleteResult, missionsCompleteError])

  // 미션 리스트 조회
  useEffect(() => {
    if (missionListError) {
      console.log("missionListError ", missionListError);
      setLoading(false);

      dispatch(globalSlice.clearGlobalState("missionListError"));
    }

    if (missionListResult && missionListResult.status === 200) {
      console.log("missionListResult ", missionListResult);
      setLoading(false);

      dispatch(globalSlice.setMissionList(missionListResult.data));

      dispatch(userSlice.clearUserState("attendanceResult"));
    }
  }, [missionListResult, missionListError]);

  useEffect(() => {
    // 광고 보기 & 에피소드 보기 미션 진행률 애니메이션
    if (missionList.length > 0 && userMissionList.length > 0) {
      const watchEpMission = missionList.find((mission: Mission) => mission.type === 'watch_ep');
      const watchAdMission = missionList.find((mission: Mission) => mission.type === 'watch_ad');

      const watchEpTargetValue = watchEpMission.target_value;
      const watchEpProgressValue = userMissionList.find((userMission: UserMission) => userMission.mission_id === watchEpMission.id).progress_value;
      const watchEpSpringValue = (watchEpProgressValue / watchEpTargetValue) * 100;

      const watchAdTargetValue = watchAdMission.target_value;
      const watchAdProgressValue = userMissionList.find((userMission: UserMission) => userMission.mission_id === watchAdMission.id).progress_value;
      const watchAdSpringValue = (watchAdProgressValue / watchAdTargetValue) * 100;

      setWatchEpPercent(watchEpSpringValue);
      setWatchAdPercent(watchAdSpringValue);
    }
  }, [missionList, userMissionList, progressBarRef])

  useEffect(() => {
    setLoading(true);

    if (user?.auth === 'guest') {
      dispatch(globalSlice.toggleBottomSheetLogin({}));
    }

    dispatch(userSlice.attendance({ userId: user.id }));
    dispatch(globalSlice.missionList({}));

  }, []);


  // const renderAttendanceBoardPc = () => {
  //   return (
  //     <>
  //     {[1, 2, 3, 4, 5, 6, 7].map(day => {
  //       return (
  //       <div className='day-item' key={day}>
  //         <div className='day-circle-wrap'>
  //           <div className='circle'>
  //             <img src={`resources/images/${streak >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`}/>
  //             <span>{streak >= day ? '' : day}</span>
  //           </div>
  //           {day !== 7 && <span style={streak > day ? {backgroundColor: '#458AFF'} : {}} className='day-item-divider'/>}
  //         </div>
  //         <span className={`day-text ${streak >= day ? 'attended' : ''}`} style={day === 7 ? {transform: 'translateX(0%)'} : {}}><span className='day-count'>{day}</span>일차</span>
  //       </div>
  //     )
  //     })}
  //     </>
  // )}

  const renderAttendanceBoardMobile = () => {
    return (
      <div className='day-list-row-wrap'>
        <div className='day-list-row'>
          {[1, 2, 3].map(day => {
            return (
              <div className='day-item' key={day}>
                <div className='day-circle-wrap'>
                  <div className='circle'>
                    <img src={`resources/images/${streak >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`} />
                    <span>{streak >= day ? '' : day}</span>
                  </div>
                  {day !== 3 && <span style={streak > day ? { backgroundColor: '#458AFF' } : {}} className='day-item-divider' />}
                </div>
                <span className={`day-text ${streak >= day ? 'attended' : ''}`} style={day === 3 ? { transform: 'translateX(0%)' } : {}}><span className='day-count'>{day}</span>일차</span>
              </div>
            )
          })}
        </div>
        <div className='day-list-row'>
          {[4, 5, 6, 7].map(day => {
            return (
              <div className='day-item' key={day}>
                <div className='day-circle-wrap'>
                  <div className='circle'>
                    <img src={`resources/images/${streak >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`} />
                    <span>{streak >= day ? '' : day}</span>
                  </div>
                  {(day !== 7 && day !== 3) && <span style={streak > day ? { backgroundColor: '#458AFF' } : {}} className='day-item-divider' />}
                </div>
                <span className={`day-text ${streak >= day ? 'attended' : ''}`} style={day === 7 ? { transform: 'translateX(0%)' } : {}}><span className='day-count'>{day}</span>일차</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='page-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose} />
        </div>
        <div className='title'>
          미션 & 이벤트
        </div>
        <div className='right-section'>
          <span className='empty' />
        </div>
      </div>
      {loading && (
        <div className="loading">
          <TailSpin width={60} height={60} color={"#ffffff"} />
        </div>
      )}
      {!loading && (
        <div className='page-body'>
          <div className='attendance-check-wrap'>
            <div className='p-title' style={{ marginTop: 15 }}>
              <div className='align-items'>
                내 보유 코인
                <img src='resources/icons/icon_bang_fill.svg' />
              </div>
              <div className='my-coin-count'>{((user.paid_point + user.free_point) ? (user.paid_point + user.free_point) : 0).toLocaleString()}
                <img src={'resources/icons/icon_graphic_coin.png'} />
              </div>
            </div>
            <div className='attendance-check-background'>
              <div className='day-list-wrap'>
                {/* {isMobile ? renderAttendanceBoardMobile() : renderAttendanceBoardPc()} */}
                {renderAttendanceBoardMobile()}
              </div>
              <button disabled={isAttended} className={`attendance-btn ${isAttended ? 'disabled' : ''}`} onClick={handleAttend}>
                {isAttended ? '출석 완료' : '출석 체크'}
              </button>
            </div>
          </div>
          <div className='mission-wrap'>
            <div className='p-title'>
              <div>
                이달의 미션
                <img src='resources/icons/icon_bang_fill.svg' />
              </div>
            </div>
            {missionList.map((mission: Mission) => {
              const userMission = userMissionList?.find((item: any) => item.mission_id === mission.id);

              return (
                <div className='mission-item-wrap' key={mission.id}>
                  <img src={`/resources/images/mission_${mission.type}.png`} />
                  <div className='mission-info'>
                    <div className='mission-title'>{missionType[mission.type].name}</div>
                    <div className='reward'>{`+ ${mission.reward} 코인`}</div>
                    {mission.target_value > 1 && (
                      <div className='progress-wrap'>
                        {mission.type === 'watch_ep' && (
                          <div className='progress-bar'>
                          <animated.div
                            className="progress-spring" style={watchEpSpring}>
                          </animated.div>
                          </div>
                        )}
                        {mission.type === 'watch_ad' && (
                          <div className='progress-bar'>
                            <animated.div
                              className="progress-spring" style={watchAdSpring}>
                            </animated.div>
                          </div>
                        )}
                        <span>{`${userMission?.progress_value ? userMission?.progress_value : 0}/${mission.target_value ? mission.target_value : 0}`}</span>
                      </div>
                    )}
                  </div>
                  {mission.type === 'connect_sns' && (
                    <button disabled={userMission?.status === 'rewarded'} onClick={() => handleConnectSns(mission, userMission.status)}>
                      {userMission?.status === 'completed' ? '코인 받기' : userMission?.status === 'rewarded' ? '미션 완료' : missionType[mission.type].btn_label}
                    </button>
                  )}
                  {mission.type === 'watch_ad' && (
                    <button disabled={userMission?.status === 'rewarded'} onClick={() => handleWatchAd(mission, userMission.status)}>
                      {userMission?.status === 'completed' ? '코인 받기' : userMission?.status === 'rewarded' ? '미션 완료' : missionType[mission.type].btn_label}
                    </button>
                  )}
                  {mission.type === 'watch_ep' && (
                    <button disabled={userMission?.status === 'rewarded'} onClick={() => handleWatchEp(mission, userMission.status)}>
                      {userMission?.status === 'completed' ? '코인 받기' : userMission?.status === 'rewarded' ? '미션 완료' : missionType[mission.type].btn_label}
                    </button>
                  )}
                  {mission.type === 'share_ep' && (
                    <button disabled={userMission?.status === 'rewarded'} onClick={() => handleShareEp(mission, userMission.status)}>
                      {userMission?.status === 'completed' ? '코인 받기' : userMission?.status === 'rewarded' ? '미션 완료' : missionType[mission.type].btn_label}
                    </button>
                  )}
                  {/* { mission.type === 'set_alarm' && (
                  <button disabled={userMission?.status === 'rewarded'} onClick={() => handleSetAlarm(mission, userMission.status)}>
                  {userMission?.status === 'completed' ? '코인 받기' : userMission?.status === 'rewarded' ? '미션 완료' : missionType[mission.type].btn_label }
                  </button>
                  )} */}
                </div>
              )
            })}
            <div className='mission-item-wrap' style={{ visibility: 'hidden', maxHeight: 20, padding: 0 }}>
              <img src={`/resources/images/mission_connect_sns.png`} />
              <div className='mission-info'>
                <div className='progress-wrap'>
                  <div className='progress-bar' ref={progressBarRef}></div>
                  <span>10/10</span>
                </div>
              </div>
              <button>
                코인 받기
              </button>
            </div>

          </div>
          <div className='p-title'>
            이용 안내
          </div>
          <div className='provision-wrap'>
            <ul>
              <li>보너스 코인은 구매 취소 및 환불이 불가하다.</li>
              <li>미션과 이벤트를 통해 지급 받은 보너스 코인의 유효기간은 모두 7일입니다.</li>
              <li>드라마 시청 시 코인(유상)이 먼저 사용되고 부족한 경우 유효기간이 짧은 보너스 코인부터 자동으로 사용됩니다. </li>
            </ul>
          </div>
        </div>
      )}
      {user?.auth === 'guest' && (
        <UIBottomSheetLogin
          ref={loginSheetRef}
          visible={visibleBottomSheetLogin}
          signInProcess={signInProcess}
          handleLoginBottomSheetClose={handleLoginClose}
        />
      )}
    </div>
  )
}

export default MissionPage;