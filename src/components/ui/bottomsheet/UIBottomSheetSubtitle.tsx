import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from "@use-gesture/react"

interface Props {
  visible: boolean;
  subtitle: string;
  handleBottomSheetClose: () => any;
  handleSubtitleChange: (quality: string) => any;
}

type bottomSheetHandle = {
  handleClose: () => void;
}

const SUBTITLE_OPTION_LIST = [{name: '없음', code: 'none'}, {name: '한국어', code: 'kr'}, {name: 'English', code: 'en'}];

const UIBottomSheetSubtitle = forwardRef<bottomSheetHandle, Props>(({visible, subtitle, handleBottomSheetClose, handleSubtitleChange}: any, ref) => {
  const [springs, api] = useSpring(() => ({
    from: { y: 240 },
    config: { mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 20 ? my : 20) : 20, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 240 });
          handleBottomSheetClose();
        }
      }
    }
  )
  
  const handleClose = () => {
    api.start({ from: { y: 20 }, to: { y : 240 }});

    handleBottomSheetClose();
  }

  useImperativeHandle(ref, () => ({
    handleClose
  }))

  useEffect(() => {
    if(visible) {
      api.start({ from: { y: 240 }, to: { y: 20 } });
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
        height: 240,
        touchAction: 'none'
      }} 
      className="bottom-sheet-wrap">
      <div className='head'>
        <div className='title'>자막</div>
      </div>
      <div className='option-list-wrap'>
        {SUBTITLE_OPTION_LIST.map((item, index) => {
          return (
            <div key={index} className={`option-value-item ${subtitle.code === item.code ? 'selected' : ''}`} onClick={() => handleSubtitleChange(item)}>
             <div>
              <div className='option-value'>
              {subtitle.code === item.code && (
              <img src='resources/icons/icon_check_s.svg'/>
             )}
              {`${item.name}`}
              </div>
              
             </div>
            </div>
          )
        })}
      </div>
    </animated.div>
    </>
  )
});

export default UIBottomSheetSubtitle;