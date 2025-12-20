import React from 'react';
import { TRACK_URIS } from '../config';
import { ArrowLeft } from 'lucide-react';

interface EmbedPlayerProps {
  onBack: () => void;
}

const EmbedPlayer: React.FC<EmbedPlayerProps> = ({ onBack }) => {
  // Helper to extract track ID from spotify:track:ID
  const getTrackId = (uri: string) => {
    const parts = uri.split(':');
    return parts.length === 3 ? parts[2] : null;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors group"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-white" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold">Listen Now</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {TRACK_URIS.map((uri, index) => {
            const trackId = getTrackId(uri);
            if (!trackId) return null;

            return (
              <div key={uri} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800">
                 <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Spotify Player ${index + 1}`}
                ></iframe>
              </div>
            );
          })}
        </div>

        {TRACK_URIS.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No tracks configured. Add track URIs to config.ts.
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            You are listening in <strong>Embed Mode</strong>.
            <button onClick={onBack} className="text-green-400 hover:underline ml-1">
              Login for the full 3D visualizer experience
            </button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmbedPlayer;
