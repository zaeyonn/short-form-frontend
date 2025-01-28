import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';

import * as globalSlice from 'src/redux/globalSlice';

const UIPopPayments = () => {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: any) => state.user);

  const widgetsRef = useRef<any>(null);

  const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;

  const handleClose = () => {
    dispatch(globalSlice.setPayments(null));
  }

  const handlePaymentRequest = () => {
    widgetsRef.current.requestPayment({
      orderId: "4fEB5BaBIL9aD9hXzpNPp",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
    })
  }

  useEffect(() => {
     (async () => {
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
      widgetsRef.current = tossPayments.widgets({ customerKey: user.id });

      // 결제 금액 설정
      widgetsRef.current.setAmount({
        currency: 'KRW',
        value: 1000,
      })

      await widgetsRef.current.renderPaymentMethods({
        selector: '#payment-method'
      })

      await widgetsRef.current.renderAgreement({
        selector: '#agreement',
        variantKey: "AGREEMENT"
      })

    })()
  }, [])

  return (
    <div className='popup-wrap'>
      <div className='header'>
        <div className='title'>결제하기</div>
        <div className='right-section'>
          <img className='close-btn' onClick={handleClose} src='resources/icons/icon_close.svg'/>
        </div>
      </div>
      <div id='payment-method'/>
      <div id='agreement'/>
      <button className='payment-btn' onClick={handlePaymentRequest}>
        결제
      </button>
    </div>
  )
}

export default UIPopPayments;