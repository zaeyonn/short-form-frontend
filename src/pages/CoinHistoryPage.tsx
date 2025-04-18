import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from '@react-spring/web';
import moment from 'moment';

import * as userSlice from 'src/redux/userSlice';
import { UserRootState, CoinTransaction } from "src/types";
import { coinTransactionsType } from 'common/define';

const CoinHistoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [coinTransactions, setCoinTransactions] = useState<any>();
  // const [earnTransactions, setEarnTransactions] = useState<any>();

  const { user, coins, coinsTransactionListResult, coinsTransactionListError } = useSelector((state: UserRootState) => state.user);

  const tabSpring: any = useSpring({
    left: `calc(${(34 * selectedIndex)}% + ${selectedIndex === 0 ? '5px' : selectedIndex === 2 ? '-7px' : '-1px'})` ,
    config: { mass: 1, friction: 18, tension: 150}
  })

  const handleClose = () => {
    navigate(-1);
  };

  const handleTabSelect = (index: number) => {
    setSelectedIndex(index);
  }

  useEffect(() => {
    if(coinsTransactionListError) {
      console.log('coinsTransactionListError', coinsTransactionListError);

      dispatch(userSlice.clearUserState('coinsTransactionListError'));
    }

    if(coinsTransactionListResult && coinsTransactionListResult.status === 200) {
      console.log('coinsTransactionListResult', coinsTransactionListResult);
      let tmpCoinTransations: any = {};

      // 코인 획득 리스트
      coinsTransactionListResult.data.filter((i: CoinTransaction) => i.type === 'earn').forEach((item: CoinTransaction) => {
        const createdDay = moment(item.created_at).format('YYYY.MM.DD');

        if(!tmpCoinTransations[createdDay]) {
          tmpCoinTransations[createdDay] = [];
        }

        tmpCoinTransations[createdDay] = [...tmpCoinTransations[createdDay], item];
      })

      setCoinTransactions(tmpCoinTransations);

      dispatch(userSlice.clearUserState('coinsTransactionListResult'));
    }
  }, [coinsTransactionListError, coinsTransactionListResult])

  useEffect(() => {
    dispatch(userSlice.coinsTransactionList({userId: user.id}));
  }, [])

  useEffect(() => {
    console.log('coinTransactions', coinTransactions);

  }, [coinTransactions])

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
              {coins.paid
                ? (coins.paid + coins.free).toLocaleString()
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
                {coins?.paid ? (coins?.paid).toLocaleString() : 0}
                <img src="/resources/icons/icon_coin_s.png" />
              </div>
            </div>
            <div className="my-point">
              <label>
                보너스 코인
                <img src="/resources/icons/icon_bang.svg" />
              </label>
              <div className="point-value">
                {coins?.free ? (coins?.free).toLocaleString() : 0}
                <img src="/resources/icons/icon_coin_s.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="coin-history-wrap">
            <div className="tab-wrap">
                <animated.div className='tab-focused' style={tabSpring}/>
                <div className={`tab ${selectedIndex === 0  ? 'focused' : ''}`} onClick={() => handleTabSelect(0)}>
                  획득
                </div>
                <div className={`tab ${selectedIndex === 1  ? 'focused' : ''}`} onClick={() => handleTabSelect(1)}>
                  사용
                </div>
                <div className={`tab ${selectedIndex === 2  ? 'focused' : ''}`} onClick={() => handleTabSelect(2)}>
                  소멸
                </div>
            </div>
            <div className="coin-history-list-wrap">
               {coinTransactions && Object.entries(coinTransactions).map(([createdDay, historyList]) => {
                if(Array.isArray(historyList)) {
                  return (
                    <div key={createdDay} className='coin-history-section'>
                      <div className='created-day'>{createdDay}</div>
                      <div className='coin-history-list'>
                        {historyList.length > 0 && historyList.map((item: CoinTransaction) => (
                          <div key={item.id} className='coin-history-item'>
                            {coinTransactionsType[`${item.source_type}_${item.type}`].name}
                            <div className='coin-value'>
                              {`${item.type === 'earn' ? '+' : '-'}${(Number(item.coin))}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default CoinHistoryPage;
