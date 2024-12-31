let refreshIntervals = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id; // Get the currently active tab's ID.
      const interval = message.interval * 1000;

      if (refreshIntervals[tabId]) {
        clearInterval(refreshIntervals[tabId]);
      }

      refreshIntervals[tabId] = setInterval(() => {
        chrome.tabs.reload(tabId);
      }, interval);

      sendResponse({ status: "started" });
    });

    // Indicate that the response will be sent asynchronously
    return true;
  } else if (message.action === "stop") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      if (refreshIntervals[tabId]) {
        clearInterval(refreshIntervals[tabId]);
        delete refreshIntervals[tabId];
      }

      sendResponse({ status: "stopped" });
    });

    return true;
  }
});
