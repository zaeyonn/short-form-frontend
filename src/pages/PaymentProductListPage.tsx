import { useNavigate } from 'react-router-dom';

const PaymentProductListPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {

    navigate(-1);
  }

  const handlePaymentStart = () => {
    console.log('handlePaymentStart');
  }

  return (
    <div className='page-wrap'>

      <div className='header'>
        <div className='left-section'>
          <img src={`/resources/icons/icon_arrow_left_m.svg`} onClick={() => handleClose()}/>
        </div>
        <div className='title'>
          충전하기
        </div>
        <div className='right-section'>
          <span className='empty'/>
        </div>
      </div>
      <div className='page-body'>
        <div className='title-18'>
          코인 충전
        </div>
        <div className='point-wrap highlight' style={{marginTop: 16}}>
          <div className='item'><div className='label light'><span className='discount-sign'>첫 충전 할인</span><div>2,000 코인<span className='bonus'> + 2,000</span></div></div><button onClick={() => handlePaymentStart()}>20,000<span>원</span></button></div>
        </div>
        <div className='point-wrap' style={{gap: 27, marginTop: 12}}>
          <div className='item'><div className='label light'><div>500 코인</div></div><button onClick={() => handlePaymentStart()}>5,800<span>원</span></button></div>
          <div className='divider'/>
          <div className='item'><div className='label light'><div>1,000 코인<span className='bonus'> + 2,000</span></div></div><button onClick={() => handlePaymentStart()}>13,000<span>원</span></button></div>
          <div className='divider'/>
          <div className='item'><div className='label light'><div>3,000 코인<span className='bonus'> + 3,000</span></div></div><button onClick={() => handlePaymentStart()}>33,000<span>원</span></button></div>
          <div className='divider'/>
          <div className='item'><div className='label light'><div>5,000 코인<span className='bonus'> + 4,000</span></div></div><button onClick={() => handlePaymentStart()}>60,000<span>원</span></button></div>
        </div>
        <div className='provision'>
          {`1. 릴숏츠 안에는 무료 및 유료 콘텐츠가 있습니다.
            2. 유료 콘텐츠는 코인로 잠금해제 또는 회원 구독으로 시청할 수 있으며, 회원 전용 콘텐츠는 회원 구독으로만 시청이 가능합니다.
            3. 유로 코인과 보상 동전의 유효 기간은 모두 무기한입니다.
            4. 유료 코인은 회차 잠금 해제 시 우선적으로 사용되며, 금액이 부족할때 자동으로 보상 동전이 사용됩니다.
            5. 구독 기간 동안 앱 내의 모든 콘텐츠를 제한 없이 시청하실 수 있습니다.
          `}
        </div>
      </div>
    </div>

  )
}

export default PaymentProductListPage;
