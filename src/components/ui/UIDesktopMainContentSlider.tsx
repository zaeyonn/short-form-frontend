import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Series } from 'src/types';
import * as globalSlice from 'src/redux/globalSlice';

interface Props {
  seriesList: Series [];
}

const UIDesktopMainContentSlider = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);
  const mouseDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    mouseDownRef.current = true;
    draggingRef.current = false;
    
    if(listRef.current) {
      startXRef.current = e.pageX - listRef.current.offsetLeft;
      startScrollRef.current = listRef.current.scrollLeft;
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if(!mouseDownRef.current) return;
    draggingRef.current = true;

    if(listRef.current) {
      const x = e.pageX - listRef.current.offsetLeft;
      const scrollDistance = (x - startXRef.current) * 1.1;
      listRef.current.scrollLeft = startScrollRef.current - scrollDistance;
    }
  }

  const handleMouseUp = () => {
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

  return (
    <div className='main-content-slider-wrap'>
    <div className='floating-btn-wrap'>
      <button className='prev-btn'>
        <img src='resources/icons/icon_arrow_left_s.svg'/>  
      </button> 
      <button className='next-btn'>
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
      { props.seriesList.map((item: any, index: number) => {
        return (
          <div className='main-content-item' key={index} onMouseUp={() => handleSeriesMouseUp(item)}>
            <img draggable={false} src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
          </div>
        )
      })}
    </div> 
   </div>
  )
}

export default UIDesktopMainContentSlider;