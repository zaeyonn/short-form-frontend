import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';

const MissionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile } = useSelector((state: any) => state.global);
  const { user, attendanceResult, attendanceError, attendanceCheckError, attendanceCheckResult } = useSelector((state: any) => state.user);

  const [streak, setStreak] = useState(0);
  const [isAttended, setIsAttended] = useState(false);

  const handleClose = () => {
    navigate(-1);
  }

  const handleAttend = () => {
    if(isAttended) return;

    dispatch(userSlice.attendanceCheck({userId: user.id}));
  }

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
        message: `${attendanceCheckResult.data.reward} 코인을 받았어요!.`,
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

  useEffect(() => {
    dispatch(userSlice.attendance({userId: user.id}))
  }, []);

  const renderAttendanceBoardPc = () => {
    return (
      <>
      {[1, 2, 3, 4, 5, 6, 7].map(day => {
        return (
        <div className='day-item' key={day}>
          <div className='day-circle-wrap'>
            <div className='circle'>
              <img src={`resources/images/${streak >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`}/>
              <span>{streak >= day ? '' : day}</span>
            </div>
            {day !== 7 && <span style={streak > day ? {backgroundColor: '#458AFF'} : {}} className='day-item-divider'/>}
          </div>
          <span className={`day-text ${streak >= day ? 'attended' : ''}`} style={day === 7 ? {transform: 'translateX(0%)'} : {}}><span className='day-count'>{day}</span>일차</span>
        </div>
      )
      })}
      </>
  )}

  
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
      <div className='page-body'>
        <div className='title'>
          미션 & 이벤트
        </div>
        <div className='attendance-check-wrap'>
          <div className='my-coin-wrap'>
            <div className='my-coin-text'>
              내 보유 코인
            </div>
            <div className='my-coin-count'>{((user.paid_point + user.free_point) ? (user.paid_point + user.free_point) : 0).toLocaleString()}
              <img src={'resources/icons/icon_graphic_coin.svg'}/>  
            </div>
          </div>
          <div className='attendance-check-background'>
            <div className='day-list-wrap'>
              {isMobile ? renderAttendanceBoardMobile() : renderAttendanceBoardPc()}
            </div>
            <button disabled={isAttended} className={`attendance-btn ${isAttended ? 'disabled' : ''}`} onClick={handleAttend}>
              출석 체크
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionPage;