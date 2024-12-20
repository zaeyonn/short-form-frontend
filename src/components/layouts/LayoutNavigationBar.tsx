import { useSelector } from 'react-redux';

const LayoutNavigationBar = () => {
  const { navigationBar, isLogin } = useSelector((state: any) => state.global);

  return (
    <div className='nav-bar' style={{ display: !navigationBar.visible ? 'none' : 'flex'}}>
      <div className="left-section">
        <img src={`resources/icons/${navigationBar?.leftBtn?.icon}`} onClick={navigationBar?.leftBtn?.event}/>
        <span className="title">{navigationBar?.title}</span>
      </div>
      <div className='right-section'>
        <img src={`resources/icons/${navigationBar?.rightBtn?.icon}`} onClick={navigationBar?.rightBtn?.event}/>
        {!isLogin && (
          <button>로그인</button>
        )}
      </div>
    </div>
  )
}

export default LayoutNavigationBar;