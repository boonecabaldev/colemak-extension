// Dvorak to Colemak Conversion
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
  //v: ".",
  //z: "/",
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
  //V: ">",
  //Z: "?",
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
  if (event.metaKey && event.key == '\'') {
    return;
  }

  const input = event.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;

  // Convert the key press from Dvorak to Colemak
  const colemakKey = dvorakToColemak[event.key];
  if (colemakKey) {
    input.setRangeText(colemakKey, start, end, "end");
    event.preventDefault();  // Prevent the default action of the keypress
  }
}

// Get all input elements on the page
const textInputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="search"], input[type="url"], input[type="tel"], textarea');

// Function to add event listeners
function addEventListeners() {
  textInputs.forEach(input => {
    input.style.border = '2px solid yellow';

    // Add focus event listener
    input.addEventListener('focus', handleFocus);

    // Add blur event listener
    input.addEventListener('blur', handleBlur);

    // Add keypress event listener for Dvorak to Colemak conversion
    input.addEventListener('keydown', dvorakToColemakConversion);
  });

  // Highlight the currently focused element, if any
  const focusedElement = document.activeElement;
  if (Array.from(textInputs).includes(focusedElement)) {
    focusedElement.style.border = '4px solid green';
  }
}

// Function to remove event listeners
function removeEventListeners() {
  textInputs.forEach(input => {
    input.style.border = ''; // Reset border style

    // Remove event listeners
    input.removeEventListener('focus', handleFocus);
    input.removeEventListener('blur', handleBlur);
    input.removeEventListener('keydown', dvorakToColemakConversion);
  });
}

// Focus event handler
function handleFocus(event) {
  event.target.style.border = '4px solid green';
}

// Blur event handler
function handleBlur(event) {
  event.target.style.border = '2px solid yellow';
}

// Initial state
let isActive = true;
addEventListeners();

// Listen for Command+' to toggle highlighting and Colemak conversion
document.addEventListener('keydown', (event) => {
  if (event.metaKey && event.key == '\'') {
    event.preventDefault();
    if (isActive) {
      removeEventListeners();
    } else {
      addEventListeners();
    }
    isActive = !isActive;
  }
});
