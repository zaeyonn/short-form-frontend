import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux';
import { useGesture } from '@use-gesture/react';

import { UserRootState, Series, Product } from 'src/types';
import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';

interface Props {
  visible: boolean;
  series?: Series;
  handlePaymentComplete: () => any;
  handleBottomSheetClose: () => any;
}

const UIBottomSheetProductList = (props: Props) => {
  const dispatch = useDispatch();

  const [_paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const { user, coins, paymentProduct, paymentsConfirmResult, paymentsConfirmError, paymentsRegistError, paymentsRegistResult } = useSelector((state: UserRootState) => state.user);
  const { productList } = useSelector((state: any) => state.global);

  const orderIdRef = useRef();
  const paymentWindowRef = useRef<any>(null);

  const weeklySubProduct = productList.find((item: Product) => item.name === 'weekly');
  
  const [springs, api] = useSpring(() => ({
    from: { y: 620 },
    config: { mass: 1.1, tension: 270, friction: 25 },
  }))

  const bind = useGesture({
    onDrag: ({ down, movement: [_, my] }) => {
      api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
    },
    onDragEnd: ({ movement: [_, my] }) => {
      if (my > 20) {
        api.start({ y: 620 });
        props.handleBottomSheetClose();
      }
    }
  })

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


  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y: 620 } });

    props.handleBottomSheetClose();
  }

  useEffect(() => {
    if (props.visible) {
      api.start({ from: { y: 620 }, to: { y: 20 } })
    }
  }, [props.visible])

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
      } else if(paymentsConfirmResult.data.product_type === 'subscription') {
        // 사용자 구독 업데이트
      }

      // 에피소드 잠금 해제
      props.handlePaymentComplete();

      // 결제 성공 토스트 발생
      dispatch(
        globalSlice.addToast({
          id: Date.now(),
          message: "결제가 완료되었습니다.",
          duration: 1500,
        })
      );

      handleClose();

      dispatch(userSlice.clearUserState("paymentsConfirmResult"));
    }
  }, [paymentsConfirmResult, paymentsConfirmError, user]);

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



  return (
    <>
      {props.visible && (
        <div className='scrim' onClick={handleClose} />
      )}
      <animated.div
        {...bind()}
        style={{
          ...springs,
          height: 620,
          touchAction: 'none'
        }}
        className='bottom-sheet-wrap'>
        <div className='head'>
          {props.series && (
            <div className='title'>다음 화를 보려면 코인이 필요해요</div>
          )}
        </div>
        <div className='body'>
          <div className='point-list-wrap' style={{ marginTop: 16 }}>
            <div className='item'><div className='label'>보유한 코인</div><span className='point'>{(coins?.paid + coins?.free).toLocaleString()}<img src='/resources/icons/icon_coin_s.png' /></span></div>
            {props.series && <div className='item'><div className='label'>다음 화 필요 코인</div><span className='point'>{props.series?.req_point}<img src='/resources/icons/icon_coin_s.png' /></span></div>}
          </div>
          <div className='product-list-wrap selected'>
            <div className='product-item'>

              <div className='label light'>
                <div className='product-name'>

                  <img src='resources/icons/icon_pass.svg' />
                  주간 패스권
                </div>
              </div>
              <button onClick={() => handlePaymentStart(weeklySubProduct)}>{(weeklySubProduct?.amount).toLocaleString()}<span>원</span></button>
            </div>
          </div>
          <div className='product-list-wrap'>
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
                    <button onClick={() => handlePaymentStart(item)}>{item.amount.toLocaleString()}<span>원</span></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </animated.div>
    </>
  )
}

export default UIBottomSheetProductList;