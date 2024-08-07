import PropTypes from 'prop-types';

function EpisodeDetails({ index, title, description, audioFile, seasonImage }) {
  return (
    <div className="episode-details">
      <img src={seasonImage} alt={`Season image for ${title}`} className="season-image" />
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
  seasonImage: PropTypes.string.isRequired, // Add this line
};

export default EpisodeDetails;
