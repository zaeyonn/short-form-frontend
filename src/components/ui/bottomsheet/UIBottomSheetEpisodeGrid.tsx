import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

import { Series } from 'src/types';
import * as globalSlice from 'src/redux/globalSlice';
import UIEpisodeNumGrid from '../UIEpisodeNumGrid';

interface Props {
  series: Series;
  locked: boolean;
  setLocked: (locked: boolean) => any;
  currentEp: any;
  visibleBottomSheet: boolean;
  handleBottomSheetClose: () => any;
  handleEpisodeChange: (num: number) => any;
  handleEpisodeLock: (index: number) => any;
  unlockEpisode: number | undefined,
}

const UIBottomSheetEpisodeGrid = ({series, setLocked, currentEp, visibleBottomSheet, handleBottomSheetClose, handleEpisodeChange, unlockEpisode}: Props) => {
  const dispatch = useDispatch();
  const [springs, api] = useSpring(() => ({
    from: { y: 470 },
    config: {mass: 0.6, tension: 270, friction: 25},
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [_, my]}) => {
        api.start({ y: down ? (my > 0 ? my : 0) : 0, immediate: down })
      },
      onDragEnd: ({movement: [_, my]}) => {
        if(my > 20) {
          api.start({ y: 470 });
          handleBottomSheetClose();
        }
      }
    }
  )

  const handleEpisodeClick = (index: number) => {
    if(unlockEpisode && index <= unlockEpisode) { 
      handleEpisodeChange(index + 1);
      closeBottomSheet();
    }

    if(index === unlockEpisode) {
      setLocked(true);
      closeBottomSheet();
    }

    if(unlockEpisode && index > unlockEpisode) {
      dispatch(globalSlice.addToast({ id: Date.now(), message: '앞에 놓친 에피소드가 있어요.', duration: 1500  }));
    }
  }
  
  const closeBottomSheet = () => {
    api.start({ from: {y: 0}, to: {y: 470}});
  }


  useEffect(() => {
    if(visibleBottomSheet) {
      api.start({ from: { y: 470 }, to: { y: 0 } });
    }
  }, [visibleBottomSheet])

  return (
    <>
    { visibleBottomSheet && (
      <div className='scrim' onClick={() => { handleBottomSheetClose(); closeBottomSheet(); }}/>
    )}
    <animated.div
    {...bind()}
    style={{
      ...springs,
      touchAction: 'none'
    }}
    className='bottom-sheet-wrap'>
      <div className='head'>
        <div className='title'>{series?.title + ` [${currentEp?.episode_num}회]`}</div>
        <div className='tag-list'>
          { series?.keyword?.map((i: any, idx: number) => <span className='tag type_c' key={idx}>{i}</span>)}
          <span className='tag type_b'>{`총 ${series?.ep_count}회`}</span>
        </div>
      </div>
      <UIEpisodeNumGrid
        series={series}
        currentEp={currentEp}
        unlockEpisode={unlockEpisode}
        handleEpisodeClick={handleEpisodeClick}/>
    </animated.div>
    </>
  )
}

export default React.memo(UIBottomSheetEpisodeGrid);