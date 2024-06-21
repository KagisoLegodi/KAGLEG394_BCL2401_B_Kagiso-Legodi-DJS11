import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        const data = await response.json();
        const podcastsData = data.map((item) => ({
          key: item.id,
          id: item.id,
          title: item.title,
          displayImage: item.image,
          genre: genreMap[item.genres], // Map genre ID to title
          genreId: item.genre, // keep genre ID for filtering
        }));
        // Sort podcasts alphabetically by title
        podcastsData.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(podcastsData);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  console.log(podcasts);

  let filteredPodcasts = podcasts.filter(
    (item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) &&
      (selectedGenre ? item.genre === selectedGenre : true)
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

        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-layout" style={{ margin: "1.0rem" }}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
        )}
      </div>
    </div>
  );
}
