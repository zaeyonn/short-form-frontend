import { useSelector } from "react-redux";
import UIVideoKeepedItem from "./UIVideoKeepedItem";

const UIVideoKeepedList = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className='keeped-video-list-wrap'>
      <div className='vertical-content-list'>
        {user.watchedVideos.map((i: any, index: number) => <UIVideoKeepedItem item={i} key={index}/>)}
      </div>
    </div>
  )
}

export default UIVideoKeepedList;