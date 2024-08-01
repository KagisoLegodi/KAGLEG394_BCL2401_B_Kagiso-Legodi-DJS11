// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [favoriteSeasons, setFavoriteSeasons] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);

  useEffect(() => {
    const episodes = JSON.parse(localStorage.getItem("favoriteEpisodes")) || [];
    const seasons = JSON.parse(localStorage.getItem("favoriteSeasons")) || [];
    const genres = JSON.parse(localStorage.getItem("favoriteGenres")) || [];

    setFavoriteEpisodes(episodes);
    setFavoriteSeasons(seasons);
    setFavoriteGenres(genres);
  }, []);

  return (
    <div className="favorites-page">
      <h1>Favorite Episodes</h1>
      <ul>
        {favoriteEpisodes.map((episode, index) => (
          <li key={index}>{episode.title}</li>
        ))}
      </ul>

      <h1>Favorite Seasons</h1>
      <ul>
        {favoriteSeasons.map((season, index) => (
          <li key={index}>{season.title}</li>
        ))}
      </ul>

      <h1>Favorite Genres</h1>
      <ul>
        {favoriteGenres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
