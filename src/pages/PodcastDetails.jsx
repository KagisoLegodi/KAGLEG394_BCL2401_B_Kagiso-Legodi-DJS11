/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";
import Header from "../components/Utils/Header/index";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Utils/Button/Button";
import { auth } from "../firebase";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails";

export default function PodcastDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          const data = await response.json();

          if (data) {
            console.log("Fetched Podcast Data:", data);
            setPodcast(data);
            setSeasons(data.seasons);
          } else {
            console.log("No such Podcast!");
            toast.error("No such Podcast!");
            navigate("/podcasts");
          }
        } catch (e) {
          toast.error(e.message);
        }
      };

      getData();
    }
  }, [id, navigate]);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "1rem",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser?.uid && (
                <Button
                  width={"200px"}
                  text={"Favourites"}
                  onClick={() => {
                    navigate(`/podcast/${id}/Favourites`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img src={podcast.image} alt={podcast.title} className="image-wrapper" />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Seasons</h1>
            {seasons.length > 0 ? (
              seasons.map((season, seasonIndex) => (
                <div key={seasonIndex}>
                  <h2>Season {seasonIndex + 1}</h2>
                  {season.episodes.length > 0 ? (
                    season.episodes.map((episode, episodeIndex) => (
                      <EpisodeDetails
                        key={episodeIndex}
                        index={episodeIndex + 1}
                        title={episode.title}
                        description={episode.description}
                      />
                    ))
                  ) : (
                    <p>No Episodes</p>
                  )}
                </div>
              ))
            ) : (
              <p>No Seasons</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
