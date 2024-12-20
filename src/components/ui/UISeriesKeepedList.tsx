import { useDispatch, useSelector } from "react-redux";
import * as globalSlice from "src/redux/globalSlice";
import UISeriesKeepedItem from "./UISeriesKeepedItem";
import { useRef } from "react";

interface Props {
  isManageMode: boolean,
  removeVideos: any,
}

const UISeriesKeepedList = ({isManageMode, removeVideos}: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  return (
    <div className='keeped-video-list-wrap'>
      {user.seriesKeeped.length === 0 ? (
        <div className="no-list">
          <div>소장하고 있는 리스트가 없습니다.</div>
          <button onClick={() => {dispatch(globalSlice.setDisplayPopName(''))}}>인기작품 시청하기</button>
        </div>
      ) : (
        <>
          <div className='vertical-content-list'>
            {user.seriesKeeped.map((i: any, index: number) => <UISeriesKeepedItem item={i} key={index} isManageMode={isManageMode} removeVideos={removeVideos}/>)}
          </div>
        </>

      )}
    </div>
  )
}

export default UISeriesKeepedList;