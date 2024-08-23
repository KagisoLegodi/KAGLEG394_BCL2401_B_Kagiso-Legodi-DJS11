/* eslint-disable no-undef */
// pages/PodcastsPage.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "../components/Utils/Header/index";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/Utils/Input/FileInput";

// Genre ID to Title mapping
const genreMap = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();
        const podcastsData = data.map((item) => ({
          id: item.id,
          title: item.title,
          displayImage: item.image,
          genres: item.genres.map(genreId => genreMap[genreId]),
          lastUpdated: item.last_updated,
          seasons: item.seasons,
        }));
        podcastsData.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(podcastsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (sortBy === "A-Z") {
      setPodcasts([...podcasts].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sortBy === "Z-A") {
      setPodcasts([...podcasts].sort((a, b) => b.title.localeCompare(a.title)));
    }
  }, [sortBy, podcasts]);

  const handleAddToFavourites = (podcast) => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!storedFavourites.find((item) => item.id === podcast.id)) {
      storedFavourites.push(podcast);
      localStorage.setItem("favourites", JSON.stringify(storedFavourites));
      toast.success(`${podcast.title} added to favourites!`);
    } else {
      toast.info(`${podcast.title} is already in favourites.`);
    }
  };

  let filteredPodcasts = podcasts.filter(
    (item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) &&
      (selectedGenre ? item.genres.includes(selectedGenre) : true)
  );

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Explore Shows</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />

        <div style={{ marginTop: "1rem" }}>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          >
            <option value="">All Categories</option>
            {Object.entries(genreMap).map(([id, title]) => (
              <option key={id} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => setSortBy("A-Z")}>Sort A-Z</button>
          <button onClick={() => setSortBy("Z-A")}>Sort Z-A</button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : filteredPodcasts.length > 0 ? (
          <div className="podcasts-layout" style={{ margin: "1.0rem" }}>
            {filteredPodcasts.map((item) => (
              <PodcastCard
                key={item.id}
                item={item}
                onAddToFavourites={handleAddToFavourites}
              />
            ))}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
        )}
      </div>
    </div>
  );
}
