import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ServiceTermsPage = () => {
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
            서비스 약관
          </div>
          <div className='right-section'>
            <span className='empty' />
          </div>
        </div>
        <div className="page-body">
          <div className='terms-wrap'>
          결제 금액에는 VAT가 포함되어 있어요.<br/>
          결제 진행 시 서비스 이용약관을 확인해 주세요.<br/>
          콘텐츠 구매 후 바로 재생되며, 사용한 젤리는 취소 및 환불이 불가능해요.<br/>
          충전한 젤리를 사용하여 숏챠의 콘텐츠를 볼 수 있어요.<br/>
          숏챠의 콘텐츠는 스마트폰/태블릿(Android OS 8.0 이상 / iOS 17.0 이상의 모델)에서 볼 수 있으며, 한국에서만 볼 수 있어요.<br/>
          젤리 충전 내역은 마이 페이지에서 확인할 수 있어요.<br/>
          젤리의 유효기간은 충전 후 5년이며, 이후 자동 소멸돼요.<br/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceTermsPage;
