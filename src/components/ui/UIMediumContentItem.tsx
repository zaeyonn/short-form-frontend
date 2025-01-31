import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Props {
  item: any;
  selectMode?: boolean;
  handleCheck?: (id: number) => any;
  checkList?: number [];
}

const UIMediumContentItem = (props: Props) => {
  const navigate = useNavigate();

  const { isMobile } = useSelector((state: any) => state.global);

  const [checked, setChecked] = useState(false);

  const handleSeriesClick = () => {
    if(props.selectMode && isMobile) {
      setChecked(!checked);
      if (props.handleCheck) props.handleCheck(props.item.id);
    } else {
      navigate(`/series/${props.item.id}`);
    }
  }

  const handleCheck = (event: any) => {
    event.stopPropagation();
    setChecked(!checked);
    if (props.handleCheck) props.handleCheck(props.item.id);
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
        <span className={`checkbox ${checked ? 'checked' : ''}`} onClick={handleCheck}>
          <img src='resources/icons/icon_check.svg'/>
        </span>
      )}
      <img src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${props.item.poster_img}`}/>
      <div className='series-title'>{props.item.title}</div>
    </div>
  )
}

export default UIMediumContentItem