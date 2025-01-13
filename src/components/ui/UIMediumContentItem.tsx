import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as globalSlice from 'src/redux/globalSlice';

interface Props {
  item: any
}

const UIMediumContentItem = (props: Props) => {
  const dispatch = useDispatch();

  const handleSeriesPlayerOpen = () => {
    dispatch(globalSlice.setSelectedSeries(props.item));
  }

  return (
    <Link to='/series' className='medium-content-item' onClick={handleSeriesPlayerOpen}>
      <img src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${props.item.poster_img}`}/>
      <div className='title'>{props.item.title}</div>
    </Link>
  )
}

export default UIMediumContentItem