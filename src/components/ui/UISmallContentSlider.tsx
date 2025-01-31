import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Series } from 'src/types';


interface Props {
  seriesList: any[];
  headerTitle?: string;
  highlight: string;
  handleSeriesListOpen?: (title: string, seriesList: any[]) => any;
}

const UISmallContentSlider = ({seriesList, headerTitle, highlight, handleSeriesListOpen}: Props) => {
  const navigate = useNavigate();
  //const [dragging, setDragging] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);
  
  const draggingRef = useRef<boolean>(false);
  const mouseDownRef = useRef<boolean>(false);
  
  const startXRef = useRef<number>(0);
  const startScrollRef = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    mouseDownRef.current = true;
    draggingRef.current = false;

    if(listRef.current) {
      // 사용자의 드래그 시작 지점의 리스트 요소 내부의 x좌표 계산
      startXRef.current = e.pageX - listRef.current.offsetLeft;
    
      // 드래그 시작 시점의 드래그 거리 계산
      startScrollRef.current = listRef.current.scrollLeft;
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
   if(!mouseDownRef.current) return;

   draggingRef.current = true;
    
   if(listRef.current) {
    // 드래그중 사용자 마우스 x좌표
    const x = e.pageX - listRef.current.offsetLeft;

    // 사용자가 드래그한 거리 계산
    const dragDistance = (x - startXRef.current) * 1.2;
    
    // 리스트 요소의 스크롤 위치 업데이트
    listRef.current.scrollLeft = startScrollRef.current - dragDistance
   }
  }

  const handleListMouseUp = () => {
    draggingRef.current = false;
    mouseDownRef.current = false;
  }

  const handleMouseLeave = () => {
    draggingRef.current = false;
    mouseDownRef.current = false;
  }

  const handleItemMouseUp = (item: Series) => {
      if(!draggingRef.current) {
        navigate(`/series/${item.id}`);
      }
  }


  return (
    <div className='small-content-slider-wrap'>
      { headerTitle && (
        <span className='list-header' onClick={() => handleSeriesListOpen ? handleSeriesListOpen(headerTitle, seriesList) : ''}>
          { headerTitle }
          <img src='resources/icons/icon_arrow_right_s.svg' alt='icon-arrow-right'/>
        </span>
      )}
      <div
        ref={listRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleListMouseUp}
        className='small-content-list'>
        { seriesList.map((item: Series, index: number) => {
          return (
            <div key={index} draggable={false} className='small-content-item' onMouseUp={() => handleItemMouseUp(item)}>  
              <div className='poster-wrap'>
              { highlight && (
                <span className='highlight'>{highlight}</span>
              )}
              <div className='tag-list'>
              { item.keyword?.map((i: string, idx: number) => <span className='tag' key={idx}>{i}</span>) }
              </div>
                <img draggable={false} className='poster-img' src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
              </div>
              <div className='series-title'>{item.title}</div>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default UISmallContentSlider;