import { RefObject, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

interface Props {
  episodeList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
  handleSlideChangeStart: (swiper: any) => any;
  swiperRef: any;
  lastEpisodeRef: any;
  unlockEpisode: number;
}

const UIShortFormSwiper = ({episodeList, videoRef, handleTimeUpdate, toggleTools, handleSlideChangeStart, handleSlideChange, swiperRef, lastEpisodeRef, unlockEpisode}: Props) => {

  return (
    <Swiper onSwiper={swiper => swiperRef.current = swiper}  className='short-form-swiper' direction="vertical" onSlideChange={handleSlideChange} onClick={toggleTools}>
      { episodeList.map((i: any, index: number) => {
        if(index <= unlockEpisode) {
          return (
            <SwiperSlide className='short-form' key={index}>
              <video id={`slide-idx-${index}`} ref={lastEpisodeRef.current - 1 === index ? videoRef : null} autoPlay={lastEpisodeRef.current - 1 === index ? true : false} onTimeUpdate={handleTimeUpdate}>
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