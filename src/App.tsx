import React, { useState, useEffect, useMemo } from 'react';
import { useSpotifyPlayer } from './hooks/useSpotifyPlayer';
import { fetchAudioFeatures, startPlayback } from './utils';
import type { AudioFeatures } from './types';
import { CLIENT_ID, REDIRECT_URI, SCOPES, TRACK_URIS } from './config';

import LoginScreen from './components/LoginScreen';
import EmbedPlayer from './components/EmbedPlayer';
import Visualizer from './components/Visualizer';
import PlayerUI from './components/PlayerUI';

type ViewMode = 'landing' | 'embed' | 'premium';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures | null>(null);
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false);

  // On mount, check for token in localStorage or URL hash from Spotify redirect
  useEffect(() => {
    const hash = window.location.hash;

    // Check if we're returning from auth
    if (hash) {
      window.location.hash = ''; // Clean the URL
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const expiresIn = params.get('expires_in');

      if (accessToken && expiresIn) {
        const newExpiryTime = new Date().getTime() + parseInt(expiresIn, 10) * 1000;
        localStorage.setItem('spotify_token', accessToken);
        localStorage.setItem('spotify_token_expiry', newExpiryTime.toString());
        setToken(accessToken);
        setViewMode('premium');
        return;
      }
    }

    // Check stored token
    const storedToken = localStorage.getItem('spotify_token');
    const expiryTime = localStorage.getItem('spotify_token_expiry');

    if (storedToken && expiryTime && new Date().getTime() < parseInt(expiryTime, 10)) {
      setToken(storedToken);
      setViewMode('premium');
    } else {
      localStorage.removeItem('spotify_token');
      localStorage.removeItem('spotify_token_expiry');
      // viewMode defaults to 'landing'
    }
  }, []);

  const player = useSpotifyPlayer(token);
  const { currentTrack, isPaused, error, deviceId, isActive } = player;

  const handleDisconnect = () => {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiry');
    setToken(null);
    setAudioFeatures(null);
    setHasPlaybackStarted(false);
    setViewMode('landing');
  };

  const handleLogin = () => {
    if (CLIENT_ID === 'YOUR_SPOTIFY_CLIENT_ID') {
        // The UI will show a message, but this is a fallback.
        console.error('Spotify Client ID is not configured in config.ts');
        return;
    }
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'token',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(' '),
    })}`;
    window.location.href = authUrl;
  };

  const handleListenNow = () => {
    setViewMode('embed');
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
  };

  // Effect to auto-play the band's playlist
  useEffect(() => {
    if (token && deviceId && !isActive && !hasPlaybackStarted && viewMode === 'premium') {
      // Only try to start playback once the device is ready and if the player isn't already active.
      startPlayback(token, deviceId, TRACK_URIS);
      setHasPlaybackStarted(true); // Prevent re-triggering if user pauses/plays.
    }
  }, [token, deviceId, isActive, hasPlaybackStarted, viewMode]);

  // Effect to handle auth errors from the player hook
  useEffect(() => {
    if (error && (error.includes('Authentication Failed') || error.includes('Account Error'))) {
      const timer = setTimeout(() => {
        handleDisconnect();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Effect to fetch audio features for the current track
  useEffect(() => {
    if (currentTrack?.id && token) {
      let isCancelled = false;
      const getFeatures = async () => {
        const features = await fetchAudioFeatures(currentTrack.id, token);
        if (!isCancelled) {
          setAudioFeatures(features);
        }
      };
      getFeatures();
      return () => { isCancelled = true; };
    } else {
      setAudioFeatures(null);
    }
  }, [currentTrack?.id, token]);

  const controls = useMemo(() => ({
    togglePlay: player.togglePlay,
    nextTrack: player.nextTrack,
    previousTrack: player.previousTrack,
  }), [player.togglePlay, player.nextTrack, player.previousTrack]);

  // RENDER LOGIC

  // 1. Embed Mode
  if (viewMode === 'embed') {
    return <EmbedPlayer onBack={handleBackToLanding} />;
  }

  // 2. Landing / Login Mode (if no token or explicitly in landing mode)
  if (!token || viewMode === 'landing') {
    const isConfigured = CLIENT_ID !== 'YOUR_SPOTIFY_CLIENT_ID';
    const loginError = error && (error.includes('Authentication Failed') || error.includes('Account Error')) ? error : null;
    return (
      <LoginScreen
        onLogin={handleLogin}
        onListenNow={handleListenNow}
        error={loginError}
        isConfigured={isConfigured}
      />
    );
  }

  // 3. Premium Mode (Visualizer + Player)
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Visualizer isPlaying={!isPaused} features={audioFeatures} />
      <PlayerUI
        status={player.status}
        isActive={player.isActive}
        isPaused={isPaused}
        currentTrack={currentTrack}
        onDisconnect={handleDisconnect}
        controls={controls}
      />
    </div>
  );
};

export default App;
