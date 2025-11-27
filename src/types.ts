/* eslint-disable @typescript-eslint/no-explicit-any */
export type SpotifyPlayer = {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: (event: string, cb: (arg: any) => void) => void;
  removeListener: (event: string, cb?: (arg: any) => void) => void;
  getCurrentState: () => Promise<PlaybackState | null>;
  setVolume: (volume: number) => Promise<void>;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  getVolume: () => Promise<number>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
};

export type PlaybackState = {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: Track;
    next_tracks: Track[];
    previous_tracks: Track[];
  };
};

export type Track = {
  id: string;
  name: string;
  uri: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
};

export type AudioFeatures = {
  tempo: number;
  energy: number;
  danceability: number;
  valence: number;
  instrumentalness: number;
  liveness: number;
};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => SpotifyPlayer;
    };
  }
}
