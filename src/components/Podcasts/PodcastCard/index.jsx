import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

const PodcastCard = ({ item }) => {
  if (!item) {
    return null;
  }

  const { id, title, displayImage, genres, episodes, seasons, lastUpdated } = item;

  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img src={displayImage} alt={title} className="podcast-image" />
        <h4 className="podcast-title">{title}</h4>
        <div className="genres-list">
          {genres && genres.length > 0 ? (
            genres.map((genre, index) => (
              <span key={index} className="genre">
                {genre}
              </span>
            ))
          ) : (
            <span className="genre">No genres specified</span>
          )}
        </div>
        <div className="additional-info">
          <p>Episodes: {episodes}</p>
          <p>Seasons: {seasons}</p>
          <p>Last Updated: {lastUpdated}</p>
        </div>
      </div>
    </Link>
  );
};

PodcastCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    displayImage: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    episodes: PropTypes.number.isRequired,
    seasons: PropTypes.number.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }),
};

export default PodcastCard;
