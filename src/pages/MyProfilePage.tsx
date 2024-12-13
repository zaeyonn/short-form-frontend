import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { displayPopType } from 'src/common/define';
import * as globalSlice from '../redux/globalSlice';
import PopLogin from 'components/pop/PopLogin';
import PopPurchasePoint from 'components/pop/PopPurchasePoint';

const MyProfilePage = () => {
  const { displayPopName } = useSelector((state: RootState) => state.global);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleButtonClick = (displayPopName: string) => {
    dispatch(globalSlice.setDisplayPopName(displayPopName));
  }

  return (
    <>
      <div className='profile'>   
        <img src='resources/icons/icon_profile.svg' style={{float:'left'}}/>
        <div className='userinfo'>{`게스트\nUID ${user.uid}`}</div> 
        <button className='login' onClick={() => handleButtonClick(displayPopType.POPUP_LOGIN.name)}>로그인</button>
      </div>

      <div className='wallet'>
        <div className='head'>내지갑</div>
        <div className='body'>
          <div>{`${user.point}`}</div>
          <button className='purchase-point' onClick={() => handleButtonClick(displayPopType.POPUP_PURCHASE_POINT.name)}>충전</button>
        </div>
      </div>

      <div className='viewrlist'>
        <div>시청 기록</div>
        <div className='videolist'>
          { user.listVideoWatched.map((item) => (<img src={item}/>))}
        </div>
      </div>

      { displayPopType.POPUP_LOGIN.name === displayPopName && (<PopLogin/>)}
      { displayPopType.POPUP_PURCHASE_POINT.name === displayPopName && (<PopPurchasePoint/>)}
    </>
  );
};

export default MyProfilePage;