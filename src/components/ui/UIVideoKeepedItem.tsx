interface Props {
  item: any,
}
  
const UIVideoKeepedItem = ({item}: Props) => {
  return (
  <>
    <div className="video-item">
      <img src={item.url}/>
      <div className="info-wrap">
        <div>{item.title}</div>
      </div>
    </div>
  </>
  )
}
  
export default UIVideoKeepedItem;