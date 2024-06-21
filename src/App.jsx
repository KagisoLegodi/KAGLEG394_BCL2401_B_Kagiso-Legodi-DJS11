import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import UploadPodcast from "./pages/UploadPodcast"
import PodcastsPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadPodcast />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/podcasts/:id" element={<PodcastDetailsPage />} />
      </Routes>
    </Router>
  );
}