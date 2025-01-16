import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as globalSlice from 'src/redux/globalSlice';

interface Props {
  item: any;
  selectMode?: boolean;
  handleCheck?: (id: number) => any;
  checkList?: number [];
}

const UIMediumContentItem = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const handleSeriesClick = () => {
    if(props.selectMode) {
      setChecked(!checked);
      if (props.handleCheck) props.handleCheck(props.item.id);
    } else {
      navigate('/series');
      dispatch(globalSlice.setSelectedSeries(props.item));
    }
  }

  useEffect(() => {
    if(props.checkList && props.checkList.includes(props?.item.id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [props.checkList])

  return (
    <div className='medium-content-item' onClick={handleSeriesClick}>
      {props.selectMode && (
        <span className={`checkbox ${checked ? 'checked' : ''}`}>
          <img src='resources/icons/icon_check.svg'/>
        </span>
      )}
      <img src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${props.item.poster_img}`}/>
      <div className='title'>{props.item.title}</div>
    </div>
  )
}

export default UIMediumContentItem