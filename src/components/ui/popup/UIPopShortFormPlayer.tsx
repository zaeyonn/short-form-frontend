import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import * as globalSlice from 'src/redux/globalSlice';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {

}

const UIPopShortFormPlayer = ({}: Props) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [visibleTools, setVisibleTools] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleClose = () => {
    const navBar = {
      visible: true,
      title: 'Logo',
      leftBtn: {
        icon: 'icon_hamburger.svg',
      },
      rightBtn: {
        icon: 'icon_search.svg',
        event: () => 0,
      },
      loginBtn: true
    }
    dispatch(globalSlice.setDisplayPopName(''));
    dispatch(globalSlice.setNavigationBar(navBar));
  }


  // 도구 토글
  const toggleTools = () => {
    setVisibleTools(!visibleTools);
  }

  // 재생 / 일시정지 토글
  const togglePlay = () => {
    if(videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else if((videoRef.current && !videoRef.current.paused)) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  // 재생 시간 업데이트
  const handleTimeUpdate = () => {
    if(videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      setProgress((currentTime / duration) * 100);
    }
  }

  // 재생바 드래그로 위치 변경
  const handleProgressChange = (e: any) => {
    const newProgess = e.target.value;

    if(videoRef.current) {
      const duration = videoRef.current.duration;
      videoRef.current.currentTime = (newProgess / 100) * duration;
      setProgress(newProgess);
    }
  }

  // 마우스가 눌렸을 때 상태 변경
  const handleMouseDown = () => {
    console.log('마우스 누름')
    setIsMouseDown(true);
  };

  // 마우스가 떼어졌을 때 상태 변경
  const handleMouseUp = (e) => {
    // setIsMouseDown(false);
    console.log('마우스 버튼이 떼졌습니다!');

    let scrollTop = e.target.scrollTop;
    const documentHeight = e.target.innerHeight;

    if(scrollTop > 100) {
      containerRef.current.scrollTo({
        top: documentHeight,
        behavior: "smooth"
      })
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    let scrollTop = e.target.scrollTop;
    const documentHeight = e.target.innerHeight;
    console.log("scroll ", isMouseDown); 
    const container = containerRef.current;
    if(scrollTop && !isMouseDown) {
      setIsMouseDown(true);
    }

    if (isMouseDown) {
      console.log('스크롤 중, 마우스 버튼이 눌린 상태!');
    }
  };
  
  const handleScrollCapture = (e) => {
    let scrollTop = e.target.scrollTop;
    const documentHeight = e.target.innerHeight;
    console.log('scrollLocation', scrollTop);

    if(scrollTop > 100) {
      containerRef.current.scrollTo({
        top: documentHeight,
        behavior: "smooth"
      })
    }
  }


  useEffect(() => {
    const navBar = {
      visible: false
    }

    window.addEventListener('mouseup', handleMouseUp);

    dispatch(globalSlice.setNavigationBar(navBar));

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [])

  useEffect(() => {
    containerRef.current?.addEventListener('scroll', handleScroll);
  }, [isMouseDown])

  return (
    <div className='popup-wrap'>
      <div ref={containerRef} className='short-form-slider'  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <video ref={videoRef} autoPlay={true} className="short-form-video" onTimeUpdate={handleTimeUpdate} onClick={toggleTools}>
          <source src='resources/videos/short_form_1.mp4'/>
        </video>
        <video ref={videoRef} autoPlay={false} className="short-form-video" onTimeUpdate={handleTimeUpdate} onClick={toggleTools}>
          <source src='resources/videos/short_form_1.mp4'/>
        </video>
      </div>
      {visibleTools && (
        <div>
          <div className='header'>
            <div className="left-section">
              <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
              <span className="title">{'김비서가 왜 그럴까 [10회]'}</span>
            </div>
            <div className='right-section'>
              <img src={`resources/icons/icon_kebab.svg`} onClick={() => 0}/>
            </div>
          </div>
          { playing && (<img className='main-play-btn' src="resources/icons/icon_pause_main.svg" onClick={togglePlay}/>) }
          { !playing && (<img className='main-play-btn' src="resources/icons/icon_play_main.svg" onClick={togglePlay}/>) }
          <div className='right-menu'>
            <div className='btn-wrap'>
              <img id='bookmark-btn' src='resources/icons/icon_bookmark_fill.svg'/>
              100K
            </div>
            <div className='btn-wrap'>
              <img id='list-btn' src='resources/icons/icon_list.svg'/>
              List
            </div>
          </div>
          <div className='progress-bar'>
            <input style={{background: `linear-gradient(to right, #FF3064 ${progress}%, #535353 ${progress}%)`}} type='range' min='0' max='100' step='0.1' value={progress} onChange={handleProgressChange}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default UIPopShortFormPlayer;