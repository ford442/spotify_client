
// IMPORTANT: You need to register your app on the Spotify Developer Dashboard
// to get a client ID.
// 1. Go to: https://developer.spotify.com/dashboard/
// 2. Create a new app.
// 3. Note down the "Client ID".
// 4. Go to "Edit Settings" for your app.
// 5. Add a "Redirect URI". This URI MUST match exactly what you set in the `REDIRECT_URI` variable below.
//    For local development, a common URI is http://localhost:5173/ or just the base URL of where you are running the app.
export const CLIENT_ID = '8e95cac2565c49499f9ebb6b9bd4d93d';

// This should match the Redirect URI you set in your Spotify app settings.
// ** CRITICAL STEP FOR LOGIN TO WORK **
// You MUST add this exact URL to your app's settings in the Spotify Developer Dashboard.
// For example, if your app runs on http://localhost:3000, you must add "http://localhost:3000/"
// to the "Redirect URIs" list in your Spotify app's settings.
export const REDIRECT_URI = window.location.origin + window.location.pathname;

// Add your band's track URIs here. You can get a track's URI by clicking "Share" -> "Copy Spotify URI" on a song in Spotify.
// Example: ['spotify:track:1XdAuz3tbAVECAj8GgpVhc', 'spotify:track:anotherTrackID']
export const TRACK_URIS = [
  'spotify:track:1XdAuz3tbAVECAj8GgpVhc' // <-- Your song!
];

// The permissions (scopes) we need to request from the user.
export const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
];
