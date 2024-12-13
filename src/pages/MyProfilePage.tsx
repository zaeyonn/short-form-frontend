import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

const MyProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleButtonClick = () => {

  }

  return (
    <>
      <div className='profile'>   
        <img src='resources/icons/icon_profile.svg' style={{float:'left'}}/>
        <div className='userinfo'>{`게스트\nUID ${user.uid}`}</div> 
        <button className='login'>로그인</button>
      </div>

      <div className='wallet'>
        <div className='head'>내지갑</div>
        <div className='body'>
          <div>{`${user.point}`}</div>
          <button className='purchase-point'>충전</button>
        </div>
      </div>

      <div className='viewrlist'>
        <div>시청 기록</div>
      </div>
    </>
  );
};

export default MyProfilePage;