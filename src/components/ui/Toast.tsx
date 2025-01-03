import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from '@react-spring/web';

import { createPortal } from "react-dom";

import * as globalSlice from "src/redux/globalSlice"; 

interface Props {
  message: string;
  duration: number;
}

const Toast = ({ message, duration}: Props) => {
  const dispatch = useDispatch();
  const [springs, api] = useSpring(() => ({
    from: {scale: 0.5},
    to: {scale: 1},
    config: {mass: 1.1, tension: 250, friction: 20},
  }))

  useEffect(() => {
    const timer = setTimeout(() => dispatch(globalSlice.removeToast()), duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    api.start();
  }, [])

  return (
    <animated.div style={{...springs}} className='toast'>{message}</animated.div>
  )
}

export default Toast;

