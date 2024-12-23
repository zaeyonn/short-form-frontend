import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSwiper } from "swiper/react"

import * as globalSlice from 'src/redux/globalSlice';
import * as userSlice from 'src/redux/userSlice';

import UIShortFormSwiper from "components/ui/UIShortFormSwiper";
import UIBottomSheetEpisodeGrid from "../UIBottomSheetEpisodeGrid";

interface Props {

}

const UIPopShortFormPlayer = ({}: Props) => {

  const { user, seriesKeepList } = useSelector((state: any) => state.user);
  const { episodeListResult, episodeListError, selectedSeries } = useSelector((state: any) => state.global);

  const [playing, setPlaying] = useState<boolean>(true);
  const [visibleTools, setVisibleTools] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentEp, setCurrentEp] = useState<any>();
  const [episodeList, setEpisodeList] = useState([]);
  // const [swiper, setSwiper] = useState<any>(null);
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
  const [keep, setKeep] = useState<boolean>();
  const [keepCount, setKeepCount] = useState(selectedSeries.keeps);

  const swiperRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
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

    if(!visibleTools) {
      clearTimeout(hideToolsTimeout.current);
    }
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

  // 재생바 터치 시작 이벤트
  const handleProgressTouchStart = () => {
    setPlaying(false);
    if(videoRef.current) {
      videoRef.current.pause();
    }
  }

  // 재생바 터지 종료 이벤트
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

    setCurrentEp(episodeList[swiper.activeIndex]);
  }

  const handleEpisodeChange = useCallback((idx: number) => {
    if(swiperRef.current) swiperRef.current.slideTo(idx, 0);
    setVisibleBottomSheet(false);
  }, []);

  const handleBottomSheetOpen = useCallback(() => {
    setVisibleBottomSheet(true);
  }, [])

  const handleBottomSheetClose = useCallback(() => {
    setVisibleBottomSheet(false);
  } , [])

  const handleSeriesKeep = () => {
    setKeep(!keep);

    if(keep) {
      setKeepCount(keepCount-1);
      dispatch(userSlice.removeSeriesKeep({ userId: user.id, seriesId: selectedSeries.id }));
    } else {
      setKeepCount(keepCount+1);
      dispatch(userSlice.addSeriesKeep({ userId: user.id, seriesId: selectedSeries.id }));
    }
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

  // 숏폼 리스트 조회 결과
  useEffect(() => {
    if(episodeListError) {
      console.log('episodeListError ', episodeListError);

      dispatch(globalSlice.clearGlobalState('episodeListError'));
    }

    if(episodeListResult && episodeListResult.data.code === 200) {
      console.log('episodeListResult ', episodeListResult);
      setCurrentEp(episodeListResult.data.data[0])
      setEpisodeList(episodeListResult.data.data);

      dispatch(globalSlice.clearGlobalState('episodeListResult'));
    }

  }, [episodeListResult, episodeListError])

  useEffect(() => {
    if(videoRef.current) {

      // 숏폼 영상 다보면 다음 회차 자동 재생생
      videoRef.current.addEventListener('ended', (e: any) => {
        console.log('video ended');
        if(currentEp.episode_num < episodeList.length) {
          swiperRef.current.slideTo(currentEp.episode_num, 0);
        }
      })
    }
  }, [videoRef.current, swiperRef.current])

  useEffect(() => {
    // 시리즈 북마크 확인
    seriesKeepList.forEach((keep: any) => {
      if (keep.series_id === selectedSeries.id) {
        setKeep(true);
        return;
      }
    })

    dispatch(globalSlice.episodeList({seriesId: selectedSeries.id}));
  }, [])

  return (
    <div className='popup-wrap'>
      <div className='short-form-swiper'>
        <UIShortFormSwiper
        swiperRef={swiperRef}
        handleSlideChange={handleSlideChange}
        episodeList={episodeList}
        videoRef={videoRef}
        handleTimeUpdate={handleTimeUpdate}
        toggleTools={toggleTools}/>
      </div>
      {visibleTools && (
        <>
          <div className='header'>
            <div className="left-section">
              <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
              <span className="title">{`${selectedSeries.title} [${currentEp?.episode_num ? currentEp?.episode_num : ''}]`}</span>
            </div>
            <div className='right-section'>
              <img src={`resources/icons/icon_kebab.svg`} onClick={() => 0}/>
            </div>
          </div>
          { playing && (<img className='main-play-btn' src="resources/icons/icon_pause_main.svg" onClick={togglePlay}/>) }
          { !playing && (<img className='main-play-btn' src="resources/icons/icon_play_main.svg" onClick={togglePlay}/>) }
          <div className='right-menu'>
            <div className='btn-wrap' onClick={handleSeriesKeep}>
              <img id='bookmark-btn' src={`resources/icons/icon_bookmark${keep ? '_fill' : ''}.svg`}/>
              {keepCount}
            </div>
            <div className='btn-wrap' onClick={handleBottomSheetOpen}>
              <img id='list-btn' src='resources/icons/icon_list.svg'/>
              List
            </div>
          </div>
          <div className='progress-bar'>
            <input style={{background: `linear-gradient(to right, #FF3064 ${progress}%, #535353 ${progress}%)`}} type='range' min='0' max='100' step='0.1' value={progress} onChange={handleProgressChange} onTouchEnd={handleProgressTouchEnd} onTouchStart={handleProgressTouchStart}/>
          </div>
        </>
      )}
      
        <UIBottomSheetEpisodeGrid
        currentEp={currentEp}
        visibleBottomSheet={visibleBottomSheet}
        handleBottomSheetClose={handleBottomSheetClose}
        handleEpisodeChange={handleEpisodeChange}
        />
    </div>
  )
}

export default UIPopShortFormPlayer;