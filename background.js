chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Find the YouTube Music tab
  chrome.tabs.query({ url: "*://music.youtube.com/*" }, (tabs) => {
    if (tabs.length > 0) {
      const ytmTab = tabs[0];

      // Send the message directly to the YouTube Music tab
      chrome.tabs.sendMessage(ytmTab.id, request, (response) => {
        if (chrome.runtime.lastError) {
          // Handle potential errors, e.g., if the content script isn't ready
          console.warn(chrome.runtime.lastError.message);
          sendResponse(null);
        } else {
          sendResponse(response);
        }
      });

    } else {
      console.warn("YouTube Music tab not found.");
      sendResponse(null); // No tab found
    }
  });

  return true; // Required to indicate an asynchronous response
});