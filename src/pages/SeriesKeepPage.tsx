import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as userSlice from 'src/redux/userSlice';
import * as globalSlice from 'src/redux/globalSlice';
import { Series, UserRootState } from 'src/types';
import UIMediumContentItem from '../components/ui/UIMediumContentItem';
import LayoutFooter from 'components/layouts/LayoutFooter';

const SeriesKeepPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile } = useSelector((state: any) => state.global);
  const { seriesKeepList, user, userSeriesKeepListError, userSeriesKeepListResult, removeSeriesKeepResult, removeSeriesKeepError, userSeriesWatchListResult, userSeriesWatchListError } = useSelector((state: UserRootState) => state.user);

  const [selectMode, setSelectMode] = useState(isMobile ? false : true);
  const [checkList, setCheckList] = useState<number []>([]);

  const handleClose = () => {
    navigate(-1);
  }

  const toggleSelectMode = () => {
    if(selectMode) {
      setCheckList([]);
    }

    setSelectMode(!selectMode);
  }

  const handleAllCheck = () => {
    if(checkList.length < seriesKeepList.length) { 
      const allIdList = [...seriesKeepList.map((item: any) => item.id)];
      setCheckList(allIdList);
    } else {
      setCheckList([]);
    }
  }

  const handleCheck = (id: number) => {
    const tmpCheckList = [...checkList];
    const index = tmpCheckList.findIndex((item) => item === id);

    if(index >= 0) {
      tmpCheckList.splice(index, 1);
    } else {
      tmpCheckList.push(id);
    }

    setCheckList(tmpCheckList);
  }

  const handleKeepRemove = () => {
    console.log('checkList', checkList);
    dispatch(globalSlice.setAlert({
      title: '리스트 삭제',
      message: '목록에서 선택한 영상을 \n삭제하시겠습니까?',
      cancelBtn: {
        text: '취소',
        event: () => dispatch(globalSlice.setAlert(null))
      },
      confirmBtn: {
        text: '삭제',
        event: () => dispatch(userSlice.removeSeriesKeep({ userId: user.id, seriesIdList: checkList }))
      }
    }));
  }

  // 북마크 삭제 결과
    useEffect(() => {
      if(removeSeriesKeepError) {
        console.log('removeSeriesKeepError ', removeSeriesKeepError);
        dispatch(globalSlice.setAlert(null));
        dispatch(userSlice.clearUserState('removeSeriesKeepError'));
      }
  
      if(removeSeriesKeepResult && removeSeriesKeepResult.status === 200) {
        console.log('removeSeriesKeepResult ', removeSeriesKeepResult);
        
        dispatch(userSlice.userSeriesKeepList({ userId: user.id }));
        dispatch(userSlice.clearUserState('removeSeriesKeepResult'));
        dispatch(globalSlice.setAlert(null));
        
        setCheckList([]);
        if(isMobile) {
          setSelectMode(false);
        }
      }
    }, [removeSeriesKeepResult, removeSeriesKeepError]);

      // 북마크 시리즈 리스트 조회 결과
  useEffect(() => {
    if(userSeriesKeepListError) {
      console.log('userSeriesKeepListError ', userSeriesKeepListError);
  
      dispatch(userSlice.clearUserState('userSeriesKeepListError'));
    }
  
    if(userSeriesKeepListResult && userSeriesKeepListResult.status === 200) {
      console.log('userSeriesKeepListResult ', userSeriesKeepListResult);
      
      dispatch(userSlice.setSeriesKeepList(userSeriesKeepListResult.data));
  
      dispatch(userSlice.userSeriesWatchList({ userId: user.id }));

      dispatch(userSlice.clearUserState('userSeriesKeepListResult'));
    }
  }, [userSeriesKeepListResult, userSeriesKeepListError]);


     // 시청 시리즈 리스트 조회 결과
  useEffect(() => {
    if(userSeriesWatchListError) {
      console.log('userSeriesWatchListError ', userSeriesWatchListError);
  
      dispatch(userSlice.clearUserState('userSeriesWatchListError'));
    }
  
    if(userSeriesWatchListResult && userSeriesWatchListResult.status === 200) {
      console.log('userSeriesWatchListResult ', userSeriesWatchListResult);
      
      dispatch(userSlice.setSeriesWatchList(userSeriesWatchListResult.data));
  
      dispatch(userSlice.clearUserState('userSeriesWatchListResult'));

      if(seriesKeepList) {
        const tmpSeriesKeepList = [...seriesKeepList].map((keep: Series) => {
          const lastEpisode = userSeriesWatchListResult.data.find((watch: Series) => watch.id === keep.id) ?  userSeriesWatchListResult.data.find((watch: Series) => watch.id === keep.id).last_episode : '0';
          
          return {
            ...keep,
            last_episode: lastEpisode,
          }
        });

        dispatch(userSlice.setSeriesKeepList(tmpSeriesKeepList));
      }
    }
  }, [userSeriesWatchListResult, userSeriesWatchListError, seriesKeepList])

 
  useEffect(() => {
    if(user) {
      dispatch(userSlice.userSeriesKeepList({ userId: user.id }));
    }
  }, [user])
  
  return (
    <>
    <div className='page-wrap'>
      <div className='header'>
        <div className="left-section">
          <img src={`resources/icons/icon_arrow_left_m.svg`} onClick={handleClose}/>
        </div>
        <div className='title'>
          북마크
        </div>
        <div className='right-section' onClick={toggleSelectMode}>
          <button className={`mobe-btn ${seriesKeepList.length === 0 ? 'disabled' : ''}`} disabled={seriesKeepList.length === 0} onClick={toggleSelectMode}>
            {(selectMode) ? '완료' : '편집'}
          </button>
        </div>
      </div>
      <div className='page-body'>
      { selectMode && (
        <div className='select-mode'>
          <div className='all-check' onClick={handleAllCheck}>
          <span className={`checkbox ${(checkList.length > 0 && checkList.length === seriesKeepList.length )? 'checked' : ''}`}>
            <img src='resources/icons/icon_check.svg'/>
          </span>
            전체선택
          </div>
          <button className={`delete-btn ${checkList.length === 0 ? 'disabled' : ''}`} disabled={checkList.length === 0} onClick={handleKeepRemove}>
            삭제
          </button>
        </div>
      )}
      <div className='series-container'>
      { seriesKeepList.length > 0 ? (
        seriesKeepList.map((item: any, index: number) => <UIMediumContentItem checkList={checkList} selectMode={selectMode} key={index} item={item} handleCheck={handleCheck}/>))
      : (
        <div className='no-data'>
          <img src='resources/icons/icon_bookmark.svg'/>
          {'숏츠를 시청하고\n북마크를 추가해보세요.'}
        </div>
      )}
      </div>
      </div>
    </div>
    { !isMobile && (
      <LayoutFooter/>
    )}
    </>
  )
}

export default SeriesKeepPage