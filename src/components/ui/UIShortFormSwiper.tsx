import { RefObject } from "react";
import { Swiper, SwiperSlide } from "swiper/react"

interface Props {
  muted: boolean;
  playing: boolean;
  episodeList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  handleSlideChangeStart: (swiper: any) => any;
  swiperRef: any;
  lastEpisodeRef: any;
  unlockEpisode: number | undefined;
}

const UIShortFormSwiper = ({muted, episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange, swiperRef, lastEpisodeRef, unlockEpisode}: Props) => {

  return (
    <Swiper onSwiper={swiper => swiperRef.current = swiper}  className='short-form-swiper' direction="vertical" onSlideChange={handleSlideChange} onClick={toggleTools}>
      { episodeList.map((i: any, index: number) => {
        if(unlockEpisode && index <= unlockEpisode) {
          return (
            <SwiperSlide className='short-form' key={index}>
              <video preload="auto" playsInline muted={muted} autoPlay={lastEpisodeRef.current - 1 === index ? true : false} id={`slide-idx-${index}`} ref={lastEpisodeRef.current - 1 === index ? videoRef : null} onTimeUpdate={handleTimeUpdate}>
                <source src={`${import.meta.env.VITE_SERVER_URL}/videos/${i.series_id}/${i.video}`}></source>
              </video>
            </SwiperSlide>
          )
        }
      }) }
    </Swiper>
  )
}

export default UIShortFormSwiper;