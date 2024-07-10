// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import EpisodeDetails from '../components/Podcasts/EpisodeDetails'; // Import the EpisodeDetails component

const FavoritesPage = ({ favorites = [] }) => {
  const navigate = useNavigate();

  const handleBackToShows = () => {
    navigate('/podcasts');
  };

  const handleBackToSeasons = (showId) => {
    navigate(`/podcast/${showId}`);
  };

  return (
    <div className="favorites-page">
      <h1>Favorite Episodes</h1>
      <button onClick={handleBackToShows}>Back to Shows</button>
      <div className="favorites-list">
        {favorites && favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <div className="favorite-item" key={fav.episodeId}>
              <EpisodeDetails
                index={index + 1}
                title={fav.episodeTitle}
                description={fav.description}
              />
              <button onClick={() => handleBackToSeasons(fav.showId)}>Back to Seasons</button>
            </div>
          ))
        ) : (
          <p>No favorite episodes found.</p>
        )}
      </div>
    </div>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      episodeId: PropTypes.string.isRequired,
      episodeTitle: PropTypes.string.isRequired,
      showId: PropTypes.string.isRequired,
      showTitle: PropTypes.string.isRequired,
      seasonNumber: PropTypes.number.isRequired,
      episodeNumber: PropTypes.number.isRequired,
    })
  ),
};

FavoritesPage.defaultProps = {
  favorites: [],
};

export default FavoritesPage;
