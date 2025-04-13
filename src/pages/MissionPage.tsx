import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";
import moment from 'moment';

import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';
import UIBottomSheetLogin from 'components/ui/bottomsheet/UIBottomSheetLogin';
import { authType, missionType } from 'common/define';
import { Mission, User } from 'src/types';

const MissionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { missionList, visibleBottomSheetLogin, isMobile, missionListResult, missionListError } = useSelector((state: any) => state.global);
  const { user, attendanceResult, attendanceError, attendanceCheckError, attendanceCheckResult, authSnsResult, authSnsError } = useSelector((state: any) => state.user);

  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isAttended, setIsAttended] = useState(false);

  const loginSheetRef = useRef<any>(null);

  const handleClose = () => {
    navigate(-1);
  }
  
  const handleLoginClose = useCallback(() => {
    dispatch(globalSlice.toggleBottomSheetLogin({}));
  }, []);

  const handleAttend = () => {
    if(isAttended) return;

    dispatch(userSlice.attendanceCheck({userId: user.id}));
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


      dispatch(globalSlice.addToast({
        id: Date.now(),
        message: '로그인 성공',
        duration: 2000,
      }))

      dispatch(userSlice.setUser(user));

      localStorage.setItem("user-id", user.id);

      dispatch(userSlice.clearUserState("authSnsResult"));
      return;
    }
  }, [authSnsResult, authSnsError, isMobile]);


  // 사용자 출석 체크
  useEffect(() => {
    if(attendanceCheckError) {
      console.log("attendanceCheckError ", attendanceCheckError);

      dispatch(userSlice.clearUserState("attendanceCheckError"));
    }

    if(attendanceCheckResult && attendanceCheckResult.status === 201) {
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
    if(attendanceError) {
      console.log("attendanceError ", attendanceError);
      setLoading(false);

      dispatch(userSlice.clearUserState("attendanceError"));
    }

    if(attendanceResult && attendanceResult.status === 200) {
      console.log("attendanceResult ", attendanceResult);

      const today = moment().format('YYYY-MM-DD');
      setStreak(attendanceResult.data.currentStreak);

      if(attendanceResult.data.lastAttendance === today) {
        setIsAttended(true);
      }

      dispatch(userSlice.clearUserState("attendanceResult"));
    }
  }, [attendanceResult, attendanceError])

  // 미션 리스트 조회
  useEffect(() => {
    if(missionListError) {
      console.log("missionListError ", missionListError);
      setLoading(false);

      dispatch(globalSlice.clearGlobalState("missionListError"));
    }

    if(missionListResult && missionListResult.status === 200) {
      console.log("missionListResult ", missionListResult);
      setLoading(false);

      dispatch(globalSlice.setMissionList(missionListResult.data));

      dispatch(userSlice.clearUserState("attendanceResult"));
    }
  }, [missionListResult, missionListError])

  useEffect(() => {
    setLoading(true);

    if(user.auth === 'guest') {
      dispatch(globalSlice.toggleBottomSheetLogin({}));
    }

    dispatch(userSlice.attendance({userId: user.id}));
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
              <img src={`resources/images/${streak >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`}/>
              <span>{streak >= day ? '' : day}</span>
            </div>
            {day !== 3 && <span style={streak > day ? {backgroundColor: '#458AFF'} : {}} className='day-item-divider'/>}
          </div>
          <span className={`day-text ${streak >= day ? 'attended' : ''}`} style={day === 3 ? {transform: 'translateX(0%)'} : {}}><span className='day-count'>{day}</span>일차</span>
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
              <img src={`resources/images/${streak >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`}/>
              <span>{streak >= day ? '' : day}</span>
            </div>
            {(day !== 7 && day !== 3) && <span style={streak > day ? {backgroundColor: '#458AFF'} : {}} className='day-item-divider'/>}
          </div>
          <span className={`day-text ${streak >= day ? 'attended' : ''}`} style={day === 7 ? {transform: 'translateX(0%)'} : {}}><span className='day-count'>{day}</span>일차</span>
        </div>
      )
      })}
      </div>
      </div>
  )}

  return (
    <div className='page-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
        </div>
        <div className='title'>
          미션 & 이벤트
        </div>
        <div className='right-section'>
          <span className='empty'/>
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
            <div className='p-title' style={{marginTop: 15}}>
              <div className='align-items'>
                내 보유 코인
                <img src='resources/icons/icon_bang_fill.svg'/>
              </div>
              <div className='my-coin-count'>{((user.paid_point + user.free_point) ? (user.paid_point + user.free_point) : 0).toLocaleString()}
              <img src={'resources/icons/icon_graphic_coin.png'}/>  
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
            <img src='resources/icons/icon_bang_fill.svg'/>
            </div>
          </div>
          {missionList.map((mission: Mission) => {
            const userMission = user.userMissions?.find((item: any) => item.mission_id === mission.id);

            return (
              <div className='mission-item-wrap' key={mission.id}>
                  <img src={`/resources/images/mission_${mission.type}.png`}/>
                  <div className='mission-info'>
                    <div className='mission-title'>{missionType[mission.type].name}</div>
                    <div className='reward'>{`+ ${mission.reward} 코인`}</div>
                    <div className='progress-wrap'>
                      <div className='progress-bar'></div>
                      <span>{`${userMission?.progress_value}/${mission.target_value}`}</span>
                    </div>
                  </div>
                <button>
                  {userMission?.status === 'completed' ? '코인 받기' : userMission?.status === 'rewarded' ? '미션 완료' : missionType[mission.type].btn_label }
                </button>
              </div>
            )
          })}
        </div>
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
  )
}

export default MissionPage;