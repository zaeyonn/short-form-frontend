import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as globalSlice from 'src/redux/globalSlice';

interface SallContentItemProps {
  item: any;
  highlight?: string;
}

const UISmallContentItem = ({item, highlight}: SallContentItemProps) => {
  const dispatch = useDispatch();

  const handleSeriesPlayerOpen = () => {
      dispatch(globalSlice.setSelectedSeries(item));
  }
  
  return (
    <Link to='/series' className='small-content-item' onClick={() => handleSeriesPlayerOpen()}>  
      <div className='poster-wrap'>
        {highlight && (
          <span className='highlight'>{highlight}</span>
        )}
        <div className='tag-list'>
          { item.keyword?.map((i: string, idx: number) => <span className='tag' key={idx}>{i}</span>) }
        </div>
        <img className='poster-img' src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${item.poster_img}`}/>
      </div>
      <div className='title'>{item.title}</div>
    </Link>
  )
}

export default UISmallContentItem;