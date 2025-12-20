import React from 'react';
import { Music, AlertCircle, PlayCircle, LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onListenNow: () => void;
  error?: string | null;
  isConfigured: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onListenNow, error, isConfigured }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex justify-center mb-6">
          <Music className="w-16 h-16 text-green-400" />
        </div>
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-100">Audio Visualizer</h1>
        <p className="text-gray-400 text-center mb-8 text-lg">
          Experience the music. Choose your listening mode.
        </p>

        {!isConfigured && (
            <div className="mb-6 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg text-yellow-200 text-sm flex items-start gap-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span><strong>Configuration Needed:</strong> The developer needs to set the Spotify Client ID in the <code>config.ts</code> file for login to work.</span>
            </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option 1: Listen Now (Embeds) */}
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-green-500/50 transition-colors flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <PlayCircle className="text-green-400" />
              Listen Now
            </h3>
            <p className="text-gray-300 text-sm mb-6 flex-grow">
              Instantly listen to tracks using Spotify Embeds. No login required. Perfect for quick listening.
            </p>
            <button
              onClick={onListenNow}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
            >
              Start Listening
            </button>
          </div>

          {/* Option 2: Full Experience (Premium) */}
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-green-500/50 transition-colors flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <LogIn className="text-green-400" />
              Full Experience
            </h3>
            <p className="text-gray-300 text-sm mb-6 flex-grow">
              Immersive 3D visualizer synchronized to the music. Requires <strong>Spotify Premium</strong> and login.
            </p>
            <button
              onClick={onLogin}
              disabled={!isConfigured}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
            >
              Login with Spotify
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-200 text-sm flex items-start gap-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error} Please try logging in again.</span>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Powered by Spotify API. Music copyright belongs to respective owners.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
