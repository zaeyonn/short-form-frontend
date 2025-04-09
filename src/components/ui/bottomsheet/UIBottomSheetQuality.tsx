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

const QUALITY_OPTION_LIST = ['Auto', '480p', '720p', '1080p'];

const UIBottomSheetQuality = forwardRef<bottomSheetHandle, Props>(({visible, quality, handleBottomSheetClose, handleQualityChange}: any, ref) => {
  const [springs, api] = useSpring(() => ({
    from: { y: 280 },
    config: { mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 280 });
          handleBottomSheetClose();
        }
      }
    }
  )
  
  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 280 }});

    handleBottomSheetClose();
  }

  useImperativeHandle(ref, () => ({
    handleClose
  }))

  useEffect(() => {
    if(visible) {
      api.start({ from: { y: 280 }, to: { y: 20 } });
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
        height: 280,
        touchAction: 'none'
      }} 
      className="bottom-sheet-wrap">
      <div className='head'>
        <div className='title'>해상도</div>
      </div>
      <div className='option-list-wrap'>
        {QUALITY_OPTION_LIST.map((item, index) => {
          return (
            <div key={index} className={`option-value-item ${quality === item ? 'selected' : ''}`} onClick={() => handleQualityChange(item)}>
             <div>
              <div className='option-value'>
              {quality === item && (
              <img src='resources/icons/icon_check_s.svg'/>
             )}
              {`${item}`}
              </div>
              { item === 'Auto' && (
              <div className={`guide ${quality === item ? 'selected' : ''}`}>
              환경에 따라 최적의 해상도로 제공합니다.
              </div>
              )}
             </div>
            </div>
          )
        })}
      </div>
    </animated.div>
    </>
  )
});

export default UIBottomSheetQuality;