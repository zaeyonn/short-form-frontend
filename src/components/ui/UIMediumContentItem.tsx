import { useDispatch } from 'react-redux';
import * as globalSlice from 'src/redux/globalSlice';

interface Props {
  item: any
}

const UIMediumContentItem = (props: Props) => {
  const dispatch = useDispatch();

  const handleSeriesPlayerOpen = () => {
    dispatch(globalSlice.setSeriesPlayer(true));
    dispatch(globalSlice.setSelectedSeries(props.item));
  }

  return (
    <div className='medium-content-item' onClick={handleSeriesPlayerOpen}>
      <img src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${props.item.poster_img}`}/>
      <div className='title'>{props.item.title}</div>
    </div>
  )
}

export default UIMediumContentItem