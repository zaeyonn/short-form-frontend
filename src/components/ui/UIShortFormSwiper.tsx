import { RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

import { Series } from "src/types";

// import HlsPlayer from "components/HlsPlayer";
import ProgressivePlayer from "components/ProgressivePlayer";

interface Props {
  quality: string;
  hlsRef: any;
  series: Series;
  muted: boolean;
  locked: boolean;
  playing: boolean;
  episodeList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  swiperRef: any;
  blobUrlRef: RefObject<any>;
  lastEpisode: number;
  unlockEpisode: number | undefined;
  currentTimeRef: any;
  setVideoLoading: any;
  setPlaying: any;
  handleEpisodeChange: (index: number) => any;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  handleSlideChangeStart: (swiper: any) => any;
  handleVideoEnded: () => any;
  handleSlideChangeTransitionStart: () => any;
}

const UIShortFormSwiper = ({locked, muted, episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange, swiperRef, lastEpisode, setVideoLoading, handleEpisodeChange, handleSlideChangeTransitionStart}: Props) => {

  return (
    <Swiper 
      onSwiper={swiper => swiperRef.current = swiper} 
      className='short-form-swiper' direction="vertical" 
      onSlideChange={handleSlideChange} 
      onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
      onClick={toggleTools}
      allowSlideNext={locked ? false : true}>
      { episodeList.map((i: any, index: number) => {
        return (
          <SwiperSlide className='short-form' key={index}>
            {/* <HlsPlayer
              quality={quality}
              hlsRef={hlsRef}
              locked={locked}
              series={series}
              lastEpisode={lastEpisode}
              index={index}
              muted={muted}
              episodeNum={index+1}
              videoRef={videoRef}
              currentTimeRef={currentTimeRef}
              videoUrl={`https://storage.googleapis.com/framez-local/videos_by_quality/${i.series_id}/${index + 1}/master.m3u8`}
              setVideoLoading={setVideoLoading}
              setPlaying={setPlaying}
              handleEpisodeChange={handleEpisodeChange}
              handleTimeUpdate={handleTimeUpdate}
            /> */}
            <ProgressivePlayer
              locked={locked}
              muted={muted}
              lastEpisode={lastEpisode}
              index={index}
              seriesId={i.series_id}
              episodeNum={index + 1}
              videoRef={videoRef}
              setVideoLoading={setVideoLoading}
              handleEpisodeChange={handleEpisodeChange}
              handleTimeUpdate={handleTimeUpdate}
            />
            {locked && <div className='locked-layer'/>}
          </SwiperSlide>
          )
      })}
    </Swiper>
  )
}

export default UIShortFormSwiper;