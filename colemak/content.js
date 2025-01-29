// Toggle state (true = enabled, false = disabled)
let isActive = true;

// Dvorak to Colemak Conversion (User-Verified Map)
const dvorakToColemak = {
  "'": "q", ",": "w", ".": "f", "p": "p", "y": "g",
  "f": "j", "g": "l", "c": "u", "r": "y", "l": ";",
  "a": "a", "o": "r", "e": "s", "u": "t", "i": "d",
  "d": "h", "h": "n", "t": "e", "n": "i", ";": "z",
  "q": "x", "j": "c", "k": "v", "x": "b", "b": "k",
  "m": "m", '"': "Q", "<": "W", ">": "F", "P": "P",
  "Y": "G", "F": "J", "G": "L", "C": "U", "R": "Y",
  "L": ":", "A": "A", "O": "R", "E": "S", "U": "T",
  "I": "D", "D": "H", "H": "N", "T": "E", "N": "I",
  ":": "Z", "Q": "X", "J": "C", "K": "V", "X": "B",
  "B": "K", "M": "M", "s": "o", "S": "O", "-": "'",
  "_": '"', "/": "[", "?": "{", "=": "]", "+": "}",
  "[": "-", "{": "_", "]": "=", "}": "+", "w": ",",
  "W": "<", "v": ".", "V": ">", "z": "/", "Z": "?"
};

// Highlight form fields
function highlightInputs(inputs) {
  inputs.forEach(input => {
    input.style.border = isActive ? '2px solid yellow' : ''; // Show/Hide highlights
    if (!input.dataset.highlighted) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      input.dataset.highlighted = "true";
    }
  });

  // Ensure the focused input is green if toggled ON
  const focusedElement = document.activeElement;
  if (isActive && focusedElement && (focusedElement.tagName === "INPUT" || focusedElement.tagName === "TEXTAREA")) {
    focusedElement.style.border = "4px solid green";
  }
}

// Observe dynamic form elements
function observeFormElements() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.matches('input, textarea')) {
            highlightInputs([node]);
          } else {
            highlightInputs(node.querySelectorAll('input, textarea'));
          }
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Handle focus (Green border)
function handleFocus(event) {
  if (isActive) {
    event.target.style.border = '4px solid green';
  }
}

// Handle blur (Yellow border)
function handleBlur(event) {
  if (isActive) {
    event.target.style.border = '2px solid yellow';
  }
}

// Convert Dvorak to Colemak in all text fields, including email inputs
function dvorakToColemakConversion(event) {
  if (!isActive || event.ctrlKey || event.altKey || event.metaKey) return; // Skip if disabled or modifier keys are used

  const colemakKey = dvorakToColemak[event.key];
  if (!colemakKey) return;

  event.preventDefault(); // Stop the original key from appearing

  const input = event.target;

  if (input.isContentEditable || input.tagName === "TEXTAREA") {
    // Handle normal text fields
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.setRangeText(colemakKey, start, end, "end");
  } else if (input.tagName === "INPUT") {
    // Special handling for email inputs
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newValue = input.value.slice(0, start) + colemakKey + input.value.slice(end);
    input.value = newValue;
    input.setSelectionRange(start + 1, start + 1); // Move cursor forward
  } else {
    // Manually insert key into the DOM for non-input fields
    document.execCommand("insertText", false, colemakKey);
  }
}

// Toggle feature with Ctrl + '
function toggleFeature(event) {
  if (event.ctrlKey && event.key === "'") {
    event.preventDefault(); // Prevent unwanted input
    isActive = !isActive; // Toggle state

    // Apply new state to all form elements
    highlightInputs(document.querySelectorAll('input, textarea'));

    console.log(`Dvorak-to-Colemak & Highlighting: ${isActive ? "ON" : "OFF"}`);
  }
}

// Attach event listeners
document.addEventListener('keydown', toggleFeature);
document.addEventListener('keydown', dvorakToColemakConversion);
highlightInputs(document.querySelectorAll('input, textarea'));
observeFormElements();
