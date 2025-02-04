import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UIBottomSheetPayment from 'components/ui/bottomsheet/UIBottomSheetPayments';

import * as globalSlice from 'src/redux/globalSlice';
import { Series } from 'src/types';
import { displayPopType } from 'common/define';

interface Props {
  series: Series | undefined;
  handleLockedClose: () => any;
  handlePaymentComplete: () => any;
}

const UILayerLockedEpisode = ({series, handlePaymentComplete}: Props) => {
  const dispatch = useDispatch();

  const { isMobile } = useSelector((state: any) => state.global);

  const [visibleBtnList, setVisibleBtnList] = useState(true);
  const [visiblePayment, setVisiblePayment] = useState(false);

  const handlePaymentOpen = () => {
    if(isMobile) {
      setVisibleBtnList(false);
      setVisiblePayment(true);
    } else {
      dispatch(globalSlice.setDisplayPopName(displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name));
    }
  }

  const handlePaymentClose = () => {
    setVisibleBtnList(true);
    setVisiblePayment(false);
  }

  return (
    <>
    { visibleBtnList && (
    <div className='locked-episode' style={{cursor: 'default'}} onClick={(event) => event.stopPropagation()}>
      <button className='payment-btn' onClick={() => handlePaymentOpen()}>
        충전하고 바로보기
      </button>
      <button className='view-ad-btn'>
        광고 보고 다음 화 보기
        <span>오늘 시청 (1/10)</span>
      </button>
      {/* <img onClick={handleLockedClose} src='/resources/icons/icon_close_l.svg'/> */}
    </div>
    )}
    { isMobile && (
      <UIBottomSheetPayment
        visible={visiblePayment}
        series={series}
        handleBottomSheetClose={handlePaymentClose}
        handlePaymentComplete={handlePaymentComplete}/>
    )}
    </>
  )
}

export default UILayerLockedEpisode