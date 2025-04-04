import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from "@use-gesture/react"

interface Props {
  visible: boolean;
  speed: number;
  handleBottomSheetClose: () => any;
  handleSpeedChange: (speed: number) => any;
}

type bottomSheetHandle = {
  handleClose: () => void;
}

const SPEED_OPTION_LIST = [0.15, 0.75, 1.0, 1.25, 1.5, 2];

const UIBottomSheetSpeed = forwardRef<bottomSheetHandle, Props>(({visible, handleBottomSheetClose, speed, handleSpeedChange}: any, ref) => {
  
  const [springs, api] = useSpring(() => ({
    from: { y: 340 },
    config: { mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 340 });
          handleBottomSheetClose();
        }
      }
    }
  )
  
  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 340 }});

    handleBottomSheetClose();
  }

  useImperativeHandle(ref, () => ({
    handleClose
  }))

  useEffect(() => {
    if(visible) {
      api.start({ from: { y: 340 }, to: { y: 20 } });
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
        height: 340,
        touchAction: 'none'
      }} 
      className="bottom-sheet-wrap">
      <div className='head'>
        <div className='title'>재생 속도</div>
      </div>
      <div className='option-list-wrap'>
        {SPEED_OPTION_LIST.map((item, index) => {
          return (
            <div key={index} className={`option-value-item ${speed === item ? 'selected' : ''}`} onClick={() => handleSpeedChange(item)}>
             {speed === item && (
              <img src='resources/icons/icon_check_s.svg'/>
             )}
             {`${item}x`}
            </div>
          )
        })}
      </div>
    </animated.div>
    </>
  )
});

export default UIBottomSheetSpeed;