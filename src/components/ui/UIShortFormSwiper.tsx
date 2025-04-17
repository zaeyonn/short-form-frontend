import { RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

import { Series } from "src/types";

// import HlsPlayer from "components/HlsPlayer";
import ProgressivePlayer from "components/ProgressivePlayer";

interface Props {
  subtitle: any;
  currentIndex: number;
  quality: string;
  videoListRef: any;
  hlsRef: any;
  series: Series;
  muted: boolean;
  locked: boolean;
  playing: boolean;
  episodeList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  trackRef: any;
  swiperRef: any;
  blobUrlRef: RefObject<any>;
  lastEpisode: number;
  unlockEpisode: any;
  currentTimeRef: any;
  setVideoLoading: any;
  setPlaying: any;
  handleEpisodeChange: (index: number) => any;
  handleTimeUpdate: (index: number) => any;
  toggleTools: () => any;
  handleSlideChangeStart: (swiper: any) => any;
  handleVideoEnded: () => any;
  handleSlideTransitionEnd: any;
  handleSlideTransitionStart: any;
}

const UIShortFormSwiper = ({subtitle, currentIndex, trackRef, videoListRef, quality, locked, muted, episodeList, videoRef, handleTimeUpdate, toggleTools, swiperRef, lastEpisode, setVideoLoading, unlockEpisode, handleSlideTransitionEnd, handleEpisodeChange, handleSlideTransitionStart}: Props) => {

  return (
    <Swiper
      onSwiper={swiper => swiperRef.current = swiper} 
      className='short-form-swiper' direction="vertical" 
      onSlideChangeTransitionEnd={handleSlideTransitionEnd}
      onSlideChangeTransitionStart={handleSlideTransitionStart}
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
              videoListRef={videoListRef}
              currentTimeRef={currentTimeRef}
              videoUrl={`https://storage.googleapis.com/framez-local/videos_by_quality/${i.series_id}/${index + 1}/master.m3u8`}
              setVideoLoading={setVideoLoading}
              setPlaying={setPlaying}
              handleEpisodeChange={handleEpisodeChange}
              handleTimeUpdate={handleTimeUpdate}
            /> */}
            <ProgressivePlayer
              unlockEpisode={unlockEpisode}
              subtitle={subtitle}
              swiperRef={swiperRef}
              trackRef={trackRef}
              currentIndex={currentIndex}
              quality={quality}
              videoListRef={videoListRef}
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