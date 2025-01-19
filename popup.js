// Popup Script (popup.js)
document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('textInput');
  const copyButton = document.getElementById('copyButton');
  const pasteButton = document.getElementById('pasteButton');

  // Set focus to the textarea when the popup is shown
  window.onload = () => {
    textInput.focus();
  };

  // Copy button functionality
  copyButton.addEventListener('click', () => {
    textInput.select();
    document.execCommand('copy');
  });

  // Paste button functionality
  pasteButton.addEventListener('click', async () => {
    const textToPaste = textInput.value;
    textInput.value = ''; // Clear the text area
    window.close(); // Close the popup dialog

    // Refocus on the original text input
    chrome.runtime.sendMessage({
      action: 'pasteText',
      text: textToPaste
    });
  });
});
