import { Link } from "react-router-dom";

import "./styles.css";
export default function PodcastsCard(item) {
    // console.log(item.genre)
  return (
    <Link data={item} to={`/podcast/${item.id}`}>
      <div className="podcast-card">
        <img
          src={item.displayImage}
          alt={item.title}
          className="podcast-image"
        />
        <h4 className="podcast-title">{item.title}</h4>
      </div>
    </Link>
  );
}
