import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Loader2 } from 'lucide-react';
import type { Track } from '../types';

interface PlayerUIProps {
  status: string;
  isActive: boolean;
  isPaused: boolean;
  currentTrack: Track | null;
  onDisconnect: () => void;
  controls: {
    togglePlay: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
  };
}

const PlayerUI: React.FC<PlayerUIProps> = ({
  status,
  isActive,
  isPaused,
  currentTrack,
  onDisconnect,
  controls,
}) => {
  const { togglePlay, nextTrack, previousTrack } = controls;

  return (
    <div className="relative z-10 flex flex-col items-center justify-between h-screen p-4 sm:p-6 md:p-12 text-white font-sans select-none">
      {/* Header */}
      <header className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}
            title={isActive ? 'Active' : 'Inactive'}
          />
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider truncate max-w-[200px] sm:max-w-xs">
            {status}
          </span>
        </div>
        <button
          onClick={onDisconnect}
          className="text-xs text-gray-400 hover:text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-colors"
        >
          Disconnect
        </button>
      </header>

      {/* Track Info */}
      <main className="flex flex-col items-center text-center max-w-2xl w-full my-8">
        {currentTrack ? (
          <>
            <div className={`relative group mb-6 sm:mb-8 transition-all duration-700 ${isPaused ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse" style={{ animationDuration: '5s' }}></div>
              <img
                src={currentTrack.album.images[0]?.url}
                alt={currentTrack.album.name}
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-lg shadow-2xl object-cover"
                width="320"
                height="320"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-2 drop-shadow-lg">
              {currentTrack.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
              {currentTrack.artists.map(a => a.name).join(', ')}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <Loader2 className="w-12 h-12 mb-4 animate-spin text-gray-500" />
            <p className="text-xl font-light">Connecting to Spotify...</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs text-center">
              If music doesn't start, open Spotify and transfer playback to the 'Audio Visualizer' device.
            </p>
          </div>
        )}
      </main>

      {/* Controls */}
      <footer className="w-full max-w-md bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-around">
          <button
            onClick={previousTrack}
            className="p-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
            aria-label="Previous Track"
            disabled={!isActive}
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="p-5 sm:p-6 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20 disabled:opacity-50 disabled:scale-100"
            aria-label={isPaused ? 'Play' : 'Pause'}
            disabled={!isActive}
          >
            {isPaused ? (
              <Play size={32} fill="currentColor" className="ml-1" />
            ) : (
              <Pause size={32} fill="currentColor" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="p-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
            aria-label="Next Track"
            disabled={!isActive}
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PlayerUI;
