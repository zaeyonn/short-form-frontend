import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { useGesture } from '@use-gesture/react';

import { UserRootState, Series } from 'src/types';

interface Props {
  visible: boolean;
  series?: Series;
  handlePaymentComplete: () => any;
  handleBottomSheetClose: () => any;
}

const UIBottomSheetPayment = (props: Props) => {
  const { user } = useSelector((state: UserRootState) => state.user);  
  const [springs, api] = useSpring(() => ({
        from: { y: 620 },
        config: {mass: 1.1, tension: 270, friction: 25},
    }))

  const bind = useGesture(
        {
          onDrag: ({ down, movement: [_, my]}) => {
            api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
          },
          onDragEnd: ({movement: [_, my]}) => {
            if(my > 20) {
              api.start({ y: 620 });
              props.handleBottomSheetClose();
            }
          }
        })
  
  const handlePaymentStart = () => {
    // dispatch(globalSlice.setPayments({amount}))
    props.handlePaymentComplete();
  }

  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y: 620 }});

    props.handleBottomSheetClose();
  }

  useEffect(() => {
    if(props.visible) {
      api.start({ from: { y: 620 }, to: { y: 20 }})
    }
  }, [props.visible])

  // useEffect(() => {
  //   (async () => {
  //     const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
  //     const widgets = tossPayments.widgets({ customerKey: user.id });

  //     // 결제 금액 설정
  //     widgets.setAmount({
  //       currency: 'KRW',
  //       value: 1000,
  //     })

  //     await widgets.renderPaymentMethods({
  //       selector: '#payment-method'
  //     }) 
  //   }

  //   )()
  // }, [])

  return (
    <>
    { props.visible && (
      <div className='scrim' onClick={handleClose}/>
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
        <div className='point-wrap' style={{marginTop: 16}}>
          <div className='item'><div className='label'>보유한 코인</div><span className='point'>{user?.paid_point + user?.free_point}<img src='/resources/icons/icon_coin_s.svg'/></span></div>
          {props.series && <div className='item'><div className='label'>다음 화 필요 코인</div><span className='point'>{props.series?.req_point}<img src='/resources/icons/icon_coin_s.svg'/></span></div>}
        </div>
        <div className='point-wrap highlight'>
          <div className='item'><div className='label light'><span className='discount-sign'>주간 패스권</span><div className='product-name'>2,000 코인<span className='bonus'> + 2,000</span></div></div><button onClick={() => handlePaymentStart()}>20,000<span>원</span></button></div>
        </div>
        <div className='point-wrap' style={{gap: 27}}>
          <div className='item'><div className='label light'><div className='product-name'>500 코인</div></div><button onClick={() => handlePaymentStart()}>5,800<span>원</span></button></div>
          <div className='divider'/>
          <div className='item'><div className='label light'><div className='product-name'>1,000 코인<span className='bonus'> + 2,000</span></div></div><button onClick={() => handlePaymentStart()}>13,000<span>원</span></button></div>
          <div className='divider'/>
          <div className='item'><div className='label light'><div className='product-name'>3,000 코인<span className='bonus'> + 3,000</span></div></div><button onClick={() => handlePaymentStart()}>33,000<span>원</span></button></div>
          <div className='divider'/>
          <div className='item'><div className='label light'><div className='product-name'>5,000 코인<span className='bonus'> + 4,000</span></div></div><button onClick={() => handlePaymentStart()}>60,000<span>원</span></button></div>
        </div>
      </div>
    </animated.div>
    </>
  )
}

export default UIBottomSheetPayment;