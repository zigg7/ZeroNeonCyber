# Zero: Cyberpunk AI Web Experience

![Zero Banner](https://github.com/zigg7/ZeroNeonCyber/blob/main/ZEROAI.png)

## Overview

Zero is a modern web application featuring a sentient AI character from a 1980s cyberpunk universe. This project combines retro aesthetics with modern web technologies to create an engaging narrative experience transitioning into an interactive AI chat interface.

## ✨ Features

- **Immersive Retro Homepage**
  - CRT screen effect with scanlines and flicker
  - Auto-playing ambient synthwave soundtrack (toggleable)
  - Terminal-style narrative introduction

- **Interactive Navigation Experience**
  - Scroll-triggered transition effects using Framer Motion
  - "Access Chat" button with animations
  - Dynamic page transitions with optimized loading

- **Cyberpunk Chat Interface**
  - Neon gradient UI with purple/cyan color schemes
  - Terminal-style message bubbles with animations
  - Real-time message updates
  - AI-powered responses via Gemini API

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase
- **AI Integration:** Gemini API
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Supabase account
- Gemini API key

## 🚀 Deployment to Vercel

1. **Fork or Clone the Repository**
   ```bash
   git clone <repository-url>
   cd zero-cyberpunk-ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   In your Vercel project settings, add the following environment variables:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_API_KEY`: Your Supabase service role key
   - `GEMINI_API_KEY`: Your Google Gemini API key

4. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the build settings
   - Deploy and your app will be live!

## 🎮 Local Development

1. Create a `.env` file in the project root with the following variables:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_API_KEY=your_supabase_api_key
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/)
- [Google Gemini](https://ai.google.dev/)
- Inspiration from cyberpunk classics