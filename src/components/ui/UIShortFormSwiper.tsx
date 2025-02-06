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
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  handleSlideChangeStart: (swiper: any) => any;
  handleVideoEnded: () => any;
}

const UIShortFormSwiper = ({locked, muted, episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange, swiperRef, lastEpisode, handleVideoEnded}: Props) => {

  return (
    <Swiper 
      onSwiper={swiper => swiperRef.current = swiper} 
      className='short-form-swiper' direction="vertical" 
      onSlideChange={handleSlideChange} 
      onClick={toggleTools}
      allowSlideNext={locked ? false : true}>
      { episodeList.map((i: any, index: number) => {
        return (
          <>
          <SwiperSlide className='short-form' key={index}>
            <video preload="auto" playsInline muted={muted} id={`slide-idx-${index}`} autoPlay={false} ref={lastEpisode - 1 === index ? videoRef : null} onTimeUpdate={handleTimeUpdate} onEnded={() => handleVideoEnded()}>
              <source src={`${import.meta.env.VITE_SERVER_URL}/videos/${i.series_id}/${i.video}`}></source>
            </video>
            {locked && <div className='locked-layer'/>}
          </SwiperSlide>
          </>
          )
      }) }
    </Swiper>
  )
}

export default UIShortFormSwiper;