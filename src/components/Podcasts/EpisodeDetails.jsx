import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function EpisodeDetails({
  index,
  title,
  description,
  audioFile,
  seasonImage,
  episodeId,
  podcastId,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedEpisodes =
      JSON.parse(localStorage.getItem("likedEpisodes")) || [];
    const liked = likedEpisodes.find((ep) => ep.id === episodeId);
    setIsLiked(!!liked);
  }, [episodeId]);

  const handleLikeToggle = () => {
    const likedEpisodes =
      JSON.parse(localStorage.getItem("likedEpisodes")) || [];
    if (isLiked) {
      const updatedEpisodes = likedEpisodes.filter((ep) => ep.id !== episodeId);
      localStorage.setItem("likedEpisodes", JSON.stringify(updatedEpisodes));
    } else {
      const newEpisode = {
        id: episodeId,
        title,
        description,
        file: audioFile,
        podcastId,
        season: index,
      };
      likedEpisodes.push(newEpisode);
      localStorage.setItem("likedEpisodes", JSON.stringify(likedEpisodes));
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="episode-details">
      <img
        src={seasonImage}
        alt={`Season image for ${title}`}
        className="season-image"
      />
      <h2>
        Episode {index}: {title}
      </h2>
      <p>{description}</p>
      <audio controls className="custom-audio-player">
        <source src={audioFile} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={handleLikeToggle} className="like-button">
        {isLiked ? (
          <AiFillHeart className="text-red-600 text-2xl" />
        ) : (
          <AiOutlineHeart className="text-gray-600 text-2xl" />
        )}
      </button>
    </div>
  );
}

EpisodeDetails.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  audioFile: PropTypes.string.isRequired,
  seasonImage: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  podcastId: PropTypes.string.isRequired, // Adding this prop to track podcast ID for favorites
};

export default EpisodeDetails;
