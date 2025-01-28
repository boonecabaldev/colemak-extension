let previouslyFocusedElement = null;
let clipboardData = "";

// Listen for when the popup is opened
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "popupOpened") {
    // Track the focused element's ID (if any)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `
          const focusedElement = document.activeElement;
          if (focusedElement && focusedElement.id) {
            focusedElement.id;
          } else {
            null;
          }
        `
      }, (result) => {
        previouslyFocusedElement = result[0] || null;
      });
    });

    // Store clipboard content
    navigator.clipboard.readText().then((text) => {
      clipboardData = text;
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  }

  if (message.type === "textboxFocused") {
    chrome.browserAction.openPopup();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'textboxFocused') {
    console.log('A textbox has received focus');
    // Perform any additional actions here
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "open-popup") {
    chrome.browserAction.openPopup();
  }
});