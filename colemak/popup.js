import { dvorakToColemakConversion } from './dvorakToColemak.js';

// popup.js

let previouslyFocusedElement = null;
let clipboardData = "";

// Function to hook a text element
function HookTextElement(input) {
  console.log("In HookTextElement function");
  
  input.style.border = '2px solid yellow';

  // Add focus event listener
  input.addEventListener('focus', () => {
    console.log("Focus event triggered");
    input.style.border = '4px solid green';
  });

  // Add blur event listener
  input.addEventListener('blur', () => {
    console.log("Blur event triggered");
    input.style.border = '2px solid yellow';
  });

  // Add keydown event listener for Dvorak to Colemak conversion
  input.addEventListener('keydown', (event) => {
    console.log("Keydown event triggered");
    dvorakToColemakConversion(event, input.id);
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "webPageLoaded") {
    console.log("Received webPageLoaded message in popup");
    // Your code to handle the event
  }
});

// Track the focused element when the popup opens
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event triggered");

  chrome.runtime.sendMessage({ type: "popupOpened" });

  // Focus the textarea when the popup opens
  const textArea = document.getElementById("colemakTextArea");
  if (textArea) {
    console.log("Text area found:", textArea);
    // Your existing code to handle the text area
  }
});