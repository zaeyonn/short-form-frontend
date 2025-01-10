import { useDispatch } from 'react-redux';
import * as globalSlice from 'src/redux/globalSlice';

import UIMediumContentItem from '../UIMediumContentItem';

interface Props {
  title: string;
  seriesList: any[];
}

const UIPopSeriesList = (props: Props) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  return (
    <div className='popup-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
          <div className='title'>
            {props.title}
          </div>
        </div>
      </div>
      <div className='series-container'>
      { props.seriesList.map((item: any, index: number) => <UIMediumContentItem key={index} item={item}/>)}
      </div>
    </div>
  )
}

export default UIPopSeriesList