import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useSpring, animated} from '@react-spring/web';

import * as globalSlice from 'src/redux/globalSlice';

interface Props {
  handlePaymentComplete: () => void;
}

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




  const { series } = useSelector((state: any) => state.global);
  const { user } = useSelector((state: any) => state.user);


  const [selectedProduct, setSelectedProduct] = useState<number>(0);

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  const handlePaymentStart = () => {
    // dispatch(globalSlice.setPayments({amount}));
    handleClose();
    props.handlePaymentComplete();
  }

  const handleProductSelect = (index: number) => {
    setSelectedProduct(index);
  }

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
    className='popup-wrap payment'>    

      <img className='close-btn' src='/resources/icons/icon_close.svg' alt='닫기' onClick={handleClose}/>

      <div className='popup-body' style={{gap: 10}}>
        <div className='title'>
          다음화를 볼려면 포인트가 필요해요.
        </div>
        <div className='point-wrap' style={{marginTop: 20, cursor: 'default'}}>
          <div className='item'><div className='label'>보유한 포인트</div><span className='point'>{user?.paid_point + user?.free_point}<img src='/resources/icons/icon_point_s.svg'/></span></div>
          {series && <div className='item'><div className='label'>다음 화 필요 포인트</div><span className='point'>{series?.req_point}<img src='/resources/icons/icon_point_s.svg'/></span></div>}
        </div>
        <div className={`point-wrap ${selectedProduct === 0 ? 'selected' : ''}`} onClick={() => handleProductSelect(0)}>
          <div className='item'><div className='label light'><span className='discount-sign'>첫 충전 할인</span><div>2,000 포인트<span className='bonus'> + 2,000</span></div></div><button>20,000<span>원</span></button></div>
        </div>
        <div className='product-grid-wrap'>
          <div className={`product-item ${selectedProduct === 1 ? 'selected' : ''}`} onClick={() => handleProductSelect(1)}>
            <div className='paid-point'>
              500 포인트
            </div>
            <div className='bonus-point'>
              +2,000 포인트
            </div>
            <div className='price'>
              5,800 원
            </div>
          </div>
          <div className={`product-item ${selectedProduct === 2 ? 'selected' : ''}`} onClick={() => handleProductSelect(2)}>
            <div className='paid-point'>
              1,000 포인트
            </div>
            <div className='bonus-point'>
              +2,000 포인트
            </div>
            <div className='price'>
              13,800 원
            </div>
          </div>
          <div className={`product-item ${selectedProduct === 3 ? 'selected' : ''}`} onClick={() => handleProductSelect(3)}>
            <div className='paid-point'>
              3000 포인트
            </div>
            <div className='bonus-point'>
              +2,000 포인트
            </div>
            <div className='price'>
              58,000 원
            </div>
          </div>
          <div className={`product-item ${selectedProduct === 4 ? 'selected' : ''}`} onClick={() => handleProductSelect(4)}>
            <div className='paid-point'>
              5,000 포인트
            </div>
            <div className='bonus-point'>
              +2,000 포인트
            </div>
            <div className='price'>
              99,800 원
            </div>
          </div>
        </div>
        <div className='primary-btn' onClick={() => handlePaymentStart()}>
          충전하기
        </div>
      </div>
    </animated.div>
    </div>
  )
}

export default UIPopPaymentProductList;