import HlsPlayer from "components/HlsPlayer";
import { RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

import { Series } from "src/types";

interface Props {
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
  setVideoLoading: any;
  setPlaying: any;
  handleEpisodeChange: (index: number) => any;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  handleSlideChangeStart: (swiper: any) => any;
  handleVideoEnded: () => any;
}

const UIShortFormSwiper = ({series, locked, muted, episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange, swiperRef, lastEpisode, setVideoLoading, setPlaying, handleEpisodeChange}: Props) => {

  return (
    <Swiper 
      onSwiper={swiper => swiperRef.current = swiper} 
      className='short-form-swiper' direction="vertical" 
      onSlideChange={handleSlideChange} 
      onClick={toggleTools}
      allowSlideNext={locked ? false : true}>
      { episodeList.map((i: any, index: number) => {
        return (
          <SwiperSlide className='short-form' key={index}>
            <HlsPlayer
              locked={locked}
              series={series}
              lastEpisode={lastEpisode}
              index={index}
              muted={muted}
              episodeNum={index+1}
              videoRef={videoRef}
              videoUrl={`https://storage.googleapis.com/framez-local/videos/${i.series_id}/hls/${index + 1}_hls_output.m3u8`}
              setVideoLoading={setVideoLoading}
              setPlaying={setPlaying}
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