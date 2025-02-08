import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import * as globalSlice from "src/redux/globalSlice";
import * as userSlice from "src/redux/userSlice";

import UIMainContentSlider from "components/ui/UIMainContentSlider";
import UIDesktopMainContentSlider from "components/ui/desktop/UIDesktopMainContentSlider";
import UISmallContentSlider from "components/ui/UISmallContentSlider";
import UIVerticalContentList from "components/ui/UIVerticalContentList";
import UILeftMenu from "components/ui/UILeftMenu";
import LayoutFooter from "components/layouts/LayoutFooter";
import { Series } from "src/types";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile, seriesList, seriesListResult, seriesListError } =
    useSelector((state: any) => state.global);
  const { userSeriesKeepListResult, userSeriesKeepListError } = useSelector(
    (state: any) => state.user
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [newestSeriesList, setNewestSeriesList] = useState<Series[]>([]);

  const handleMenuOpen = () => {
    setVisibleMenu(true);
  };

  const handleMenuClose = () => {
    setVisibleMenu(false);
  };

  const handleSeriesListOpen = (title: string) => {
    navigate("/series-list");
    dispatch(globalSlice.setSeriesListTitle(title));
  };

  // 북마크 시리즈 리스트 조회 결과`
  useEffect(() => {
    if (userSeriesKeepListError) {
      console.log("userSeriesKeepListError ", userSeriesKeepListError);

      dispatch(userSlice.clearUserState("userSeriesKeepListError"));
    }

    if (userSeriesKeepListResult && userSeriesKeepListResult.status === 200) {
      console.log("userSeriesKeepListResult ", userSeriesKeepListResult);

      dispatch(userSlice.setSeriesKeepList(userSeriesKeepListResult.data));

      dispatch(userSlice.clearUserState("userSeriesKeepListResult"));
    }
  }, [userSeriesKeepListResult, userSeriesKeepListError]);

  // 시리즈 리스트 조회 결과
  useEffect(() => {
    if (seriesListError) {
      dispatch(globalSlice.clearGlobalState("seriesListError"));
    }

    if (seriesListResult && seriesListResult.status === 200) {
      dispatch(globalSlice.setSeriesList(seriesListResult.data));
      dispatch(globalSlice.clearGlobalState("seriesListResult"));

      const sorted = [...seriesListResult.data].sort(
        (a: Series, b: Series) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setNewestSeriesList(sorted);
      setLoading(false);
    }
  }, [seriesListResult, seriesListError]);

  // 시리즈 리스트 조회
  useEffect(() => {
    dispatch(globalSlice.seriesList());
  }, []);

  return (
    <>
      <div className="page-wrap">
        <div className="header">
          <div className="left-section">
            <img
              src={`/resources/icons/icon_hamburger.svg`}
              onClick={handleMenuOpen}
            />
            <span className="title">Framez</span>
          </div>
          <div className="right-section">
            <Link to="/profile">
              <img
                className="profile-icon"
                src={`/resources/icons/icon_profile.svg`}
              />
            </Link>
          </div>
        </div>
        {loading && (
          <div className="loading">
            <TailSpin width={60} height={60} color={"#ffffff"} />
          </div>
        )}
        {!loading && (
          <div className="page-body" style={{ padding: 0 }}>
            {isMobile ? (
              <UIMainContentSlider seriesList={seriesList.slice(0, 3)} />
            ) : (
              <UIDesktopMainContentSlider seriesList={seriesList.slice(0, 3)} />
            )}
            <UISmallContentSlider
              headerTitle="지금 뜨고있는 TOP 10"
              seriesList={seriesList}
              highlight="HOT"
              handleSeriesListOpen={handleSeriesListOpen}
            />
            <UISmallContentSlider
              headerTitle="새로 올라온 콘텐츠"
              seriesList={newestSeriesList}
              highlight="NEW"
              handleSeriesListOpen={handleSeriesListOpen}
            />
            <UISmallContentSlider
              headerTitle="비밀을 가진 사람들"
              seriesList={seriesList}
              highlight=""
              handleSeriesListOpen={handleSeriesListOpen}
            />
            <UIVerticalContentList
              headerTitle="요즘 뜨는 환생 드라마"
              seriesList={seriesList}
              handleSeriesListOpen={handleSeriesListOpen}
            />
          </div>
        )}
      </div>
      <UILeftMenu visible={visibleMenu} handleMenuClose={handleMenuClose} />
      {!isMobile && <LayoutFooter />}
    </>
  );
};

export default MainPage;
