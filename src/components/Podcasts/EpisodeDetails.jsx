import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function EpisodeDetails({
  index,
  title,
  description,
  audioFile,
  episodeImage, // Changed from seasonImage
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
    <div className="flex flex-col p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <img
        src={episodeImage}
        alt={`Episode image for ${title}`}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">
        Episode {index}: {title}
      </h2>
      <p className="text-sm mb-4">{description}</p>
      <audio controls className="w-full bg-gray-700 rounded-lg">
        <source src={audioFile} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={handleLikeToggle}
        className="mt-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
      >
        {isLiked ? (
          <AiFillHeart className="text-red-600 text-2xl" />
        ) : (
          <AiOutlineHeart className="text-gray-400 text-2xl" />
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
  episodeImage: PropTypes.string.isRequired, // Updated prop type
  episodeId: PropTypes.string.isRequired,
  podcastId: PropTypes.string.isRequired,
};

export default EpisodeDetails;
