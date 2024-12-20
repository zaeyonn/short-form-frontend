import { useEffect, useState } from "react";

interface Props {
  item: any,
  isManageMode: boolean,
  removeVideos: any,
}
  
const UISeriesKeepedItem = ({item, isManageMode, removeVideos}: Props) => {
  const [isSelect, setSelect] = useState(false);

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

  useEffect(() => {
    if(!isManageMode) {
      setSelect(false);
    }
  }, [isManageMode])

  return (
  <>
    <div className="video-item">
      <img src={item.url}/>
      {isSelect ? (<div onClick={handleClick} style={{width:'100%', height:'80%', position:'absolute', backgroundColor:'rgba(0, 0, 0, 0.5)'}}/>) : (
          <div onClick={handleClick} style={{width:'100%', height:'80%', position:'absolute', backgroundColor:'rgba(0, 0, 0, 0)'}}/>)}

      <div className="info-wrap">
        <div>{item.title}</div>
      </div>
    </div>
  </>
  )
}
  
export default UISeriesKeepedItem;