import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

import * as globalSlice from "src/redux/globalSlice";
import * as userSlice from "src/redux/userSlice";

interface Props {
  handlePaymentComplete: () => void;
}

const UIPopPayments = (props: Props) => {
  const dispatch = useDispatch();

  const { payments } = useSelector((state: any) => state.global);
  const { user, requestPaymentResult, requestPaymentError } = useSelector(
    (state: any) => state.user
  );

  const widgetsRef = useRef<any>(null);
  const paymentWindowRef = useRef<any>(null);

  const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;

  const handleClose = () => {
    dispatch(globalSlice.setPayments(null));
  };

  const handlePaymentRequest = () => {
    
  };

  useEffect(() => {
    (async () => {
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
      widgetsRef.current = tossPayments.widgets({ customerKey: user.id });

      // 결제 금액 설정
      widgetsRef.current.setAmount({
        currency: "KRW",
        value: payments.amount,
      });

      await widgetsRef.current.renderPaymentMethods({
        selector: "#payment-method",
      });

      await widgetsRef.current.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });
    })();
  }, []);

  return (
    <div className="popup-layer">
      <div className="popup-wrap toss-payment-widget">
        <div className="header">
          <div className="title">결제하기</div>
          <div className="right-section">
            <img
              className="close-btn"
              onClick={handleClose}
              src="/resources/icons/icon_close_b.svg"
            />
          </div>
        </div>
        <div className="widget-wrap">
          <div id="payment-method" />
          <div id="agreement" />
        </div>
        <button
          className="primary-btn payment-btn"
          onClick={handlePaymentRequest}
        >
          결제
        </button>
      </div>
    </div>
  );
};

export default UIPopPayments;
