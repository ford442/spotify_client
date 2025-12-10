# Spotify Audio Visualizer

A dynamic, generative art visualizer for Spotify. Connect your premium account to see your music come to life with visuals that react to the track's tempo, energy, and mood.

## 🎵 Current Status

This application currently uses **Spotify Web Playback SDK** which provides:
- ✅ Full track playback with real-time audio visualization
- ✅ Rich, dynamic visual effects synchronized to music
- ⚠️ **Requires Spotify Premium account** (SDK limitation)
- ⚠️ **Requires user authentication** (OAuth login)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Spotify Premium account
- Spotify Developer App credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ford442/spotify_client.git
   cd spotify_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Spotify App**

   a. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
   
   b. Create a new app (or use existing)
   
   c. Copy your **Client ID**
   
   d. Add Redirect URI in app settings:
      - For local development: `http://localhost:5173/`
      - For production: Your deployed URL

4. **Update Configuration**
   
   Edit `src/config.ts`:
   ```typescript
   export const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID_HERE';
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 📖 Understanding Spotify API Integration

### Current Limitations

The Web Playback SDK (currently used) has these requirements:
- 🔒 **Spotify Premium**: Only Premium subscribers can use the app
- 🔑 **Authentication**: All users must sign in with Spotify
- 🎯 **Target Audience**: Limited to existing Premium users

### Want to Reach More Users?

**👉 See [SPOTIFY_INTEGRATION_PLAN.md](./SPOTIFY_INTEGRATION_PLAN.md)** for comprehensive analysis of:
- Current implementation and limitations
- Alternative Spotify API approaches
- Recommended hybrid strategy (embeds + premium mode)
- Step-by-step implementation guide
- How to maximize access for all users

The plan document explains:
- ✨ How to add an embed player (no login required, works for everyone)
- ✨ How to implement a hybrid approach (casual + premium experiences)
- ✨ Trade-offs between different Spotify API options
- ✨ Implementation stages with time estimates

## 🎨 Features

### Current Features (Premium Mode)
- 🎵 Real-time audio visualization
- 🎨 Dynamic generative art reacting to music
- 📊 Audio feature analysis (tempo, energy, valence, etc.)
- 🎮 Playback controls (play, pause, next, previous)
- 💿 Album art and track information display
- 🔄 Automatic playlist playback

### Potential Features (See Integration Plan)
- 🌐 Public embed player (no login)
- 👥 Access for non-Premium users (30-second previews)
- 📱 Mobile-friendly embeds
- 🎭 Hybrid mode (basic + premium experiences)

## 📁 Project Structure

```
spotify_client/
├── src/
│   ├── components/
│   │   ├── LoginScreen.tsx    # Authentication UI
│   │   ├── PlayerUI.tsx        # Playback controls
│   │   └── Visualizer.tsx      # Audio visualization
│   ├── hooks/
│   │   └── useSpotifyPlayer.ts # Web Playback SDK hook
│   ├── App.tsx                 # Main application
│   ├── config.ts               # Configuration (Client ID, URIs)
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # API utilities
├── SPOTIFY_INTEGRATION_PLAN.md # 📖 Detailed API integration guide
└── package.json
```

## 🔧 Configuration Options

### `src/config.ts`

```typescript
// Your Spotify app Client ID
export const CLIENT_ID = 'YOUR_CLIENT_ID';

// Must match Redirect URI in Spotify Dashboard
export const REDIRECT_URI = window.location.origin + window.location.pathname;

// Your songs to play (add more here!)
export const TRACK_URIS = [
  'spotify:track:1XdAuz3tbAVECAj8GgpVhc',
  // Add more tracks...
];

// OAuth scopes (permissions)
export const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
];
```

### Adding Your Songs

Get Spotify URIs for your songs:
1. Open Spotify Desktop/Web
2. Right-click on a track
3. Share → Copy Spotify URI
4. Add to `TRACK_URIS` array in `config.ts`

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Audio**: Spotify Web Playback SDK
- **API**: Spotify Web API
- **Icons**: Lucide React

## 🔐 Security Notes

- ✅ Client ID is safe to commit (it's public)
- ❌ Never commit Client Secret (not used in this app)
- ✅ Tokens stored in localStorage (acceptable for Implicit Grant)
- ✅ Tokens automatically expire and require re-authentication

## 📊 API Usage

### Web Playback SDK
- Streams music directly in browser
- Requires Premium account
- Full playback control

### Spotify Web API
- Fetches audio features (tempo, energy, etc.)
- Fetches track metadata
- Starts playback on devices

## 🎯 Next Steps

### Immediate Improvements
1. **Review the Integration Plan** - See `SPOTIFY_INTEGRATION_PLAN.md`
2. **Decide Your Strategy** - Premium-only vs. Hybrid approach
3. **Implement Hybrid Mode** - Add embed player for universal access
4. **Enhance Documentation** - Add user-facing feature explanations

### Future Enhancements
- [ ] Add embed player mode (no login required)
- [ ] Implement hybrid user experience
- [ ] Add more visualization modes
- [ ] Support for playlists
- [ ] Save visualization preferences
- [ ] Mobile app version
- [ ] Backend for token refresh

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### "This app requires Spotify Premium"
- The Web Playback SDK only works with Premium accounts
- See `SPOTIFY_INTEGRATION_PLAN.md` for alternatives

### "Authentication Failed"
- Check that your Client ID is correct in `config.ts`
- Verify Redirect URI matches in Spotify Dashboard
- Try clearing localStorage and logging in again

### "Failed to start playback"
- Make sure track URIs are valid
- Check that you have an active internet connection
- Verify Spotify servers are operational

### "Configuration Needed" error
- Update `CLIENT_ID` in `src/config.ts`
- Add Redirect URI in Spotify Developer Dashboard

## 📚 Resources

- [Spotify Developer Documentation](https://developer.spotify.com/documentation/)
- [Web Playback SDK Guide](https://developer.spotify.com/documentation/web-playback-sdk/)
- [Web API Reference](https://developer.spotify.com/documentation/web-api/)
- [Spotify Dashboard](https://developer.spotify.com/dashboard/)

## 💡 Questions?

Read the **[Integration Plan](./SPOTIFY_INTEGRATION_PLAN.md)** for:
- Detailed explanation of current approach
- Alternative strategies for maximum user access
- Implementation guides and recommendations
- FAQ about Spotify API limitations

---

**Made with ❤️ for music lovers**
