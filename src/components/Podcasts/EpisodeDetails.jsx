
import PropTypes from 'prop-types';

export default function EpisodeDetails({ index, title, description}) {
    
    return (
    
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "left", marginBottom: 0 }}>
          {index}. {title}
        </h1>
        <p style={{ marginLeft: "1.5rem" }} className="podcast-description ">
          {description}
        </p>
      </div>
    );
  }
  EpisodeDetails.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    audioFile: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

