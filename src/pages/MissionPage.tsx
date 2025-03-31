import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as userSlice from 'src/redux/userSlice';

const MissionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, attendanceResult, attendanceError, attendanceCheckError, attendanceCheckResult } = useSelector((state: any) => state.user);

  const [attendDay, setAttendDay] = useState(0);
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
      setAttendDay(attendanceCheckResult.streak);

      
      setAttendDay(attendDay + 1);

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

      dispatch(userSlice.clearUserState("attendanceResult"));
    }
  }, [attendanceResult, attendanceError])

  useEffect(() => {
    dispatch(userSlice.attendance({userId: user.id}))
  }, []);

  const renderAttendanceBoard = () => {
    return (
      <>
      {[1, 2, 3, 4, 5, 6, 7].map(day => {
        return (
        <div className='day-item' key={day}>
          <div className='day-circle-wrap'>
            <div className='circle'>
              <img src={`resources/images/${attendDay >= day ? 'attendance_checked_day.svg' : 'attendance_unchecked_day.svg'}`}/>
              <span>{attendDay >= day ? '' : day}</span>
            </div>
            {day !== 7 && <span style={attendDay > day ? {backgroundColor: '#458AFF'} : {}} className='day-item-divider'/>}
          </div>
          <span className={`day-text ${attendDay >= day ? 'attended' : ''}`} style={day === 7 ? {transform: 'translateX(0%)'} : {}}><span className='day-count'>{day}</span>일차</span>
        </div>
      )
      })}
      </>
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
      </div>
      <div className='page-body'>
        <div className='title'>
          미션 & 이벤트
        </div>
        <div className='attendance-check-wrap'>
          <div className='my-coin-text'>
            내 보유 코인
          </div>
          <div className='my-coin-count'>{(user.paid_point + user.free_point).toLocaleString()}
            <img src={'resources/icons/icon_graphic_coin.svg'}/>  
          </div>
          <div className='attendance-check-background'>
            <div className='day-list-wrap'>
              {renderAttendanceBoard()}
            </div>
            <button className='attendance-btn' onClick={handleAttend}>
              출석 체크
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionPage;