import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LanguagePage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };


  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  return (
    <>
      <div className="page-wrap">
        <div className="header">
          <div className="left-section">
            <img
              src={`/resources/icons/icon_arrow_left_m.svg`}
              onClick={() => handleClose()}
            />
          </div>
          <div className='title'>
            언어
          </div>
          <div className='right-section'>
            <span className='empty' />
          </div>
        </div>
        <div className="page-body">
          <div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LanguagePage;
