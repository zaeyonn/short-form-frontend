import { useSelector } from "react-redux";
import UIVideoWatchedItem from "./UIVideoWatchedItem";

const UIVideoWatchedList = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className='watched-video-list-wrap'>
      <div className='vertical-content-list'>
        {user.listVideoWatched.map((i: any, index: number) => <UIVideoWatchedItem item={i} key={index}/>)}
      </div>
    </div>
  )
}

export default UIVideoWatchedList;