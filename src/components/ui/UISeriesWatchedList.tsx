import { useSelector } from "react-redux";
import UISeriesWatchedItem from "./UISeriesWatchedItem";

const UISeriesWatchedList = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className='watched-video-list-wrap'>
      <div className='vertical-content-list'>
        {user.seriesWatched.map((i: any, index: number) => <UISeriesWatchedItem item={i} key={index}/>)}
      </div>
    </div>
  )
}

export default UISeriesWatchedList;