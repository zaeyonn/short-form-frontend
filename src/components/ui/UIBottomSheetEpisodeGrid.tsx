import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

interface Props {
  locked: boolean;
  setLocked: (locked: boolean) => any;
  currentEp: any;
  visibleBottomSheet: boolean;
  handleBottomSheetClose: () => any;
  handleEpisodeChange: (num: number) => any;
  handleEpisodeLock: (index: number) => any;
}

const SECTION_RANGE = 30;

const UIBottomSheetEpisodeGrid = ({locked, setLocked, currentEp, visibleBottomSheet, handleBottomSheetClose, handleEpisodeChange, handleEpisodeLock}: Props) => {
  const [springs, api] = useSpring(() => ({
    from: { y: 470 },
    config: {mass: 1.1, tension: 270, friction: 25},
  }))

  const { selectedSeries } = useSelector((state: any) => state.global);
  const [section, setSection] = useState(Math.ceil(currentEp?.episode_num / SECTION_RANGE));

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
    if(index <= selectedSeries.free_count) { 
      handleEpisodeChange(index);
      closeBottomSheet();
    }

    if(index === selectedSeries.free_count) {
      setLocked(true);
      closeBottomSheet();
    }
  }

  const handleSectionChange = (index: any) => {
    setSection(index + 1);
  }
  
  const closeBottomSheet = () => {
    api.start({ from: {y: 0}, to: {y: 470}});
  }


  const renderEpisodeSection = () => {
    console.log('renderEpisodeSection ', section);
    const sectionList = [];

    for (let i = 0; i < Math.ceil(selectedSeries.ep_count / SECTION_RANGE); i++) {
      sectionList.push(
        <div key={i}>
          <span className={`${section - 1 == i ? 'selected' : ''}`} onClick={() => handleSectionChange(i)}>
            {`${1 + (i * SECTION_RANGE)}-${selectedSeries.ep_count < ((i+1) * SECTION_RANGE) ? selectedSeries.ep_count : ((i+1) * SECTION_RANGE)}`}
          </span>
          {i < Math.ceil(selectedSeries.ep_count / SECTION_RANGE) - 1 && <span className='separator'>|</span>}
        </div>
      )
    }

    return sectionList;
  }

  const renderEpisodeGrid = () => {
    const gridList = [];

    for (let i = (section - 1) * SECTION_RANGE; i < section * SECTION_RANGE; i++) {
     
      gridList.push(<div key={i} className='container' onClick={() =>{ handleEpisodeClick(i) }}><div className={`box ${currentEp?.episode_num === i+1 ? 'selected' : ''} ${i + 1 <= selectedSeries.free_count ? '' : 'locked'}`}>{i+1}</div></div>)
    
      if(i + 1 === selectedSeries.ep_count) {
        break;
      }
    }

    return gridList
  }

  useEffect(() => {
    if(visibleBottomSheet) {
      api.start({ from: { y: 470 }, to: { y: 0 } });
    }
  }, [visibleBottomSheet])

  useEffect(() => {
    if(currentEp?.episode_num) {
      setSection(Math.ceil(currentEp?.episode_num / SECTION_RANGE))
    }
  }, [currentEp])

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
        <div className='title'>{currentEp?.title + ` [${currentEp?.episode_num}회]`}</div>
        <div className='tag-list'>
          { selectedSeries.keyword.map((i: any, idx: number) => <span className='tag type_c' key={idx}>{i}</span>)}
          <span className='tag type_b'>{`총 ${selectedSeries.ep_count}회`}</span>
        </div>
      </div>
      <div className='episode-grid'>
        <div className='section'>
          {renderEpisodeSection()}
        </div>
        <div className='grid-wrap'>
          {renderEpisodeGrid()}
        </div>
      </div>
    </animated.div>
    </>
  )
}

export default React.memo(UIBottomSheetEpisodeGrid);