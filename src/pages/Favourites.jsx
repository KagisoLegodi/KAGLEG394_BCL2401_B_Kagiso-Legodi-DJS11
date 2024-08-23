import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineDelete } from "react-icons/ai";

const SORT_OPTIONS = {
  AZ: "A-Z",
  ZA: "Z-A",
  MOST_RECENT: "Most Recent",
  OLDEST: "Oldest",
};

const FavouritesPage = () => {
  const [likedEpisodes, setLikedEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState(SORT_OPTIONS.AZ);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedEpisodes = async () => {
      setIsLoading(true);
      try {
        const storedLikedEpisodes =
          JSON.parse(localStorage.getItem("likedEpisodes")) || [];
        setLikedEpisodes(storedLikedEpisodes);
      } catch (error) {
        console.error("Error loading liked episodes:", error);
        setLikedEpisodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedEpisodes();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (document.querySelector('audio[data-playing="true"]')) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleUnlikeEpisode = (episodeId) => {
    setLikedEpisodes((prevLikedEpisodes) => {
      const updatedLikedEpisodes = prevLikedEpisodes.filter(
        (ep) => ep.id !== episodeId
      );
      localStorage.setItem(
        "likedEpisodes",
        JSON.stringify(updatedLikedEpisodes)
      );
      return updatedLikedEpisodes;
    });
  };

  const handleRemoveAllLikedEpisodes = () => {
    if (window.confirm("Are you sure you want to remove all liked episodes?")) {
      setLikedEpisodes([]);
      localStorage.removeItem("likedEpisodes");
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your entire listening history?"
      )
    ) {
      setLikedEpisodes([]);
      localStorage.removeItem("likedEpisodes");
      localStorage.removeItem("listenedEpisodes");
      // Reset any other relevant storage items
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortEpisodes = (episodes, order) => {
    switch (order) {
      case SORT_OPTIONS.AZ:
        return [...episodes].sort((a, b) => a.title.localeCompare(b.title));
      case SORT_OPTIONS.ZA:
        return [...episodes].sort((a, b) => b.title.localeCompare(a.title));
      case SORT_OPTIONS.MOST_RECENT:
        return [...episodes].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
      case SORT_OPTIONS.OLDEST:
        return [...episodes].sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
      default:
        return episodes;
    }
  };

  const groupEpisodesByShowAndSeason = (episodes) => {
    const grouped = episodes.reduce((acc, episode) => {
      const key = `${episode.podcastTitle} - Season ${episode.season}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(episode);
      return acc;
    }, {});
    return grouped;
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredEpisodes =
    selectedGenre === "All"
      ? likedEpisodes
      : likedEpisodes.filter((episode) => episode.genre === selectedGenre);

  const sortedEpisodes = sortEpisodes(filteredEpisodes, sortOrder);
  const groupedEpisodes = groupEpisodesByShowAndSeason(sortedEpisodes);

  const handleAudioPlay = (event) => {
    event.target.dataset.playing = "true";
  };

  const handleAudioPause = (event) => {
    event.target.dataset.playing = "false";
  };

  return (
    <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/podcasts")}
            className="mr-4 px-4 py-2 rounded-full border bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Back to Podcasts
          </button>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            Favourites
          </h1>
        </div>
        {likedEpisodes.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={handleRemoveAllLikedEpisodes}
              className="px-4 py-2 rounded-full border bg-red-600 text-white flex items-center hover:bg-red-700 transition-colors"
            >
              <AiOutlineDelete className="mr-2" aria-label="Remove All" />
              Remove All
            </button>
            <button
              onClick={handleResetAll}
              className="px-4 py-2 rounded-full border bg-yellow-600 text-white flex items-center hover:bg-yellow-700 transition-colors"
            >
              Reset All
            </button>
          </div>
        )}
      </header>

      <div className="mb-4 flex space-x-2">
        {Object.values(SORT_OPTIONS).map((option) => (
          <button
            key={option}
            onClick={() => handleSortChange(option)}
            className={`px-4 py-2 rounded-full border ${
              sortOrder === option
                ? "bg-blue-900 text-white"
                : "bg-white text-blue-900"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => handleGenreChange(e.target.value)}
          className="px-4 py-2 rounded-full border"
        >
          <option value="All">All Genres</option>
          {/* Add other genre options here */}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      ) : Object.keys(groupedEpisodes).length === 0 ? (
        <p className="text-gray-700">No liked episodes found.</p>
      ) : (
        <section>
          {Object.keys(groupedEpisodes).map((key) => (
            <div key={key} className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{key}</h2>
              <ul className="space-y-4">
                {groupedEpisodes[key].map((episode) => (
                  <li
                    key={episode.id}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div className="flex flex-col flex-grow mr-4">
                      <Link
                        to={`/podcast/${episode.podcastId}`}
                        className="font-bold text-gray-900"
                      >
                        {episode.title}
                      </Link>
                      <p className="text-gray-700 mb-2">
                        {episode.description}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Season: {episode.season}, Episode: {episode.episode}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Added on: {new Date(episode.addedAt).toLocaleString()}
                      </p>
                      <audio
                        controls
                        src={episode.file}
                        className="w-full"
                        onPlay={handleAudioPlay}
                        onPause={handleAudioPause}
                      ></audio>
                    </div>
                    <button
                      onClick={() => handleUnlikeEpisode(episode.id)}
                      className="ml-4 p-2"
                    >
                      <AiFillHeart
                        className="text-red-600 text-2xl"
                        aria-label="Unlike Episode"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default FavouritesPage;
