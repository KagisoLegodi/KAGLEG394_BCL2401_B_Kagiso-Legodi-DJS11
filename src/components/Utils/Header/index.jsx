import "./styles.css";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="navbar">
      <div className="links">
        
        <Link to="/" className={currentPath === "/signup" ? "active" : ""}>
          Signup
        </Link>
        <Link to="/home" className={currentPath === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/podcasts" className={currentPath === "/podcasts" ? "active" : ""}>
          Podcasts
        </Link>
        <Link to="/favourites" className={currentPath === "/favourites" ? "active" : ""}>
          Favourites
        </Link>
        <Link to="/profile" className={currentPath === "/profile" ? "active" : ""}>
          Profile
        </Link>
      </div>
    </div>
  );
}
