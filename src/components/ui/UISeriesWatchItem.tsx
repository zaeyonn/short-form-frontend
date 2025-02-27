import { useDispatch, useSelector } from "react-redux";
import * as userSlice from "src/redux/userSlice";

interface Props {
  item: any,
}
  
const UISeriesWatchItem = ({item}: Props) => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleClick = (item : any) => {
    if(item.bookmark) {
      dispatch(userSlice.removeSeriesKeep(item));
    }
    else {
      dispatch(userSlice.addSeriesKeep(item));
    }
    dispatch(userSlice.changeBookmarkState({item: item, index: user.seriesWatchList.indexOf(item)}));
  }

  return (
  <>
    <div className="video-item">
      <img src={item.url}/>
      <div className="info-wrap">
        <div>{item.title}</div>
        <div>{`${item.cur_ep}화 / 총 ${item.full_ep}화`}</div>
        <div>{item.keyword.map((item: string) => item)}</div>
      </div>
      <img src={`resources/icons/icon_bookmark${item.bookmark ? '_fill' : ''}.svg`} onClick={() => handleClick(item)}/>
    </div>
  </>
    
  )
}
  
export default UISeriesWatchItem;