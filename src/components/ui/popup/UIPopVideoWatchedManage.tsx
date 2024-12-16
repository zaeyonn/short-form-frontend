import { useDispatch } from "react-redux";
import * as globalSlice from "../../../redux/globalSlice";
import { useEffect } from "react";
import { displayPopType } from "common/define";

const UIPopVideoWatchedManage = ({prevPage = ''}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    const navBar = {
      title: '관람 기록',
      leftBtn: {
        icon: 'icon_hamburger.svg',
      },
      rightBtn: {
        icon: 'icon_search.svg',
        event: () => 0,
      },
    }
        
    if(prevPage === displayPopType.POPUP_VIDEO_WATCH.name) {
      dispatch(globalSlice.setDisplayPopName(prevPage));
    }
    dispatch(globalSlice.setNavigationBar(navBar));
  }
      
  useEffect(() => {
    const navBar = {
      title: '선택',
      rightBtn: {
        event: handleClose
      },
    }
    dispatch(globalSlice.setNavigationBar(navBar));
  }, [])
}

export default UIPopVideoWatchedManage;