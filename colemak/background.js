chrome.action.onClicked.addListener((tab) => {
  chrome.windows.getCurrent((window) => {
    const position = {
      top: window.top + 50, // Adjust as needed
      left: window.left + window.width - 450 // Adjust as needed (400px dialog width + 50px padding)
    };
    chrome.tabs.sendMessage(tab.id, { action: "showDialog", position: position });
  });
});
