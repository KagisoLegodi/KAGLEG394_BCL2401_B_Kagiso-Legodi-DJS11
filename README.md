# Podcast App

Welcome to the Podcast App! This application allows users to explore, search, and manage podcasts. Users can view podcast details, seasons, and episodes, and add their favorite podcasts, seasons, and genres to their favorites list.

## Table of Contents

[LIVE DEMO]https://goat-cast.vercel.app/

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies](#technologies)
5. [Contributing](#contributing)

## Features

- **Explore Podcasts:** Browse and search for podcasts by title or genre.
- **Podcast Details:** View detailed information about each podcast, including seasons and episodes.
- **Favorites:** Add podcasts, seasons, and genres to your favorites list.
- **Sorting and Filtering:** Sort podcasts alphabetically and filter by genre.
- **Authentication:** Log in to save your favorites and access additional features.

## Installation

To get started with the Podcast App, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/podcast-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd podcast-app
   ```

3. **Install dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Firebase configuration:

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

5. **Run the application:**

   Start the development server with:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

### Exploring Podcasts

- **Home Page:** View a carousel of suggested podcasts and search for specific titles.
- **Podcast Details Page:** Click on a podcast to view detailed information, including seasons and episodes.

### Favorites

- **Adding to Favorites:** On the Podcast Details page, click the "Favourites" button to add the podcast to your favorites list.
- **Viewing Favorites:** Access your favorites list from the navigation menu.

### Authentication

- **Login:** Use the login form to authenticate with Firebase. After logging in, you can access and manage your favorites list.

### Sorting and Filtering

- **Sort Podcasts:** Use the sort buttons to arrange podcasts alphabetically (A-Z or Z-A).
- **Filter by Genre:** Select a genre from the dropdown menu to filter podcasts accordingly.

## Technologies

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore)
- **API:** [Podcast API](https://podcast-api.netlify.app)

## Contributing

We welcome contributions to improve the Podcast App! Please follow these guidelines:

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit your changes:**

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/your-feature
   ```

5. **Create a pull request.**



