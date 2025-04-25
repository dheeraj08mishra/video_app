# 🎥 YouTube Clone App

A full-featured YouTube clone built with React, Redux, Tailwind CSS, and YouTube Data API v3. This app replicates core YouTube functionality, including video browsing, category filtering, infinite scroll, watch history, and live chat simulation.

## 🚀 Live Demo

[🔗 Visit the App](https://video-app-4c078.web.app/)

---

## 🛠️ Tech Stack

- **React** – Frontend Framework
- **Redux Toolkit** – Global State Management
- **Tailwind CSS** – Utility-First Styling
- **Firebase** – Hosting & User Authentication
- **YouTube Data API v3** – Video data
- **IntersectionObserver API** – Infinite Scrolling

---

## ✨ Features

- 🔍 Live Video Search with Debounced Suggestions
- 🎞️ Browse Trending Videos with Infinite Scroll
- 🎯 Filter Videos by Categories (e.g., Music, News, Gaming)
- 🌓 Light / Dark Mode Toggle
- 🧠 Watch History Tracking & Sync (via Firebase)
- 💬 Simulated Live Chat with Typing Animations
- 🎭 Responsive UI across devices
- 🖼️ Skeleton Loaders for Smooth UX
- ⚠️ Graceful Error Handling

## 🔧 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/dheeraj08mishra/youtube_clone_app.git

# 2. Install dependencies
npm install

# 3. Add your .env file
REACT_APP_YOUTUBE_API_KEY=your_key_here

# 4. Start the app
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root with:

```env
REACT_APP_YOUTUBE_API_KEY=your_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_key
```

---

---

## 📄 License

This project is licensed under the MIT License.
