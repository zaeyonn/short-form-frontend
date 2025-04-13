import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserRootState } from "src/types";

const CoinHistoryPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: UserRootState) => state.user);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="page-wrap">
      <div className="header">
        <div className="left-section">
          <img
            src={`/resources/icons/icon_arrow_left_m.svg`}
            onClick={() => handleClose()}
          />
        </div>
        <div className="title">코인 내역</div>
        <div className="right-section">
          <span className="empty" />
        </div>
      </div>
      <div className="page-body">
        <div className="total-coin-wrap">
          <div className="total-coin">
            보유 코인
            <span className="value">
              {user.paid_point
                ? (user.paid_point + user.free_point).toLocaleString()
                : 0}
            </span>
          </div>
          <div className="horizontal-line" />
          <div className="my-point-wrap">
            <div className="my-point">
              <label>
                내 코인
                <img src="/resources/icons/icon_bang.svg" />
              </label>
              <div className="point-value">
                {user?.paid_point ? (user?.paid_point).toLocaleString() : 0}
                <img src="/resources/icons/icon_coin_s.png" />
              </div>
            </div>
            <div className="my-point">
              <label>
                보너스 코인
                <img src="/resources/icons/icon_bang.svg" />
              </label>
              <div className="point-value">
                {user?.free_point ? (user?.free_point).toLocaleString() : 0}
                <img src="/resources/icons/icon_coin_s.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="coin-history-wrap">
            <div className="tab-wrap">
                <div className="tab focused">
                  획득
                </div>
                <div className="tab">
                  사용
                </div>
                <div className="tab">
                  소멸
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CoinHistoryPage;
