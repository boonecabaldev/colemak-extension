// Get all input elements on the page
const textInputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="search"], input[type="url"], input[type="tel"], textarea');

// Highlight them with a yellow border
textInputs.forEach(input => {
  input.style.border = '2px solid yellow';

  // Add focus event listener
  input.addEventListener('focus', () => {
    input.style.border = '4px solid green';
  });

  // Add blur event listener
  input.addEventListener('blur', () => {
    input.style.border = '2px solid yellow';
  });
});

// Listen for an event (optional)
document.addEventListener('click', (event) => {
  console.log('Clicked element:', event.target);
});