import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UserRootState } from 'src/types';
import UIMediumContentItem from '../components/ui/UIMediumContentItem';

const SeriesKeepPage = () => {
  const navigate = useNavigate();

  const { seriesKeepList } = useSelector((state: UserRootState) => state.user)

  const handleClose = () => {
    navigate(-1);
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

export default SeriesKeepPage