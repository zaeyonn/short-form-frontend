import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const CallbackTossPayment = ({}) => {

  const [searchParams] = useSearchParams();
  const [widgets, setWidgets] = useState<any>(null);
  const [paymentResult, setPaymentResult] = useState<string>();

  const userId = useRef<string | any>();
  const orderId = useRef<string | any>();
  const product = useRef<any>();

  const closeWindow = () => {
    window.close();
  };

    // 결제 요청  
    const handlePaymentRequest = async () => {
        console.log('handlePaymentRequest', orderId.current, product.current);

    widgets.requestPayment({
      orderId: orderId.current,
      orderName: `${product.current.paid_coin} 코인 ${product.current.free_coin ? `+ 보너스 ${product.current.free_coin}` : ''}`,
      successUrl: window.location.href,
      failUrl: window.location.href
    });
  };

  // 결제 시작
  const startPayment = () => {
    (async () => {
      const tossPayments = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);

      // 회원 결제
      // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
      const widgets = tossPayments.widgets({
        customerKey: userId.current
      });

      setWidgets(widgets);
    })();
  };

  // 설정
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount

      await widgets.setAmount({
        currency: "KRW",
        value: Number(product.current.amount)
      });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
        }),
        // ------  이용약관 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderagreement
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT"
        })
      ]);
    }

    renderPaymentWidgets();
  }, [widgets]);

  // 결제 상품 정보 초기화
  const handlePaymentInfo = (e: any) => {
    // products, user_id, order_id 값이 유효한지 체크
    console.log('handlePaymentInfo ', e.data);
    if (
      e.data.hasOwnProperty("product") &&
      e.data.hasOwnProperty("user_id") &&
      e.data.hasOwnProperty("order_id")
    ) {
      userId.current = e.data.user_id;
      orderId.current = e.data.order_id;
      product.current = e.data.product;

      // 결제 위젯 로드
      startPayment();
    }
  };

  useEffect(() => {
    // 결제 요청 성공 결제 정보 저장
    if (searchParams.get("paymentType") && searchParams.get("amount") && searchParams.get("orderId") && searchParams.get("paymentKey")) {
      setPaymentResult("completed");
      window.localStorage.setItem("@tosspayments/payment-result", "completed");
      window.localStorage.setItem("@tosspayments/payment-key", searchParams.get("paymentKey") || "");
      window.localStorage.setItem("@tosspayments/amount", searchParams.get("amount") || "");
      window.localStorage.setItem("@tosspayments/order-id", searchParams.get("orderId") || "");

      if (window.opener) {
        closeWindow();
      }
    }

    // 결제 요청 실패 결제 정보 저장
    if (searchParams.get("code") && searchParams.get("message") && searchParams.get("orderId")) {
      setPaymentResult("failed");
      window.localStorage.setItem("@tosspayments/payment-result", "failed");
      window.localStorage.setItem("@tosspayments/code", searchParams.get("code") || "");
      window.localStorage.setItem("@tosspayments/message", searchParams.get("message") || "");

      if (window.opener) {
        closeWindow();
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // 초기 로드 완료시 이벤트 전송
    if (window.opener) {
      window.opener.postMessage({ message: "onload" }, "*");
    }
    // userId.current = searchParams.get("user_id");
    // orderId.current = searchParams.get("order_id");

    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.paddingTop = '0';
    document.body.style.paddingBottom = '0';

    // 결제 위젯 로드
    startPayment();

    window.addEventListener("message", handlePaymentInfo);

    return () => {
      window.removeEventListener("message", handlePaymentInfo);
    };
  }, []);

  return (
      <div className="payment-popup-wrap">
        <div className="header">
          <div className="title">결제하기</div>
          <div className="right-section">
            <img
              className="close-btn"
              onClick={closeWindow}
              src="/resources/icons/icon_close_b.svg"
            />
          </div>
        </div>
            {!paymentResult && (
              <div className="widget-wrap">
                {/* 결제 위젯 */}
                <div id="payment-method"></div>
                {/* 이용약관 UI */}
                <div id="agreement" />
              </div>
            )}
            {paymentResult === "completed" && (
              <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                결제 완료
              </div>
            )}
            {paymentResult === "failed" && (
              <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                결제 실패
              </div>
            )}
        <button
          className="primary-btn payment-btn"
          onClick={handlePaymentRequest}>
          결제하기
        </button>
      </div>
  );
};

export default CallbackTossPayment;