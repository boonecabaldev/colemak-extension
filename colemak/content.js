// Get all input elements on the page
const textInputs = document.querySelectorAll('input[type="text"], textarea');

// Highlight them with a yellow border
textInputs.forEach(input => {
  input.style.border = '2px solid yellow';
});

// Listen for focus event on text inputs
textInputs.forEach(input => {
  input.addEventListener('focus', () => {
    chrome.runtime.sendMessage({ type: 'textboxFocused' });
  });
});

// Listen for an event (optional)
document.addEventListener('click', (event) => {
  console.log('Clicked element:', event.target);
});