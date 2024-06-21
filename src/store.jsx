import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";
//  import episodeReducer from "./slices/slices/episodeSlice";

// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    user: userReducer,
    podcast: podcastReducer,
    // episode: episodeReducer,
  },
});
