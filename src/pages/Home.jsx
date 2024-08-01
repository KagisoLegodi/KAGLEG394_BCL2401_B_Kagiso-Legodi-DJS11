// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PodcastCard from '../components/Podcasts/PodcastCard';
import Header from '../components/Utils/Header'; // Adjust the import path as necessary

const HomePage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app'); // Replace with your actual API endpoint
        const data = await response.json();

        const podcastsData = data.map((item) => ({
          id: item.id,
          title: item.title,
          displayImage: item.image,
          genres: item.genres.map(genreId => genreMap[genreId]), // Convert genres to strings and provide default
          episodes: item.episodes ?? 0, // Default value if undefined
          seasons: item.seasons ?? 0, // Default value if undefined
          lastUpdated: item.last_updated ?? 'N/A', // Default value if undefined
        }));

        setShows(podcastsData);
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch operation is complete
      }
    };

    fetchShows();
  }, [genreMap]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Remove the slide buttons
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home-page">
      <Header />
      <h1>Recommended Shows</h1>
      {loading ? (
        <div>Loading...</div> // Replace with your loading indicator component or message
      ) : (
        <Slider {...settings}>
          {shows.map((show) => (
            <div key={show.id}>
              <PodcastCard 
                item={show}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomePage;
