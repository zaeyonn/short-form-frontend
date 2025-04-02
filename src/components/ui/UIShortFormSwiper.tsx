import HlsPlayer from "components/HlsPlayer";
import { RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

interface Props {
  muted: boolean;
  locked: boolean;
  playing: boolean;
  episodeList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  swiperRef: any;
  blobUrlRef: RefObject<any>;
  lastEpisode: number;
  unlockEpisode: number | undefined;
  setLoading: any;
  handleEpisodeChange: (index: number) => any;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  handleSlideChangeStart: (swiper: any) => any;
  handleVideoEnded: () => any;
}

const UIShortFormSwiper = ({locked, muted, episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange, swiperRef, lastEpisode, setLoading, handleEpisodeChange}: Props) => {

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
              lastEpisode={lastEpisode}
              index={index}
              muted={muted}
              episodeNum={index+1}
              videoRef={videoRef}
              videoUrl={`https://storage.googleapis.com/framez-local/videos/${i.series_id}/hls/${index + 1}_hls_output.m3u8`}
              setLoading={setLoading}
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