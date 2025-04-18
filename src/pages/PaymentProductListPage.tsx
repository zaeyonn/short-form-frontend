import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';

import { Product, UserRootState } from 'src/types';
import { subscriptionType } from 'common/define';

const PaymentProductListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productList, productListResult, productListError } = useSelector((state: any) => state.global);
  const { user, coins, paymentProduct, paymentsConfirmError, paymentsConfirmResult, paymentsRegistError, paymentsRegistResult, subscribeResult, subscribeError } = useSelector((state: UserRootState) => state.user);

  const [_paymentLoading, setPaymentLoading] = useState(false);

  const orderIdRef = useRef();
  const paymentWindowRef = useRef<any>(null);

  const handleClose = () => {
    navigate(-1);
  }

  
  const handlePaymentStart = (product: Product) => {
    dispatch(userSlice.setPaymentProduct(product))

    // 서버에 결제 상품 등록
    dispatch(userSlice.paymentsRegist({
      userId: user.id,
      productId: product.id,
      productType: product.type,
      amount: product.amount,
      paidCoin: product.paid_coin,
      freeCoin: product.free_coin,
    }))
  }

  // 결제창 로드
  const handlePaymentLoad = (e: any) => {
    console.log('handlePaymentLoad message', e.data.message);
    if (e.data.message === "onload") {
      e.source.postMessage({ product: paymentProduct, user_id: user.id, order_id: orderIdRef.current }, "*");
    }
  };

  // 결제 완료
  const handlePaymentResult = () => {
    const paymentResult = localStorage.getItem("@tosspayments/payment-result");
    const paymentKey = localStorage.getItem("@tosspayments/payment-key");
    const requestOrderId = localStorage.getItem("@tosspayments/order-id");
    const requestAmount = localStorage.getItem("@tosspayments/amount");
    const code = localStorage.getItem("@tosspayments/code");
    const message = localStorage.getItem("@tosspayments/message");

    // localStorage 결제 정보 삭제
    localStorage.removeItem("@tosspayments/payment-result");
    localStorage.removeItem("@tosspayments/payment-key");
    localStorage.removeItem("@tosspayments/order-id");
    localStorage.removeItem("@tosspayments/amount");
    localStorage.removeItem("@tosspayments/code");
    localStorage.removeItem("@tosspayments/message");

    // 결제 요청 성공
    if (paymentResult === "completed" && paymentKey) {
      // 결제 정보 유효한지 확인
      if (Number(requestAmount) !== Number(paymentProduct.amount) || requestOrderId !== orderIdRef.current) {
        setPaymentLoading(false);
        console.log('결제 정보 불일치');
        return;
      }

      dispatch(userSlice.paymentsConfirm({ userId: user.id, orderId: orderIdRef.current, amount: paymentProduct.amount, paymentKey }));
    }

    // 결제 요청 실패
    if (paymentResult === "failed" && code && message) {
      setPaymentLoading(false);
      let modalMessage = "";

      if (code === "PAY_PROCESS_CANCELED") {
        // 사용자에 의해 결제가 취소
        modalMessage = '결제가 취소되었습니다'
      } else if (code === "INVALID_CARD_COMPANY") {
        // 결제 승인 거절
        modalMessage = '결제가 실패하였습니다.';
      } else if (code === "PAY_PROCESS_ABORTED") {
        // 결제 진행 중 승인 실패
        modalMessage = '결제가 실패하였습니다.';
      } else if (code === "NOT_SUPPORTED_EASYPAY_METHOD") {
        // 지원하지 않는 간편 결제
        modalMessage = '지원하지 않은 결제 방식입니다.';
      } else if (code === "REJECT_CARD_COMPANY") {
        // 카드 정보 유효하지 않음
        modalMessage = '카드 정보가 유효하지 않습니다.';
      } else {
        modalMessage = '결제가 실패하였습니다.';
      }

      return modalMessage;
    }
  };

  
  // 결제 완료
  const handlePaymentComplete = () => {

  
  };

  useEffect(() => {
    if (paymentsConfirmError) {
      console.log("paymentsConfirmError ", paymentsConfirmError);
      dispatch(userSlice.clearUserState("paymentsConfirmError"));
      setPaymentLoading(false);

      // 결제 실패 토스트 발생
      dispatch(
        globalSlice.addToast({
          id: Date.now(),
          message: "결제에 실패했습니다.",
          duration: 1500,
        })
      );

      return;
    }

    if (paymentsConfirmResult && paymentsConfirmResult.status === 201) {
      console.log("paymentsConfirmResult ", paymentsConfirmResult);
      setPaymentLoading(false);

      if(paymentsConfirmResult.data.product_type === 'coin') {
        // 사용자 코인 업데이트
        dispatch(userSlice.setCoins({ paid: coins.paid + paymentsConfirmResult.data.paid_coin, free: coins.free + paymentsConfirmResult.data.free_coin }));

        handleClose();
      } else if(paymentsConfirmResult.data.product_type === 'subscription') {
        // 사용자 구독 업데이트
        dispatch(userSlice.subscribe({userId: user.id, productId: paymentsConfirmResult.data.product_id}));
      }

      // 에피소드 잠금 해제
      handlePaymentComplete();

      // 결제 성공 토스트 발생
      dispatch(
        globalSlice.addToast({
          id: Date.now(),
          message: "결제가 완료되었습니다.",
          duration: 1500,
        })
      );

      dispatch(userSlice.clearUserState("paymentsConfirmResult"));
    }
  }, [paymentsConfirmResult, paymentsConfirmError, user]);

  // 구독 상품 등록 완료
  useEffect(() => {
    if(subscribeError) {
      console.log('subscribeError', subscribeError);

      dispatch(userSlice.clearUserState("subscribeError"));
    }

    if(subscribeResult && subscribeResult.status === 201) {
      console.log('subscribeResult', subscribeResult);

      dispatch(userSlice.setSubscription(subscribeResult.data.subscription));
      handleClose();
      
      dispatch(userSlice.clearUserState("subscribeResult"));
    }
  }, [subscribeResult, subscribeError])

  useEffect(() => {
    if (paymentsRegistError) {
      console.log("paymentsRegistError ", paymentsRegistError);
      dispatch(userSlice.clearUserState("paymentsRegistError"));
      return;
    }

    if (paymentsRegistResult && paymentsRegistResult.status === 201) {
      console.log("paymentsRegistResult ", paymentsRegistResult);

      setPaymentLoading(true);

      orderIdRef.current = paymentsRegistResult.data.order_id;

      setTimeout(() => {
        paymentWindowRef.current = window.open(window.location.origin + "/callback/tosspayment", "toss-payment-widget", "height=580,width=480");

        // 결제 팝업창 닫힌 경우 이벤트 등록
        if (paymentWindowRef.current) {
          paymentWindowRef.current.addEventListener('unload', () => {

            // 팝업창이 닫혔는지 확인
            setTimeout(() => {
              if (paymentWindowRef.current?.closed) {
                setPaymentLoading(false);
              }
            }, 100);
          });
        }
      });

      dispatch(userSlice.clearUserState("paymentsRegistResult"));
    }
  }, [paymentsRegistResult, paymentsRegistError]);

  // 결제 상품 조회 결과
  useEffect(() => {
    if (productListError) {
      console.log("productListError ", productListError);

      dispatch(globalSlice.clearGlobalState("productListError"));
    }

    if(productListResult && productListResult.status === 200) {
      console.log("productListResult ", productListResult);
      const productList = productListResult.data;

      dispatch(globalSlice.setProductList(productList));

      dispatch(globalSlice.clearGlobalState("productListResult"));
    }
  }, [productListResult, productListError])

  // 결제창 이벤트 등록
  useEffect(() => {
    // 결제창으로 상품 정보 전달
    window.addEventListener("message", handlePaymentLoad);

    // 결제창에서 결제 완료 후 localStorage가 변경된 경우 이벤트 등록
    window.addEventListener("storage", handlePaymentResult);

    return () => {
      window.removeEventListener("message", handlePaymentLoad);
      window.removeEventListener("storage", handlePaymentResult);
    };
  }, [paymentProduct, orderIdRef.current]);

  useEffect(() => {

    // 결제 상품 조회
    dispatch(globalSlice.productList({}));
  }, []);


  return (
    <div className='page-wrap'>

      <div className='header'>
        <div className='left-section'>
          <img src={`/resources/icons/icon_arrow_left_m.svg`} onClick={() => handleClose()} />
        </div>
        <div className='title'>
          충전하기
        </div>
        <div className='right-section'>
          <span className='empty' />
        </div>
      </div>
      <div className='page-body'>
        <div className="my-point-wrap" style={{ padding: "22px 16px" }}>
          <div className="my-point">
            <label>
              내 코인
              <img src='resources/icons/icon_bang.svg' />
            </label>
            <div className="point-value">
              {(coins?.paid) ? (coins?.paid).toLocaleString() : 0}
              <img src="resources/icons/icon_coin_s.png" />
            </div>
          </div>
          <div className="my-point">
            <label>
              보너스 코인
              <img src='resources/icons/icon_bang.svg' />
            </label>
            <div className="point-value">
              {(user?.free_coin) ? (user?.free_coin).toLocaleString() : 0}
              <img src="resources/icons/icon_coin_s.png" />
            </div>
          </div>
        </div>
        <div className='p-title'>
          코인충전
        </div>
        <div className='product-list-wrap' style={{ marginTop: 14 }}>
        {productList.filter((item: Product) => item.type === 'coin').map((item: Product, index: number) => {
              return (
                <div key={item.id}>
                  <div className={`product-item ${index === 3 ? 'last-child' : ''}`}>
                    <div className='label light'>
                      {item.first_charging_event && (
                        <span className='discount-sign'>첫 구매 할인</span>
                      )}
                      <div className='product-name'>
                        {item.paid_coin.toLocaleString() + ' 코인'}
                        {item.free_coin > 0 && (
                          <span className='bonus-point'>
                            {'  + ' + (item.first_charging_event ? (item.paid_coin * 0.3) : (item.free_coin)).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handlePaymentStart(item)}>{item.amount.toLocaleString()}<span> 원</span></button>
                  </div>
                </div>
              )
            })} 
        </div>
        <div className='p-title'>
          구독하기
        </div>
        <div className='product-list-wrap' style={{ marginTop: 14 }}>
        {productList.filter((item: Product) => item.type === 'subscription').map((item2: Product, index: number) => {
              return (
                <div key={item2.id}>
                  <div className={`product-item ${index === 2 ? 'last-child' : ''}`}>
                    <div className='label light'>
                      <div className='product-name'>
                        <img src='resources/icons/icon_pass.svg'/>
                        {subscriptionType[item2.name].name}
                        {item2.free_coin > 0 && (
                          <span className='bonus-point'>
                            {'  + ' + (item2.first_charging_event ? (item2.paid_coin * 0.3) : (item2.free_coin)).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handlePaymentStart(item2)}>{item2.amount.toLocaleString()}<span> 원</span></button>
                  </div>
                </div>
              )
            })} 
        </div>
        <div className='p-title'>
          코인 이용안내
        </div>
        <div className='provision-wrap'>
          <ul>
            <li>결제금액에는 VAT가 포함되어 있습니다.</li>
            <li>결제 진행 시 서비스 이용약관을 확인바랍니다.</li>
            <li>콘텐츠 구매 후 바로 재생되며, 사용한 코인은 취소 및 환불이 불가능합니다.</li>
            <li>충전한 코인을 사용하여 콘텐츠를 볼 수 있습니다.</li>
            <li>코인의 유효기간은 충전 후 5년이며, 이후 자동 소멸 됩니다. 단, 회사의 이벤트나 프로모션에 의해 무상으로 지급된 코인은 별도로 명시된 유효기간까지만 사용 가능하며 유효기간이 지난 코인은 자동소멸 됩니다.</li>
            <li>코인은 유효기간이 빠른 순서대로 소진되며, 유상 코인과 무상(보너스) 코인의 유효기간이 같은 경우, 유상 코인이 먼저 소진됩니다.</li>
            <li>회원이 탈퇴하는 경우 충전한 코인은 사용할 수 없습니다.</li>
            <li>보너스 코인 등 회사가 무상으로 제공한 코인은 환불할 수 없습니다.</li>
            <li>미성년자가 코인을 충전하려면 법정대리인의 동의가 필요하며, 동의를 받지 않은 경우 법정대리인이 이를 취소할 수 있습니다.</li>
            <li>Apple 미디어에서 코인을 충전한 경우, Apple 미디어 서비스 이용 약관에 따라 Apple 고객센터를 통해서만 구매 취소 또는 환불할 수 있습니다.</li>
            <li>Google Play 결제로 충전한 코인의 구매 취소는 미사용분에 한하여 고객센터를 통해서 할 수 있으며, 보유한 코인(유상)의 전액 환불만 가능합니다.</li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default PaymentProductListPage;
