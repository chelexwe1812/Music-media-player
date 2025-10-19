chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Selectors for YouTube Music
  const songTitleSelector = 'ytmusic-player-bar .title';
  const songArtistSelector = 'ytmusic-player-bar .byline';
  const albumArtSelector = 'ytmusic-player-bar img.image';
  const playPauseButtonSelector = '#play-pause-button';
  const prevButtonSelector = '.previous-button';
  const nextButtonSelector = '.next-button';
  // const volumeSliderSelector = '#volume-slider'; // Volume is more complex on YTM, disabling for now

  if (request.action === 'get-song-info') {
    const title = document.querySelector(songTitleSelector)?.textContent || 'Unknown Song';
    const artist = document.querySelector(songArtistSelector)?.textContent || 'Unknown Artist';
    let albumArt = document.querySelector(albumArtSelector)?.src || 'images/placeholder.png';
    if (albumArt && albumArt.includes('googleusercontent')) {
      albumArt = albumArt.replace(/=w\d+-h\d+/, '=w544-h544');
    }
    sendResponse({ title, artist, albumArt });
  } else if (request.action === 'play-pause') {
    document.querySelector(playPauseButtonSelector)?.click();
  } else if (request.action === 'prev') {
    document.querySelector(prevButtonSelector)?.click();
  } else if (request.action === 'next') {
    document.querySelector(nextButtonSelector)?.click();
  } 
  // else if (request.action === 'set-volume') {
  //   // Volume control on YTM is more complex and requires a different approach.
  //   // This will be implemented later.
  // }
});