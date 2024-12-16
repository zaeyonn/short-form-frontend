import { RefObject, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

interface Props {
  shortFormList: any [];
  videoRef: RefObject<HTMLVideoElement>;
  handleTimeUpdate: () => any;
  toggleTools: () => any;
  handleSlideChange: (swiper: any) => any;
}

const UIShortFormSwiper = ({shortFormList, videoRef, handleTimeUpdate, toggleTools, handleSlideChange}: Props) => {
  const swiper = useSwiper();

  return (
    <Swiper className='short-form-swiper' direction="vertical" onSlideChange={handleSlideChange} onClick={toggleTools}>
      { shortFormList.map((i: any, idx: number) => {
        return (
          <SwiperSlide className='short-form' key={idx}>
            <video id={`slide-idx-${idx}`} ref={idx === 0 ? videoRef : null} autoPlay={idx === 0 ? true : false} onTimeUpdate={handleTimeUpdate}>
              <source src={i.url}></source>
            </video>
          </SwiperSlide>
        )
      }) }
    </Swiper>
  )
}

export default UIShortFormSwiper;