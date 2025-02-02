import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Series } from 'src/types';

interface Props {
  seriesList: Series [];
}

const UIDesktopMainContentSlider = (props: Props) => {
  const navigate = useNavigate();

  const listRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);
  const mouseDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);
  const scrollDistanceRef = useRef<number>(0);
  const itemPositionRef = useRef<number>(0);

  const ITEM_WIDTH = 780 + 20;
  
  // 현재 표시되는 아이템들의 배열을 3배로 확장
  const extendedList = [...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList, ...props.seriesList];

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    mouseDownRef.current = true;
    draggingRef.current = false;
    
    if(listRef.current) {
      startXRef.current = e.pageX - listRef.current.offsetLeft;
      startScrollRef.current = listRef.current.scrollLeft;
    }
  }

  // const handleScroll = () => {
  //   if (listRef.current) {
  //     const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
  //     const oneThirdWidth = scrollWidth / 7;

      
  //     // 중간 지점을 넘어갔을 때 처음으로 순간 이동
  //     // if (scrollLeft >= oneThirdWidth * 2) {
  //     //   listRef.current.style.scrollBehavior = 'auto';
  //     //   listRef.current.scrollLeft = scrollLeft - oneThirdWidth + 120;
  //     // }
  //     // // 왼쪽 끝으로 갔을 때 중간으로 순간 이동
  //     // else if (scrollLeft <= 0) {
  //     //   listRef.current.style.scrollBehavior = 'auto';
  //     //   listRef.current.scrollLeft = oneThirdWidth;
  //     // }
  //   }
  // };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if(!mouseDownRef.current) return;
    draggingRef.current = true;

    if(listRef.current) {
      const x = e.pageX - listRef.current.offsetLeft;
      scrollDistanceRef.current = (x - startXRef.current) * 1.1;
      listRef.current.scrollLeft = startScrollRef.current - scrollDistanceRef.current;
    }
  }

  const handleMouseUp = () => {
    if(draggingRef.current && listRef.current) {
      const currentScroll = listRef.current.scrollLeft;
      itemPositionRef.current = scrollDistanceRef.current < 0 ? Math.floor(currentScroll / ITEM_WIDTH) + 1 : Math.floor(currentScroll / ITEM_WIDTH);

      listRef.current.style.scrollBehavior = 'smooth';
      listRef.current.scrollLeft = itemPositionRef.current * ITEM_WIDTH;
    }

    // 애니메이션 후 스크롤 동작 원래대로 복구
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.style.scrollBehavior = 'auto';
        // handleScroll(); // 무한 스크롤 위치 체크
      }
    }, 300);

    draggingRef.current = false;
    mouseDownRef.current = false;
  }

  const handleSeriesMouseUp = (item: Series) => {
    

    if(!draggingRef.current) {
      navigate(`/series/${item.id}`);
    }
  }

  const handleMouseLeave = () => {
    draggingRef.current = false;
    mouseDownRef.current = false;
  }

  const handleSlidePrev = () => {
    if(!listRef.current) return;

    const currentScroll = listRef.current.scrollLeft;
    itemPositionRef.current = Math.floor(currentScroll / ITEM_WIDTH) - 1;

    listRef.current.style.scrollBehavior = 'smooth';
    listRef.current.scrollLeft = itemPositionRef.current * ITEM_WIDTH;

    // 애니메이션 후 스크롤 동작 원래대로 복구
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.style.scrollBehavior = 'auto';
        // handleScroll(); // 무한 스크롤 위치 체크
      }
    }, 300);
  }

  const handleSlideNext = () => {
    if(!listRef.current) return;

    const currentScroll = listRef.current.scrollLeft;
    itemPositionRef.current = Math.floor(currentScroll / ITEM_WIDTH) + 1;

    listRef.current.style.scrollBehavior = 'smooth';
    listRef.current.scrollLeft = itemPositionRef.current * ITEM_WIDTH;

    // 애니메이션 후 스크롤 동작 원래대로 복구
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.style.scrollBehavior = 'auto';
        // handleScroll(); // 무한 스크롤 위치 체크
      }
    }, 300);
  }

  // 컴포넌트 마운트 시 중간 섹션으로 스크롤
  React.useEffect(() => {
    if (listRef.current) {
      const oneThirdWidth = listRef.current.scrollWidth / 7;
      listRef.current.scrollLeft = oneThirdWidth;
    }
  }, [props.seriesList]);

  return (
    <div className='main-content-slider-wrap'>
    <div className='floating-btn-wrap'>
      <button className='prev-btn' onClick={handleSlidePrev}>
        <img src='resources/icons/icon_arrow_left_s.svg'/>  
      </button> 
      <button className='next-btn' onClick={handleSlideNext}>
        <img src='resources/icons/icon_arrow_right_s.svg'/>  
      </button>
    </div>  
    <div 
      ref={listRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className='main-content-slider-list'> 
      { extendedList.map((item: Series, index: number) => {
        return (
          <div className='main-content-item' key={`${item.id}-${index}`} onMouseUp={() => handleSeriesMouseUp(item)}>
            <div className='img-wrap'>
              <img draggable={false} src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
              <div className='text-wrap'>
                <div className='main-text'>{item.title}</div>
                <div className='sub-text'>{item.description}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div> 
   </div>
  )
}

export default UIDesktopMainContentSlider;