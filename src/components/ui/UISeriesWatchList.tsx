import { useSelector } from "react-redux";
import UISeriesWatchItem from "./UISeriesWatchItem";

const UISeriesWatchList = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <div className='watched-video-list-wrap'>
      <div className='vertical-content-list'>
        {user.seriesWatchList.map((i: any, index: number) => <UISeriesWatchItem item={i} key={index}/>)}
      </div>
    </div>
  )
}

export default UISeriesWatchList;