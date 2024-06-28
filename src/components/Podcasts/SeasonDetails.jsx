// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import EpisodeDetails from './EpisodeDetails';

// Placeholder audio track URL
const placeholderAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export default function SeasonDetails({ season, selectedSeason, setSelectedSeason }) {
  const toggleEpisodes = (seasonId) => {
    setSelectedSeason(seasonId === selectedSeason ? null : seasonId);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{season.title}</h2>
      <button onClick={() => toggleEpisodes(season.id)}>
        {selectedSeason === season.id ? 'Hide Episodes' : 'Show Episodes'}
      </button>
      {selectedSeason === season.id && season.episodes.map((episode, index) => (
        <EpisodeDetails
          key={index}
          index={index + 1}
          title={episode.title}
          description={episode.description}
          audioFile={placeholderAudio}
        />
      ))}
    </div>
  );
}

SeasonDetails.propTypes = {
  season: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  selectedSeason: PropTypes.number,
  setSelectedSeason: PropTypes.func.isRequired,
};
