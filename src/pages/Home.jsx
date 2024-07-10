// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PodcastCard from '../components/Podcasts/PodcastCard';

const HomePage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch the shows data from your API
    const fetchShows = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app'); // Replace with your actual API endpoint
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
      <h1>Recommended Shows</h1>
      <Slider {...settings}>
        {shows.map((show) => (
          <div key={show.id}>
            <PodcastCard item={show} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePage;
