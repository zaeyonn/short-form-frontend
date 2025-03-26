import { useNavigate } from "react-router-dom";

interface Props {
  item: any;
}

const UIMainContentItem = ({ item }: Props) => {
  const navigate = useNavigate();

  const handleSeriesPlayerOpen = () => {
    navigate(`/series/${item.id}`);
  };

  return (
    <div className="main-content-item">
      <div className="img-wrap" onClick={() => handleSeriesPlayerOpen()}>
        <img
          draggable="false"
          src={`/resources/images/posters/${
            item.poster_img
          }`}
        />
        <div className="text-wrap">
          <div className="main-text">{item.title}</div>
          <div className="sub-text">{item.description}</div>
        </div>
      </div>
    </div>
  );
};

export default UIMainContentItem;
