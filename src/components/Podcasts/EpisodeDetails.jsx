import PropTypes from 'prop-types';

function EpisodeDetails({ index, title, description, audioFile }) {
  return (
    <div className="episode-details">
      <h2>Episode {index}: {title}</h2>
      <p>{description}</p>
      <audio controls className="custom-audio-player">
        <source src={audioFile} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

EpisodeDetails.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  audioFile: PropTypes.string.isRequired,
};

export default EpisodeDetails;
