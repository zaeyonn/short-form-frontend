import { useDispatch, useSelector } from 'react-redux';
import * as globalSlice from 'src/redux/globalSlice';

import { UserRootState } from 'src/types';
import UIMediumContentItem from '../UIMediumContentItem';

const UIPopSeriesKeep = () => {
  const dispatch = useDispatch();

  const { seriesKeepList } = useSelector((state: UserRootState) => state.user)

  const handleClose = () => {
    dispatch(globalSlice.setDisplayPopName(''));
  }

  return (
    <div className='popup-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
        </div>
        <div className='title'>
          북마크
        </div>
        <div className='right-section'>
          선택
        </div>
      </div>
      <div className='series-container'>
      { seriesKeepList.map((item: any, index: number) => <UIMediumContentItem key={index} item={item}/>)}
      </div>
    </div>
  )
}

export default UIPopSeriesKeep