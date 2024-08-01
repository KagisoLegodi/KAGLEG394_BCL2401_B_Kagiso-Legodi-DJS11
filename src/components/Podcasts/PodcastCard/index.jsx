import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";

const PodcastCard = ({ item, showFavoritesButton }) => {
  if (!item) {
    return ;
  }

  const { id, title, displayImage, genres, episodes, seasons, lastUpdated } = item;

  const handleFavoriteEpisode = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteEpisodes")) || [];
    favorites.push({ id, title });
    localStorage.setItem("favoriteEpisodes", JSON.stringify(favorites));
  };

  const handleFavoriteSeason = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteSeasons")) || [];
    favorites.push({ id, title });
    localStorage.setItem("favoriteSeasons", JSON.stringify(favorites));
  };

  const handleFavoriteGenre = (genre) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGenres")) || [];
    if (!favorites.includes(genre)) {
      favorites.push(genre);
      localStorage.setItem("favoriteGenres", JSON.stringify(favorites));
    }
  };

  return (
    <div className="podcast-card">
      <Link to={`/podcast/${id}`}>
        <img src={displayImage} alt={title} className="podcast-image" />
        <h4 className="podcast-title">{title}</h4>
      </Link>
      <div className="genres-list">
        {genres && genres.length > 0 ? (
          genres.map((genre, index) => (
            <span key={index} className="genre">
              {genre}
              {showFavoritesButton && <button onClick={() => handleFavoriteGenre(genre)}>Favorite Genre</button>}
            </span>
          ))
        ) : (
          <span className="genre">No genres specified</span>
        )}
      </div>
      <div className="additional-info">
        <p>Episodes: {episodes}</p>
        {showFavoritesButton && <button onClick={handleFavoriteEpisode}>Favorite Episode</button>}
        <p>Seasons: {seasons}</p>
        {showFavoritesButton && <button onClick={handleFavoriteSeason}>Favorite Season</button>}
        <p>Last Updated: {lastUpdated}</p>
      </div>
    </div>
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
  showFavoritesButton: PropTypes.bool.isRequired,
};

export default PodcastCard;
