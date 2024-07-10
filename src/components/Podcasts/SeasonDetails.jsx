import PropTypes from 'prop-types';
import EpisodeDetails from './EpisodeDetails';
import './SeasonDetails.css'; // Import the CSS file

export default function SeasonDetails({ season }) {
  return (
    <div className="season-details">
      {season.episodes.length > 0 ? (
        season.episodes.map((episode, episodeIndex) => (
          <div className="episode-card" key={episodeIndex}>
            <EpisodeDetails
              index={episodeIndex + 1}
              title={episode.title}
              description={episode.description}
              audioFile={episode.audioFile || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
              seasonImage={season.displayImage} // Add this line
            />
          </div>
        ))
      ) : (
        <p>No Episodes</p>
      )}
    </div>
  );
}

SeasonDetails.propTypes = {
  season: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    displayImage: PropTypes.string.isRequired, // Add this line
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        audioFile: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
