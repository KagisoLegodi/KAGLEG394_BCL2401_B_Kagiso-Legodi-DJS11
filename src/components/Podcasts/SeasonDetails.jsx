import PropTypes from 'prop-types';
import EpisodeDetails from './EpisodeDetails';

export default function SeasonDetails({ season }) {
  return (
    <div>
      {season.episodes.length > 0 ? (
        season.episodes.map((episode, episodeIndex) => (
          <EpisodeDetails
            key={episodeIndex}
            index={episodeIndex + 1}
            title={episode.title}
            description={episode.description}
            audioFile="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          />
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
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        audioFile: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
