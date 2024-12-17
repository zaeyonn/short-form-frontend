interface Props {
  item: any
}
  
const UIVideoWatchedItem = ({item}: Props) => {

  return (
  <>
    <div className="video-item">
      <img src={item.url}/>
      <div className="info-wrap">
        <div>{item.title}</div>
        <div>{`${item.cur_ep} / ${item.full_ep}`}</div>
      </div>
      <img src={`resources/icons/icon_bookmark${item.bookmark ? '_fill' : ''}.svg`}/>
    </div>
  </>
    
  )
}
  
export default UIVideoWatchedItem;