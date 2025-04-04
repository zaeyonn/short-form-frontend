import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UIBottomSheetProductList from "components/ui/bottomsheet/UIBottomSheetProductList";

import * as globalSlice from "src/redux/globalSlice";
import { displayPopType } from "common/define";

interface Props {
  handleLockedClose: () => any;
  handlePaymentComplete: () => any;
  handlePointUse: () => any;
  handleLoginOpen: () => any;
}

const UILayerLockedEpisode = ({
  handlePaymentComplete,
  handleLoginOpen,
  handlePointUse,
}: Props) => {
  const dispatch = useDispatch();

  const { isMobile, series } = useSelector((state: any) => state.global);
  const { user } = useSelector((state: any) => state.user);

  const [visibleBtnList, setVisibleBtnList] = useState(true);
  const [visibleBottomSheetPayment, setVisibleBottomSheetPayment] =
    useState(false);

  const handlePaymentOpen = () => {
    if (user.auth === "guest") {
      console.log('handlePaymentOpen')
      handleLoginOpen();
      return;
    }

    if (isMobile) {
      setVisibleBtnList(false);
      setVisibleBottomSheetPayment(true);
    } else {
      dispatch(
        globalSlice.setDisplayPopName(
          displayPopType.POPUP_PAYMENT_PRODUCT_LIST.name
        )
      );
    }
  };

  const handlePaymentClose = () => {
    setVisibleBtnList(true);
    setVisibleBottomSheetPayment(false);
  };

  const renderPaymentButton = () => {
    return (
      <>
        {user.paid_point + user.free_point > series.req_point ? (
          <button className="payment-btn" onClick={() => handlePointUse()}>
            {'다음화 바로보기'}
            {<span className="req_point">{`${series.req_point.toLocaleString()} 코인 사용`}</span>}
          </button>
        ) : (
          <button className="payment-btn" onClick={() => handlePaymentOpen()}>
          {'충전하고 바로보기'}
          </button>
        )}
      </>
    )
  }

  return (
    <>
      {visibleBtnList && (
        <div
          className="locked-episode"
          style={{ cursor: "default" }}
          onClick={(event) => event.stopPropagation()}
        >
          <>
          <div className="message">다음 화를 시청하시겠습니까?</div>
          <div className="user-points">{`내 보유 코인 : ${user.paid_point + user.free_point}`}</div>
          </> 
          {renderPaymentButton()}
          <button className="view-ad-btn">
            광고 보고 다음 화 보기
            <span>(준비중)</span>
          </button>
          {/* <img onClick={handleLockedClose} src='/resources/icons/icon_close_l.svg'/> */}
        </div>
      )}
      {isMobile && (
        <UIBottomSheetProductList
          visible={visibleBottomSheetPayment}
          series={series}
          handleBottomSheetClose={handlePaymentClose}
          handlePaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  );
};

export default UILayerLockedEpisode;
