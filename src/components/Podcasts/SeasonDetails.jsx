import PropTypes from "prop-types";
import EpisodeDetails from "./EpisodeDetails";
import "./SeasonDetails.css";

export default function SeasonDetails({ season, podcastId }) {
  return (
    <div className="season-details">
      {season.episodes.length > 0 ? (
        season.episodes.map((episode, episodeIndex) => (
          <div className="episode-card" key={episode.id}>
            <EpisodeDetails
              index={episodeIndex + 1}
              title={episode.title}
              description={episode.description}
              audioFile={
                episode.audioFile ||
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              }
              seasonImage={season.displayImage}
              episodeId={episode.id} // Pass episode ID
              podcastId={podcastId} // Pass podcast ID
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
    displayImage: PropTypes.string.isRequired,
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // Ensure id is included
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        audioFile: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  podcastId: PropTypes.string.isRequired, // Pass podcast ID as a prop
};
