(function () {
  if (document.getElementById("colemakDialog")) {
    console.log("Dialog already exists.");
    return; // Prevent multiple injections
  }

  let previouslyFocusedElement = null;

  // Dvorak to Colemak Conversion (User-Verified Map)
  const dvorakToColemak = {
    "'": "q",
    ",": "w",
    ".": "f",
    p: "p",
    y: "g",
    f: "j",
    g: "l",
    c: "u",
    r: "y",
    l: ";",
    a: "a",
    o: "r",
    e: "s",
    u: "t",
    i: "d",
    d: "h",
    h: "n",
    t: "e",
    n: "i",
    ";": "z",
    q: "x",
    j: "c",
    k: "v",
    x: "b",
    b: "k",
    m: "m",
    '"': "Q",
    "<": "W",
    ">": "F",
    P: "P",
    Y: "G",
    F: "J",
    G: "L",
    C: "U",
    R: "Y",
    L: ":",
    A: "A",
    O: "R",
    E: "S",
    U: "T",
    I: "D",
    D: "H",
    H: "N",
    T: "E",
    N: "I",
    ":": "Z",
    Q: "X",
    J: "C",
    K: "V",
    X: "B",
    B: "K",
    M: "M",
    s: "o",
    S: "O",
    "-": "'",
    _: '"',
    "/": "[",
    "?": "{",
    "=": "]",
    "+": "}",
    "[": "-",
    "{": "_",
    "]": "=",
    "}": "+",
    w: ",",
    W: "<",
    v: ".",
    V: ">",
    z: "/",
    Z: "?"
  };

  // Perform the Dvorak to Colemak conversion on keydown
  function dvorakToColemakConversion(event) {
    const textArea = document.getElementById("colemakTextArea");
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    // Convert the key press from Dvorak to Colemak
    const colemakKey = dvorakToColemak[event.key];
    if (colemakKey) {
      textArea.setRangeText(colemakKey, start, end, "end");
      event.preventDefault();  // Prevent the default action of the keypress
    }
  }

  // Function to create and show the dialog
  function showDialog(position) {
    if (document.getElementById("colemakDialog")) {
      console.log("Dialog already exists.");
      return; // Prevent multiple injections
    }

    createDialog(position);
  }

  // Function to create the dialog
  function createDialog(position) {
    // Create the dialog container
    const dialog = document.createElement("div");
    dialog.id = 'colemakDialog';
    dialog.style.position = "fixed";
    dialog.style.top = `${position.top}px`;
    dialog.style.left = `${position.left}px`;
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

    // Additional event listeners for Dvorak to Colemak conversion and clipboard handling
    document.addEventListener("DOMContentLoaded", () => {
      chrome.runtime.sendMessage({ type: "popupOpened" });

      // Focus the textarea when the popup opens
      if (textarea) {
        textarea.focus();

        // Add the event listener for keydown (for Dvorak to Colemak conversion)
        textarea.addEventListener("keydown", (event) => {
          if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("copyAndClearButton").click();
          } else {
            dvorakToColemakConversion(event);
          }
        });
      }

      // Track the previously focused element
      previouslyFocusedElement = document.activeElement;
    });

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

    document.getElementById("saveToFileButton").addEventListener("click", () => {
      const text = textarea.value;
      saveTextToFile(text, 'colemak_text.txt');
      textarea.value = "";  // Clear the text area
    });

    document.getElementById("copyButton").addEventListener('click', () => {
      const text = textarea.value;
      copyTextToClipboard(text);
    });

    document.getElementById("copyAndClearButton").addEventListener('click', () => {
      const text = textarea.value;
      copyTextToClipboard(text);
      textarea.value = "";  // Clear the text area
      window.close();  // Close the popup

      // Paste the text into the previously focused element
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        const start = previouslyFocusedElement.selectionStart;
        const end = previouslyFocusedElement.selectionEnd;
        previouslyFocusedElement.setRangeText(text, start, end, "end");
      }
    });
  }

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showDialog") {
      showDialog(request.position);
    }
  });

  // Toggle state (true = enabled, false = disabled)
  let isActive = true;

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

  // Handle keydown event for Ctrl+'
  document.addEventListener('keydown', (event) => {
    if (event.key === "F8") {
      event.preventDefault();
      // Your logic for Ctrl+' goes here
      console.log("Ctrl+' was pressed");
      // Example: Toggle the isActive state
      isActive = !isActive;
      highlightInputs(document.querySelectorAll('input, textarea'));
    }
  });

  // Handle keydown event for Dvorak to Colemak conversion
  document.addEventListener('keydown', (event) => {
    if (isActive && dvorakToColemak[event.key]) {
      event.preventDefault();
      const colemakKey = dvorakToColemak[event.key];
      const target = event.target;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;
        target.value = value.slice(0, start) + colemakKey + value.slice(end);
        target.selectionStart = target.selectionEnd = start + 1;
      }
    }
  });

  // Call the functions to initialize
  observeFormElements();
  highlightInputs(document.querySelectorAll('input, textarea'));
})();