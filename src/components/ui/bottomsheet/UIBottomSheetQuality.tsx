import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from "@use-gesture/react"

interface Props {
  visible: boolean;
  quality: string;
  handleBottomSheetClose: () => any;
  handleQualityChange: (quality: string) => any;
}

type bottomSheetHandle = {
  handleClose: () => void;
}

const UIBottomSheetQuality = forwardRef<bottomSheetHandle, Props>(({visible, handleBottomSheetClose}: any, ref) => {
  const [springs, api] = useSpring(() => ({
    from: { y: 325 },
    config: { mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 325 });
          handleBottomSheetClose();
        }
      }
    }
  )
  
  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 325 }});

    handleBottomSheetClose();
  }

  useImperativeHandle(ref, () => ({
    handleClose
  }))

  useEffect(() => {
    if(visible) {
      api.start({ from: { y: 325 }, to: { y: 20 } });
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
        height: 345,
        touchAction: 'none'
      }} 
      className="bottom-sheet-wrap">
      <div className='head'>
        <div className='title'>해상도</div>
      </div>
      <div className='option-list-wrap'>
        <div className='option-value-item'>
          Auto
        </div>
        <div className='option-value-item'>
          540p
        </div>
        <div className='option-value-item'>
          720p
        </div>
        <div className='option-value-item'>
          1080p
        </div>
      </div>
    </animated.div>
    </>
  )
});

export default UIBottomSheetQuality;