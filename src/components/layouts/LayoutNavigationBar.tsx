import { Link } from "react-router-dom";

const LayoutNavigationBar = () => {
  console.log('window', window.location.origin);

  return (
    <div className='navigation-bar'>
      <div className='wrap'>
        <div className="left-section">
          <Link to={window.location.origin} className="title">Framez</Link>
          <span>카테고리</span>
          <span>북마크</span>
        </div>
        <div className='right-section'>
          <div className='profile-btn'>
            <img src={`/resources/icons/icon_profile_gray_m.svg`}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutNavigationBar;