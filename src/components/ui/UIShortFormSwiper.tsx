import { RefObject, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

interface Props {
  episodeList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  swiperRef: any;
  lastEpisodeRef: any;
}

const UIShortFormSwiper = ({episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange, swiperRef, lastEpisodeRef}: Props) => {

  return (
    <Swiper onSwiper={swiper => swiperRef.current = swiper}  className='short-form-swiper' direction="vertical" onSlideChange={handleSlideChange} onClick={toggleTools}>
      { episodeList.map((i: any, idx: number) => {
        return (
          <SwiperSlide className='short-form' key={idx}>
            <video id={`slide-idx-${idx}`} ref={lastEpisodeRef.current - 1 === idx ? videoRef : null} autoPlay={lastEpisodeRef.current - 1 === idx ? true : false} onTimeUpdate={handleTimeUpdate}>
              <source src={`${import.meta.env.VITE_SERVER_URL}/videos/${i.series_id}/${i.video}`}></source>
            </video>
          </SwiperSlide>
        )
      }) }
    </Swiper>
  )
}

export default UIShortFormSwiper;