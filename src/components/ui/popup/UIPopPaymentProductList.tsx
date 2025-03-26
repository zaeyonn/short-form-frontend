import { useState, useEffect, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useSpring, animated} from '@react-spring/web';

import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';

import { PaymentProduct } from 'src/types';

interface Props {
  setPaymentLoading: (loading: boolean) => any;
  handlePaymentComplete: () => void;
}

const PAYMOUNT_PRODUCT_LIST = [
  {
    id: 1,
    amount: 20000,
    paid_point: 2000,
    free_point: 2000,
  },
  {
    id: 2,
    amount: 5800,
    paid_point: 500,
    free_point: 2000
  },
  {
    id: 3,
    amount: 13800,
    paid_point: 1000,
    free_point: 2000
  },{
    id: 4,
    amount: 49800,
    paid_point: 2000,
    free_point: 2000
  },
  {
    id: 5,
    amount: 99800,
    paid_point: 5000,
    free_point: 2000
  }
]

const UIPopPaymentProductList = (props: Props) => {
  const dispatch = useDispatch();
  const springs = useSpring({
    from: { 
      scale: 0.9,
      y: 0
    },
    to: { 
      scale: 1,
      y: 0
    },

    config: {
      mass: 1,
      tension: 300,
      friction: 18

    }
  });

  const { series, productListResult, productListError } = useSelector((state: any) => state.global);
  const { user, paymentsRegistResult, paymentsRegistError, paymentsConfirmResult, paymentsConfirmError } = useSelector((state: any) => state.user);

  const [selectedProduct, setSelectedProduct] = useState<PaymentProduct>(PAYMOUNT_PRODUCT_LIST[0]);

  const orderIdRef = useRef<any>(null);
  const paymentWindowRef = useRef<any>(null);

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));

    if (paymentWindowRef.current) {
      paymentWindowRef.current.close();
    }
  }

  const handlePaymentStart = () => {
    dispatch(userSlice.paymentsRegist({         
      userId: user.id,
      productId: selectedProduct.id,
      amount: selectedProduct.amount,
      paidPoint: selectedProduct.paid_point,
      freePoint: selectedProduct.free_point, 
    }))
  }

   // 결제창 로드
   const handlePaymentLoad = (e: any) => {
    if (e.data.message === "onload") {
      e.source.postMessage({ product: selectedProduct, user_id: user.id, order_id: orderIdRef.current }, "*");
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
      if (Number(requestAmount) !== Number(selectedProduct.amount) || requestOrderId !== orderIdRef.current) {
        props.setPaymentLoading(false);
        console.log('결제 정보 불일치');
        return;
      }

      dispatch(userSlice.paymentsConfirm({ userId: user.id, orderId: orderIdRef.current, amount: selectedProduct.amount, paymentKey }));
    }

    // 결제 요청 실패
    if (paymentResult === "failed" && code && message) {
      props.setPaymentLoading(false);
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


  const handleProductSelect = (product: PaymentProduct) => {
    setSelectedProduct(product);
  }

  useEffect(() => {
    if(productListError) {
      console.log('productListError ', productListError);
    }

  }, [productListResult, productListError])

  useEffect(() => {
    if (paymentsConfirmError) {
      console.log("paymentsConfirmError ", paymentsConfirmError);
      dispatch(userSlice.clearUserState("paymentsConfirmError"));
      props.setPaymentLoading(false);

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
      props.setPaymentLoading(false);

      // 사용자 포인트 업데이트
      dispatch(userSlice.setUser({ ...user, paid_point: paymentsConfirmResult.paid_point, free_point: paymentsConfirmResult.free_point }));

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
  }, [paymentsConfirmResult, paymentsConfirmError]);

  useEffect(() => {
    if (paymentsRegistError) {
      console.log("paymentsRegistError ", paymentsRegistError);
      dispatch(userSlice.clearUserState("paymentsRegistError"));
      return;
    }

    if (paymentsRegistResult && paymentsRegistResult.status === 201) {
      console.log("paymentsRegistResult ", paymentsRegistResult);

      props.setPaymentLoading(true);

      // Use MutableRefObject type to allow assignment
      orderIdRef.current = paymentsRegistResult.data.order_id;

      setTimeout(() => {
        paymentWindowRef.current = window.open(window.location.origin + "/callback/tosspayment", "toss-payment-widget", "height=580,width=480");
        
        // 결제 팝업창 닫힌 경우 이벤트 등록
        if (paymentWindowRef.current) {
          paymentWindowRef.current.addEventListener('unload', () => {
            
            // 팝업창이 닫혔는지 확인
            setTimeout(() => {
              if (paymentWindowRef.current?.closed) {
                props.setPaymentLoading(false);
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
  }, [selectedProduct, orderIdRef.current]);

  return (
    <div className='popup-layer'>
      <animated.div
      style={{
        ...springs,
        width: 530,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: springs.scale.to(s => 
          `translate(-50%, -50%) scale(${s}) translateY(${springs.y.get()}px)`
        ),
      }}
      className='popup-wrap payment-product-list'>    
        <img className='close-btn' src='/resources/icons/icon_close.svg' alt='닫기' onClick={handleClose}/>
        <div className='popup-body' style={{gap: 10}}>
          <div className='title'>
            다음화를 볼려면 포인트가 필요해요.
          </div>
          <div className='point-wrap' style={{marginTop: 20, cursor: 'default'}}>
            <div className='item'><div className='label'>보유한 포인트</div><span className='point'>{user?.paid_point + user?.free_point}<img src='/resources/icons/icon_point_s.svg'/></span></div>
            {series && <div className='item'><div className='label'>다음 화 필요 포인트</div><span className='point'>{series?.req_point}<img src='/resources/icons/icon_point_s.svg'/></span></div>}
          </div>
          <div className={`point-wrap ${selectedProduct.id === 1 ? 'selected' : ''}`} onClick={() => handleProductSelect(PAYMOUNT_PRODUCT_LIST[0])}>
            <div className='item'><div className='label light'><span className='discount-sign'>첫 충전 할인</span><div>{`${(PAYMOUNT_PRODUCT_LIST[0].paid_point).toLocaleString()} 포인트`}<span className='bonus'>{` + ${PAYMOUNT_PRODUCT_LIST[0].free_point.toLocaleString()}`}</span></div></div><button>{`${(PAYMOUNT_PRODUCT_LIST[0].amount).toLocaleString()}원`}<span></span></button></div>
          </div>
          <div className='product-grid-wrap'>
          { PAYMOUNT_PRODUCT_LIST.map((product, index) => {
            if(index >= 1) {
              return (
                <div key={index} className={`product-item ${selectedProduct.id === product.id ? 'selected' : ''}`} onClick={() => handleProductSelect(product)}>
                  <div className='paid-point'>
                  {product.paid_point.toLocaleString()} 포인트
                  </div>
                <div className='bonus-point'>
                   +{product.free_point.toLocaleString()} 포인트
                </div>
                  <div className='price'>
                  {product.amount.toLocaleString()} 원
                </div>
                </div>
              )}
          })}
          </div>
          <div className='primary-btn' style={{marginTop: 7}} onClick={() => handlePaymentStart()}>
            충전하기
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default UIPopPaymentProductList;