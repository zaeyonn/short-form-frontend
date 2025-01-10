import { useEffect, useState } from "react";

interface Props {
  item: any,
  isManageMode: boolean,
  seriesList: any,
  removeVideos: any,
}
  
const UISeriesKeepItem = ({item, isManageMode, seriesList, removeVideos}: Props) => {
  const [isSelect, setSelect] = useState(false);
  const [imgHeight, setImgHeight] = useState(0);
  const [seriesInfo, setSeriesInfo] = useState<any>(null);

  const handleClick = () => {
    if(!isManageMode) {
      return;
    }

    if(isSelect) {
      let newArr = removeVideos.current.filter((i: any) => i !== item);
      removeVideos.current = newArr;
    } 
    else {
      removeVideos.current.push(item);
    }
    setSelect(!isSelect);
    console.log(`remove list : ${removeVideos.current}`);
  }

  const onLoadImg = (img: any) => {
    setImgHeight(img.target.clientHeight);
  }

  useEffect(() => {
    if(!isManageMode) {
      setSelect(false);
    }
  }, [isManageMode]);

  useEffect(() => {
    setSeriesInfo(seriesList.filter((i: any) => (i.id === item.series_id))[0]);
  }, [seriesInfo]);

  return (
  <>
    <div className="video-item">
      <img src={`${import.meta.env.VITE_SERVER_URL}/images/poster/${seriesInfo?.poster_img}`} onLoad={onLoadImg}/>
      {isSelect ? (<div onClick={handleClick} style={{width:'100%', height:`${imgHeight}px`, position:'absolute', backgroundColor:'rgba(0, 0, 0, 0.5)'}}/>) : (
          <div onClick={handleClick} style={{width:'100%', height:'80%', position:'absolute', backgroundColor:'rgba(0, 0, 0, 0)'}}/>)}

      <div className="info-wrap">
        <div>{seriesInfo?.title}</div>
      </div>
    </div>
  </>
  )
}
  
export default UISeriesKeepItem;