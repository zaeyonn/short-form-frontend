import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LayoutNavigationBar = () => {
  const location = useLocation();

  return (
    <div className="navigation-bar">
      <div className="wrap">
        <div className="left-section">
          <Link to={window.location.origin} className="title">
            <img className='logo' src={"/resources/images/main_logo_white.svg"}/>
          </Link>
          <Link
            className={`tab ${
              location.pathname === "/bookmark" ? "active" : ""
            }`}
            to={"/bookmark"}
          >
            북마크
          </Link>
          <Link
            className={`tab ${
              location.pathname === "/mission" ? "active" : ""
            }`}
            to={"/mission"}
          >
            미션 & 이벤트
          </Link>
        </div>
        <div className="right-section">
          <Link to={"/profile"} className="profile-btn">
            <img src={"/resources/icons/icon_profile_gray_m.svg"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LayoutNavigationBar;
