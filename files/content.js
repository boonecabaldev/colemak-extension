import { dvorakToColemakConversion } from './dvorakToColemak.js';

// popup.js

let clipboardData = "";

// Function to hook a text element
function HookTextElement(input) {
  input.style.border = '2px solid yellow';

  // Add focus event listener
  input.addEventListener('focus', () => {
    input.style.border = '4px solid green';
  });

  // Add blur event listener
  input.addEventListener('blur', () => {
    input.style.border = '2px solid yellow';
  });

  // Add keydown event listener for Dvorak to Colemak conversion
  input.addEventListener('keydown', (event) => {  
    dvorakToColemakConversion(event, input.id);
  });
}

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
        dvorakToColemakConversion(event, "colemakTextArea");
      }
    });
  }

  // Get all input elements on the page
  const textInputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="search"], input[type="url"], input[type="tel"], textarea');
  textInputs.forEach(HookTextElement);

  // Listen for an event (optional)
  document.addEventListener('click', (event) => {
    console.log('Clicked element:', event.target);
  });

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
        console.error("Failed to copy text: ", err);
      });
  }

  saveToFileButton.addEventListener('click', () => {
    const text = textArea.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
  });
});

export { HookTextElement };