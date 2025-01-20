import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UIMediumContentItem from '../components/ui/UIMediumContentItem';

const SeriesListPage = () => {
  const navigate = useNavigate();

  const { seriesList, seriesListTitle } = useSelector((state: any) => state.global);

  const handleClose = () => {
    navigate(-1);
  }

  return (
    <div className='page-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
          <div className='title'>
            { seriesListTitle }
          </div>
        </div>
      </div>
      <div className='breadcrumb'>
        <span>Home</span>
        <img src='/resources/icons/icon_arrow_right_s.svg'/>
        <span className='active'>{ seriesListTitle }</span>
      </div>
      <div className='body'>
        <div className='series-container'>
        { seriesList?.map((item: any, index: number) => <UIMediumContentItem key={index} item={item}/>)}
        </div>
      </div>
    </div>
  )
}

export default SeriesListPage