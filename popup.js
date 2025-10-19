let currentSongTitle = '';

function updatePopupUI(songInfo) {
  if (songInfo && songInfo.title !== currentSongTitle) {
    currentSongTitle = songInfo.title;
    document.getElementById('song-title').textContent = songInfo.title;
    document.getElementById('song-artist').textContent = songInfo.artist;
    document.getElementById('album-art').src = songInfo.albumArt;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  let isPlaying = true; // Assume playing by default when popup opens

  function setPlayPauseIcon() {
    playIcon.style.display = isPlaying ? 'none' : 'block';
    pauseIcon.style.display = isPlaying ? 'block' : 'none';
  }


  playPauseBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'play-pause' });
    isPlaying = !isPlaying;
    setPlayPauseIcon();
  });

  prevBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'prev' });
  });

  nextBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'next' });
  });


  // Function to fetch and update song info
  function fetchSongInfo() {
    chrome.runtime.sendMessage({ action: 'get-song-info' }, (response) => {
      if (chrome.runtime.lastError) {
        // Don't worry about this error, it can happen if the content script isn't ready
        console.clear(); // Clear console to avoid clutter
      } else {
        updatePopupUI(response);
      }
    });
  }

  // Fetch info immediately on open
  setPlayPauseIcon();
  fetchSongInfo();

  // And then fetch info every 2 seconds to check for changes
  setInterval(fetchSongInfo, 2000);
});