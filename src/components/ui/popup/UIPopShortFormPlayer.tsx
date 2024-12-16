import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"

import * as globalSlice from 'src/redux/globalSlice';
import UIShortFormSwiper from "components/ui/UIShortFormSwiper";

interface Props {

}

const SHORT_FORM_LIST = [
  {
    title: '사랑은 거짓말 처럼',
    ep: 1,
    url: 'resources/videos/short_form_ex_1.mp4'
  },
  {
    title: '사랑은 거짓말 처럼',
    ep: 2,
    url: 'resources/videos/short_form_ex_2.mp4'
  },
  {
    title: '사랑은 거짓말 처럼',
    ep: 3,
    url: 'resources/videos/short_form_ex_3.mp4'
  },
  {
    title: '사랑은 거짓말 처럼',
    ep: 4,
    url: 'resources/videos/short_form_ex_4.mp4'
  },
  {
    title: '사랑은 거짓말 처럼',
    ep: 5,
    url: 'resources/videos/short_form_ex_5.mp4'
  },
  {
    title: '사랑은 거짓말 처럼',
    ep: 6,
    url: 'resources/videos/short_form_ex_6.mp4'
  },
  {
    title: '사랑은 거짓말 처럼',
    ep: 7,
    url: 'resources/videos/short_form_ex_7.mp4'
  }
]

const UIPopShortFormPlayer = ({}: Props) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [visibleTools, setVisibleTools] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentEp, setCurrentEp] = useState<any>(SHORT_FORM_LIST[0]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideToolsTimeout = useRef<any>();

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
    }
    dispatch(globalSlice.setDisplayPopName(''));
    dispatch(globalSlice.setNavigationBar(navBar));
  }


  // 도구 토글
  const toggleTools = () => {
    setVisibleTools(!visibleTools);
  }

  // 재생 / 일시정지 토글
  const togglePlay = (e: any) => {
    e.stopPropagation();

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
    e.stopPropagation();
    const newProgess = e.target.value;

    if(videoRef.current) {
      const duration = videoRef.current.duration;
      videoRef.current.currentTime = (newProgess / 100) * duration;
      setProgress(newProgess);
    }
  }

  
  const handleProgressTouchStart = () => {
    setPlaying(false);
    if(videoRef.current) {
      videoRef.current.pause();
    }
  }

  const handleProgressTouchEnd = () => {
    setPlaying(true);
    if(videoRef.current) {
      videoRef.current.play();
    }
  }


  // Short Form Slide 변경
  const handleSlideChange = (swiper: any) => {
    const slidedVideo = document.getElementById(`slide-idx-${swiper.activeIndex}`);

    if(videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();

      videoRef.current = slidedVideo;
      videoRef.current.play();
      setPlaying(true);
    }

    setCurrentEp(SHORT_FORM_LIST[swiper.activeIndex])
  }

  useEffect(() => {
    if(visibleTools && playing) {
      hideToolsTimeout.current = setTimeout(() => {
        setVisibleTools(false);
      }, 3000)
    } else if(!playing && visibleTools) {
      clearTimeout(hideToolsTimeout.current);
    } 

  }, [visibleTools, playing])


  useEffect(() => {
    const navBar = {
      visible: false
    }

    dispatch(globalSlice.setNavigationBar(navBar));
  }, [])

  return (
    <div className='popup-wrap'>
      <div className='short-form-swiper'>
        <UIShortFormSwiper
        handleSlideChange={handleSlideChange}
        shortFormList={SHORT_FORM_LIST}
        videoRef={videoRef}
        handleTimeUpdate={handleTimeUpdate}
        toggleTools={toggleTools}/>
      </div>
      {visibleTools && (
        <>
          <div className='header'>
            <div className="left-section">
              <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
              <span className="title">{`${currentEp.title} [${currentEp.ep}]`}</span>
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
            <input style={{background: `linear-gradient(to right, #FF3064 ${progress}%, #535353 ${progress}%)`}} type='range' min='0' max='100' step='0.1' value={progress} onChange={handleProgressChange} onTouchEnd={handleProgressTouchEnd} onTouchStart={handleProgressTouchStart}/>
          </div>
        </>
      )}
    </div>
  )
}

export default UIPopShortFormPlayer;