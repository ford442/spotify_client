// ============================================================================
// SPOTIFY API CONFIGURATION
// ============================================================================
// 
// CURRENT APPROACH: Web Playback SDK (requires Spotify Premium)
// 
// LIMITATIONS:
// - Requires Spotify Premium account (hard requirement from Spotify)
// - Requires user authentication (OAuth login)
// - Limited audience reach (only Premium subscribers)
//
// FOR MORE ACCESS OPTIONS:
// See SPOTIFY_INTEGRATION_PLAN.md for alternatives like:
// - Spotify Embed Player (no login required, works for everyone)
// - Hybrid approach (embeds for casual users + SDK for premium)
// - Preview URLs (30-second samples without Premium)
//
// ============================================================================
// SETUP INSTRUCTIONS:
// ============================================================================
// 1. Go to: https://developer.spotify.com/dashboard/
// 2. Create a new app (or use existing)
// 3. Note down the "Client ID"
// 4. Go to "Edit Settings" for your app
// 5. Add a "Redirect URI" - This URI MUST match exactly what you set in 
//    the `REDIRECT_URI` variable below
//    For local development: http://localhost:5173/
//    For production: Your deployed URL (e.g., https://yourdomain.com/)
// ============================================================================

export const CLIENT_ID: string = '8e95cac2565c49499f9ebb6b9bd4d93d';

// ============================================================================
// REDIRECT URI CONFIGURATION
// ============================================================================
// ** CRITICAL: This must EXACTLY match what's in your Spotify Dashboard **
// 
// This automatically uses the current page URL, which works for most cases.
// You MUST add this URL to the "Redirect URIs" list in your Spotify app settings.
//
// Examples:
// - Local development: http://localhost:5173/
// - Production: https://yourdomain.com/
//
// Note: If you deploy to multiple domains, add each one to Spotify Dashboard
// ============================================================================

export const REDIRECT_URI = window.location.origin + window.location.pathname;

// ============================================================================
// YOUR SONGS/TRACKS CONFIGURATION
// ============================================================================
// Add your songs here to play them automatically when users connect
//
// How to get track URIs:
// 1. Open Spotify (desktop or web)
// 2. Right-click on a song
// 3. Share → Copy Spotify URI
// 4. Add to the array below
//
// Format: 'spotify:track:TRACK_ID'
// Example: 'spotify:track:1XdAuz3tbAVECAj8GgpVhc'
//
// You can add as many tracks as you want - they'll play as a playlist
// ============================================================================

export const TRACK_URIS = [
  'spotify:track:1XdAuz3tbAVECAj8GgpVhc', // Your first song
  // Add more tracks here:
  // 'spotify:track:anotherTrackID',
  // 'spotify:track:yetAnotherTrackID',
];

// ============================================================================
// SPOTIFY OAUTH SCOPES (Permissions)
// ============================================================================
// These are the permissions we request from users when they log in
//
// Current scopes:
// - streaming: Required for Web Playback SDK (play music in browser)
// - user-read-email: Access user's email address
// - user-read-private: Access user's subscription type (check for Premium)
// - user-read-playback-state: Read current playback state
// - user-modify-playback-state: Control playback (play, pause, skip, etc.)
//
// Note: All these scopes are required for the Web Playback SDK to work properly.
// Users must approve these permissions during the OAuth login flow.
// ============================================================================

export const SCOPES = [
  'streaming',                    // Play music through Web Playback SDK
  'user-read-email',              // Read user's email
  'user-read-private',            // Read user's subscription type
  'user-read-playback-state',     // Read playback state
  'user-modify-playback-state',   // Control playback
];
