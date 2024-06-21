import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import UploadPodcast from "./pages/UploadPodcast"
import PodcastsPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";

export default function App() {
  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <ToastContainer />
      <Router>
        <div className="theme-toggle">
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}