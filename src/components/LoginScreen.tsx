import React from 'react';
import { Music, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  error?: string | null;
  isConfigured: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error, isConfigured }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex justify-center mb-6">
          <Music className="w-16 h-16 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-100">Audio Visualizer</h1>
        <p className="text-gray-400 text-center mb-6">
          Experience music like never before.
        </p>

        {!isConfigured && (
            <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg text-yellow-200 text-sm flex items-start gap-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span><strong>Configuration Needed:</strong> The developer needs to set the Spotify Client ID in the <code>config.ts</code> file for login to work.</span>
            </div>
        )}

        <div className="text-sm text-gray-300 mb-6 space-y-3 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
          <p>
            1. This app requires a <strong>Spotify Premium</strong> account.
          </p>
          <p>
            2. The developer must add the app's URL (e.g., <code>http://localhost:3000</code>) to the <strong>Redirect URIs</strong> in the Spotify Developer Dashboard settings.
          </p>
          <p>
            3. Click the button below to connect your account.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded-lg text-red-200 text-sm flex items-start gap-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error} Please try logging in again.</span>
          </div>
        )}

        <button
          onClick={onLogin}
          disabled={!isConfigured}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-100 flex items-center justify-center gap-3 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.476a9.524 9.524 0 1 0 0 19.048 9.524 9.524 0 0 0 0-19.048zM8.038 17.518c-.22.272-.6.345-.873.124-.272-.22-.344-.6-.123-.873.22-.272.6-.345.873-.124.273.22.345.6.123.873zm2.36-1.43c-.258.32-.71.408-.99.148-.32-.258-.407-.71-.147-.99.258-.32.71-.408.99-.148.32.258.407.71.147.99zm.25-2.36c-.3.368-.83.48-1.198.18-.367-.3-.48-.83-.18-1.198.3-.368.83-.48 1.198-.18.368.3.48.83.18 1.198zm3.312-3.582c-1.84 0-3.332 1.493-3.332 3.333s1.492 3.333 3.332 3.333c1.84 0 3.332-1.493 3.332-3.333s-1.492-3.333-3.332-3.333z"></path></svg>
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
