
import { useState, useEffect, useRef, useCallback } from 'react';
import type { SpotifyPlayer, PlaybackState, Track } from '../types.ts';

const SCRIPT_SRC = 'https://sdk.scdn.co/spotify-player.js';

export const useSpotifyPlayer = (token: string | null) => {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const playerRef = useRef<SpotifyPlayer | null>(null);
  
  const [playerState, setPlayerState] = useState<{
    isActive: boolean;
    isPaused: boolean;
    currentTrack: Track | null;
    status: string;
    error: string | null;
    deviceId: string | null;
  }>({
    isActive: false,
    isPaused: true,
    currentTrack: null,
    status: 'Initializing...',
    error: null,
    deviceId: null,
  });

  // 1. Load SDK script
  useEffect(() => {
    if (window.Spotify) {
      setIsSdkReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    
    window.onSpotifyWebPlaybackSDKReady = () => {
      setIsSdkReady(true);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // 2. Initialize Player
  useEffect(() => {
    if (!isSdkReady || !token) {
      return;
    }

    if (playerRef.current) {
        playerRef.current.disconnect();
    }

    const playerName = `Audio Visualizer (${Math.random().toString(16).slice(2, 8)})`;
    const player = new window.Spotify.Player({
      name: playerName,
      getOAuthToken: cb => cb(token),
      volume: 0.5,
    });

    playerRef.current = player;

    const handleStateChange = (state: PlaybackState | null) => {
      if (!state) {
        setPlayerState(s => ({ ...s, isActive: false, currentTrack: null, status: 'Player is idle. Play music on Spotify.' }));
        return;
      }
      setPlayerState(s => ({
        ...s,
        isActive: true,
        isPaused: state.paused,
        currentTrack: state.track_window.current_track,
      }));
    };

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setPlayerState(s => ({ ...s, deviceId: device_id, status: `Ready. Select "${playerName}"`, error: null }));
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      setPlayerState(s => ({ ...s, status: 'Device offline', deviceId: null, isActive: false }));
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error('Initialization Error:', message);
      setPlayerState(s => ({ ...s, error: `Initialization Failed: ${message}` }));
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error('Authentication Error:', message);
      setPlayerState(s => ({ ...s, error: `Authentication Failed: ${message}. Please use a new token.` }));
    });

    player.addListener('account_error', ({ message }) => {
      console.error('Account Error:', message);
      setPlayerState(s => ({ ...s, error: `Account Error: ${message}. Spotify Premium is required.` }));
    });

    player.addListener('player_state_changed', handleStateChange);

    player.connect().then(success => {
      if (!success) {
        setPlayerState(s => ({ ...s, error: 'Failed to connect. Check internet or Premium status.' }));
      }
    });

    return () => {
      if (playerRef.current) {
        player.removeListener('ready');
        player.removeListener('not_ready');
        player.removeListener('initialization_error');
        player.removeListener('authentication_error');
        player.removeListener('account_error');
        player.removeListener('player_state_changed');
        player.disconnect();
        playerRef.current = null;
      }
    };
  }, [isSdkReady, token]);

  const controls = {
    togglePlay: useCallback(() => playerRef.current?.togglePlay(), []),
    nextTrack: useCallback(() => playerRef.current?.nextTrack(), []),
    previousTrack: useCallback(() => playerRef.current?.previousTrack(), []),
  };

  return { ...playerState, ...controls };
};
