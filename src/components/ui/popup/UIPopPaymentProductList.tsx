import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useSpring, animated} from '@react-spring/web';

import * as globalSlice from 'src/redux/globalSlice';

import { PaymentProduct } from 'src/types';

interface Props {
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

  const { series } = useSelector((state: any) => state.global);
  const { user } = useSelector((state: any) => state.user);

  const [selectedProduct, setSelectedProduct] = useState<PaymentProduct>(PAYMOUNT_PRODUCT_LIST[0]);

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  const handlePaymentStart = () => {
    dispatch(globalSlice.setPayments(selectedProduct));
    handleClose();
    props.handlePaymentComplete();
  }

  const handleProductSelect = (product: PaymentProduct) => {
    setSelectedProduct(product);
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