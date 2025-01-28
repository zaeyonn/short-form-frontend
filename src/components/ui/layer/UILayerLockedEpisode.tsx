import { useState } from 'react';
import UIBottomSheetPayment from 'components/ui/bottomsheet/UIBottomSheetPayments';

import { Series } from 'src/types';

interface Props {
  series: Series | undefined;
  handleLockedClose: () => any;
  handlePaymentComplete: () => any;
}

const UILayerLockedEpisode = ({series, handlePaymentComplete}: Props) => {
  const [visibleBtnList, setVisibleBtnList] = useState(true);
  const [visiblePayment, setVisiblePayment] = useState(false);

  const handlePaymentOpen = () => {
    setVisibleBtnList(false);
    setVisiblePayment(true);
  }

  const handlePaymentClose = () => {
    setVisibleBtnList(true);
    setVisiblePayment(false);
  }


  return (
    <>
    {visibleBtnList && (
    <div className='locked-episode'>
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
    <UIBottomSheetPayment
      visible={visiblePayment}
      series={series}
      handleBottomSheetClose={handlePaymentClose}
      handlePaymentComplete={handlePaymentComplete}/>
    </>
  )
}

export default UILayerLockedEpisode