if (document.getElementById("colemakDialog")) {
  console.log("Dialog already exists.");
  return; // Prevent multiple injections
}

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
  if (isActive
    && focusedElement
    && (focusedElement.tagName === "INPUT" || focusedElement.tagName === "TEXTAREA")) {

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

function makeDialog() {
  // Create the dialog container
  const dialog = document.createElement("div");
  dialog.id = "colemakDialog"; // Unique ID to prevent duplicates

  dialog.style.position = "fixed";
  dialog.style.bottom = "50px";
  dialog.style.right = "50px";
  dialog.style.width = "400px";
  dialog.style.height = "500px";
  dialog.style.background = "white";
  dialog.style.border = "1px solid #ccc";
  dialog.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  dialog.style.borderRadius = "10px";
  dialog.style.padding = "20px";
  dialog.style.display = "flex";
  dialog.style.flexDirection = "column";
  dialog.style.zIndex = "9999";
  dialog.style.fontFamily = "Arial, sans-serif";

  // Title
  const title = document.createElement("h1");
  title.textContent = "Colemak Text Area";
  title.style.textAlign = "center";
  title.style.fontSize = "1.5rem";
  title.style.marginBottom = "10px";
  dialog.appendChild(title);

  // Textarea
  const textarea = document.createElement("textarea");
  textarea.id = "colemakTextArea";
  textarea.style.flexGrow = "1";
  textarea.style.width = "100%";
  textarea.style.resize = "none";
  textarea.style.padding = "10px";
  textarea.style.fontSize = "1rem";
  textarea.classList.add("form-control");
  dialog.appendChild(textarea);

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.marginTop = "10px";
  dialog.appendChild(buttonContainer);

  // Create buttons
  const buttons = [
    { id: "saveToFileButton", text: "Save to File", class: "btn btn-primary" },
    { id: "copyButton", text: "Copy", class: "btn btn-success" },
    { id: "copyAndClearButton", text: "Copy and Clear", class: "btn btn-outline-info" },
  ];

  buttons.forEach((btnData) => {
    const button = document.createElement("button");
    button.id = btnData.id;
    button.textContent = btnData.text;
    button.className = btnData.class;
    button.style.padding = "10px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    buttonContainer.appendChild(button);
  });

  // Message for copy confirmation
  const message = document.createElement("div");
  message.id = "message";
  message.textContent = "Content copied to clipboard";
  message.style.textAlign = "center";
  message.style.color = "green";
  message.style.display = "none";
  message.style.marginTop = "10px";
  dialog.appendChild(message);

  // Close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.background = "red";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.borderRadius = "50%";
  closeButton.style.width = "25px";
  closeButton.style.height = "25px";
  closeButton.style.fontSize = "14px";
  closeButton.style.fontWeight = "bold";
  dialog.appendChild(closeButton);

  // Append dialog to body
  document.body.appendChild(dialog);

  // Button event listeners
  document.getElementById("copyButton").addEventListener("click", () => {
    navigator.clipboard.writeText(textarea.value).then(() => {
      message.style.display = "block";
      setTimeout(() => (message.style.display = "none"), 2000);
    });
  });

  document.getElementById("copyAndClearButton").addEventListener("click", () => {
    navigator.clipboard.writeText(textarea.value).then(() => {
      textarea.value = "";
      message.style.display = "block";
      setTimeout(() => (message.style.display = "none"), 2000);
    });
  });

  document.getElementById("saveToFileButton").addEventListener("click", () => {
    const blob = new Blob([textarea.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "colemak_text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Close button functionality
  closeButton.addEventListener("click", () => {
    document.body.removeChild(dialog);
  });

}

// Attach event listeners
document.addEventListener('keydown', toggleFeature);
document.addEventListener('keydown', dvorakToColemakConversion);
highlightInputs(document.querySelectorAll('input, textarea'));
observeFormElements();

makeDialog();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showDialog") {
    showDialog();
  }
});

function showDialog() {
  // Create the dialog
  const dialog = document.createElement("div");
  dialog.style.position = "fixed";
  dialog.style.top = "50%";
  dialog.style.left = "50%";
  dialog.style.transform = "translate(-50%, -50%)";
  dialog.style.padding = "20px";
  dialog.style.backgroundColor = "white";
  dialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
  dialog.style.zIndex = "1000";

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.marginTop = "10px";
  dialog.appendChild(buttonContainer);

  // Create buttons
  const buttons = [
    { id: "saveToFileButton", text: "Save to File", class: "btn btn-primary" },
    { id: "copyButton", text: "Copy", class: "btn btn-success" },
    { id: "copyAndClearButton", text: "Copy and Clear", class: "btn btn-outline-info" },
  ];

  buttons.forEach((btnData) => {
    const button = document.createElement("button");
    button.id = btnData.id;
    button.textContent = btnData.text;
    button.className = btnData.class;
    button.style.padding = "10px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    buttonContainer.appendChild(button);
  });

  // Message for copy confirmation
  const message = document.createElement("div");
  message.id = "message";
  message.textContent = "Content copied to clipboard";
  message.style.textAlign = "center";
  message.style.color = "green";
  message.style.display = "none";
  message.style.marginTop = "10px";
  dialog.appendChild(message);

  // Append dialog to body
  document.body.appendChild(dialog);
}
