import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from "@use-gesture/react"

interface Props {
  visible: boolean;
  handleBottomSheetClose: () => any;
  handleQualityOpen: () => any;
  handleSpeedOpen: () => any;
}

type bottomSheetHandle = {
  handleClose: () => void;
}

const UIBottomSheetVideoOption = forwardRef<bottomSheetHandle, Props>(({visible, handleBottomSheetClose, handleQualityOpen, handleSpeedOpen}: any, ref) => {
  const [springs, api] = useSpring(() => ({
    from: { y: 200 },
    config: { mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 200 });
          handleBottomSheetClose();
        }
      }
    }
  )
  
  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 200 }});

    handleBottomSheetClose();
  }

  useImperativeHandle(ref, () => ({
    handleClose
  }))

  useEffect(() => {
    if(visible) {
      api.start({ from: { y: 200 }, to: { y: 20 } });
    } 
  }, [visible])


  return (
    <>
    { visible && (
      <div className='scrim' onClick={handleClose}/>
    )}
    <animated.div
    {...bind()}
      style={{
        ...springs,
        height: 220,
        touchAction: 'none'
      }} 
      className="bottom-sheet-wrap">
      <div className='head'>
        <div className='title'>옵션 설정</div>
      </div>
      <div className='option-list-wrap'>
        <div className='option-item' onClick={handleQualityOpen}>
          해상도
          <img src='resources/icons/icon_arrow_right_s.svg'/>
        </div>
        <div className='option-item' onClick={handleSpeedOpen}>
          재생속도
          <img src='resources/icons/icon_arrow_right_s.svg'/>
        </div>
      </div>
    </animated.div>
    </>
  )
});

export default UIBottomSheetVideoOption;