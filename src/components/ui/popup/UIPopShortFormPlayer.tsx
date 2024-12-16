import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as globalSlice from 'src/redux/globalSlice';

interface Props {

}

const UIPopShortFormPlayer = ({}: Props) => {
  const [playing, setPlaying] = useState(true);
  
  const dispatch = useDispatch();

  const handleClose = () => {
    const navBar = {
      title: 'Logo',
      leftBtn: {
        icon: 'icon_hamburger.svg',
      },
      rightBtn: {
        icon: 'icon_search.svg',
        event: () => 0,
      },
    }
    dispatch(globalSlice.setDisplayPopName(''));
    dispatch(globalSlice.setNavigationBar(navBar));
  }


  useEffect(() => {
    const navBar = {
      title: '가난한 사위는 회장님 1화',
      leftBtn: {
        icon: 'icon_arrow_left_m.svg',
        event: handleClose
      },
      rightBtn: {
        icon: 'icon_kebab.svg',
        event: () => 0,
      }
    }

    dispatch(globalSlice.setNavigationBar(navBar));
  }, [])

  return (
    <div className='popup-wrap'>
      <video autoPlay={true} className="short-form-video">
        <source src='resources/videos/short_form_1.mp4'/>
      </video>
      <img className='main-play-btn' src="resources/icons/icon_play_main.svg"/>
    </div>
  )
}

export default UIPopShortFormPlayer;