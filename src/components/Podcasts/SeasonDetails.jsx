import PropTypes from "prop-types";
import EpisodeDetails from "./EpisodeDetails";

export default function SeasonDetails({ season, podcastId }) {
  return (
    <div className="p-4 bg-dark-background text-light-text rounded-lg shadow-lg">
      {season.episodes.length > 0 ? (
        season.episodes.map((episode, episodeIndex) => (
          <div
            key={episode.id}
            className="bg-dark-background text-light-text rounded-lg shadow-md mb-4 p-4 transition-transform transform hover:scale-105"
          >
            <EpisodeDetails
              index={episodeIndex + 1}
              title={episode.title}
              description={episode.description}
              audioFile={
                episode.audioFile ||
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              }
              episodeImage={episode.image} // Pass episode image
              episodeId={episode.id} // Pass episode ID
              podcastId={podcastId} // Pass podcast ID
            />
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">No Episodes</p>
      )}
    </div>
  );
}

SeasonDetails.propTypes = {
  season: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    displayImage: PropTypes.string, // This is no longer used
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        audioFile: PropTypes.string,
        image: PropTypes.string.isRequired, // Ensure image is included
      })
    ).isRequired,
  }).isRequired,
  podcastId: PropTypes.string.isRequired,
};
