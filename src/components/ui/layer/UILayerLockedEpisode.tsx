import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

interface Props {
  handleLockedClose: () => any;
}

const UILayerLockedEpisode = ({handleLockedClose}: Props) => {
  const [springs, api] = useSpring(() => ({
      from: { y: 600 },
      config: {mass: 1.1, tension: 270, friction: 25},
  }))
  const [visibleBtnList, setVisibleBtnList] = useState(true);

  const bind = useGesture(
      {
        onDrag: ({ down, movement: [_, my]}) => {
          api.start({ y: down ? (my > 0 ? my : 0) : 0, immediate: down })
        },
        onDragEnd: ({movement: [_, my]}) => {
          if(my > 20) {
            api.start({ y: 600 });
            setVisibleBtnList(true);
          }
        }
      }
    )

  const handlePaymentOpen = () => {
    setVisibleBtnList(false);
    api.start({ from: { y: 600 }, to: { y: 0 } });
  }

  const handlePaymentStart = () => {
    
  }

  return (
    <>
    <div className='scrim'/>
    {visibleBtnList && (
    <div className='locked-episode'>
      <button className='payment-btn' onClick={handlePaymentOpen}>
        충전하고 바로보기
      </button>
      <button className='view-ad-btn'>
        광고 보고 다음 화 보기
        <span>오늘 시청 (1/10)</span>
      </button>
      <img onClick={handleLockedClose} src='resources/icons/icon_close_l.svg'/>
    </div>
    )}
    <animated.div
    {...bind()}
    style={{
    ...springs,
    height: 591,
    touchAction: 'none'
    }}
    className='bottom-sheet-wrap'>
    <div className='head'>
      <div className='title'>다음 화를 보려면 포인트가 필요해요</div>
    </div>
    <div className='body'>
      <div className='point-wrap' style={{marginTop: 16}}>
        <div className='item'><div className='label'>보유한 포인트</div><span className='point'>10<img src='resources/icons/icon_point_s.svg'/></span></div>
        <div className='item'><div className='label'>다음 화 필요 포인트</div><span className='point'>20<img src='resources/icons/icon_point_s.svg'/></span></div>
      </div>
      <div className='point-wrap highlight'>
        <div className='item'><div className='label light'><span className='discount-sign'>첫 충전 할인</span><div>2,000 포인트<span className='bonus'> + 2,000</span></div></div><button>20,000<span>원</span></button></div>
      </div>
      <div className='point-wrap' style={{gap: 27}}>
        <div className='item'><div className='label light'><div>500 포인트</div></div><button onClick={handlePaymentStart}>5,800<span>원</span></button></div>
        <div className='divider'/>
        <div className='item'><div className='label light'><div>1,000 포인트<span className='bonus'> + 2,000</span></div></div><button>13,000<span>원</span></button></div>
        <div className='divider'/>
        <div className='item'><div className='label light'><div>3,000 포인트<span className='bonus'> + 3,000</span></div></div><button>33,000<span>원</span></button></div>
        <div className='divider'/>
        <div className='item'><div className='label light'><div>5,000 포인트<span className='bonus'> + 4,000</span></div></div><button>60,000<span>원</span></button></div>
      </div>
    </div>
    </animated.div>
    </>
  )
}

export default UILayerLockedEpisode