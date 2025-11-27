
import type { AudioFeatures } from './types.ts';

export const fetchAudioFeatures = async (
  trackId: string,
  accessToken: string
): Promise<AudioFeatures | null> => {
  if (!trackId || !accessToken) {
    return null;
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch audio features:', response.statusText);
      return null;
    }

    const data = await response.json();
    return {
      tempo: data.tempo,
      energy: data.energy,
      danceability: data.danceability,
      valence: data.valence,
      instrumentalness: data.instrumentalness,
      liveness: data.liveness,
    };
  } catch (error) {
    console.error('Error fetching audio features:', error);
    return null;
  }
};

export const startPlayback = async (
  token: string,
  deviceId: string,
  trackUris: string[]
): Promise<void> => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Failed to start playback:', errorBody.error.message);
    } else {
      console.log('Playback command sent for tracks:', trackUris);
    }
  } catch (error) {
    console.error('Error starting playback:', error);
  }
};
