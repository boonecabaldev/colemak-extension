(function () {
  if (document.getElementById("colemakDialog")) {
    console.log("Dialog already exists.");
    return; // Prevent multiple injections
  }

  // Function to create and show the dialog
  function showDialog(position) {
    if (document.getElementById("colemakDialog")) {
      console.log("Dialog already exists.");
      return; // Prevent multiple injections
    }

    // Create dialog
    const dialog = document.createElement('div');
    dialog.id = 'colemakDialog';
    dialog.style.position = 'fixed';
    dialog.style.top = `${position.top}px`;
    dialog.style.left = `${position.left}px`;
    dialog.style.backgroundColor = 'white';
    dialog.style.padding = '20px';
    dialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    dialog.style.zIndex = '1000';

    // Add content to the dialog
    dialog.innerHTML = `
      <h1>Colemak Text Area</h1>
      <textarea id="colemakTextArea" style="width: 100%; height: 200px;"></textarea>
      <div style="margin-top: 10px;">
        <button id="closeDialogButton">Close</button>
      </div>
    `;

    // Append dialog to the body
    document.body.appendChild(dialog);

    // Add event listener to close button
    document.getElementById('closeDialogButton').addEventListener('click', () => {
      document.body.removeChild(dialog);
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