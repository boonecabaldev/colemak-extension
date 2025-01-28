import { dvorakToColemakConversion } from './dvorakToColemak.js';

// popup.js

let previouslyFocusedElement = null;
let clipboardData = "";

// Track the focused element when the popup opens
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ type: "popupOpened" });

  // Focus the textarea when the popup opens
  const textArea = document.getElementById("colemakTextArea");
  if (textArea) {
    textArea.focus();

    // Add the event listener for keydown (for Dvorak to Colemak conversion)
    textArea.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        copyAndClearButton.click();
      } else {
        dvorakToColemakConversion(event);
      }
    });
  }

  // Listen for Shift+Enter or the "Save to File" button click
  const saveToFileButton = document.getElementById("saveToFileButton");
  const copyButton = document.getElementById('copyButton');
  const copyAndClearButton = document.getElementById('copyAndClearButton');
  const message = document.getElementById('message');

  function copyTextToClipboard(text) {
    document.body.focus();  // Ensure the document is focused
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Text copied to clipboard!");
        message.style.display = 'block';
        setTimeout(() => {
          message.style.display = 'none';
        }, 2000);
      })
      .catch(err => {
        console.error("Error copying text to clipboard: ", err);
      });
  }

  function saveTextToFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  saveToFileButton.addEventListener("click", () => {
    const text = textArea.value;
    saveTextToFile(text, 'colemak_text.txt');
    textArea.value = "";  // Clear the text area
  });

  copyButton.addEventListener('click', () => {
    const text = textArea.value;
    copyTextToClipboard(text);
  });

  copyAndClearButton.addEventListener('click', () => {
    const text = textArea.value;
    copyTextToClipboard(text);
    textArea.value = "";  // Clear the text area
    window.close();  // Close the popup

    // Paste the text into the previously focused element
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
      const start = previouslyFocusedElement.selectionStart;
      const end = previouslyFocusedElement.selectionEnd;
      previouslyFocusedElement.setRangeText(text, start, end, "end");
    }
  });

  // Track the previously focused element
  previouslyFocusedElement = document.activeElement;
});