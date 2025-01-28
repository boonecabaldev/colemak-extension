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
  s: "o",
  "-": "z",
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
  S: "O",
  _: "Z",
  Q: "X",
  J: "C",
  K: "V",
  X: "B",
  B: "K",
  M: "M",
  //V: ">",
  //Z: "?",
};

// Perform the Dvorak to Colemak conversion on keydown
function dvorakToColemakConversion(event) {
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

// Highlight them with a yellow border and add event listeners
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

  // Add keypress event listener for Dvorak to Colemak conversion
  input.addEventListener('keydown', dvorakToColemakConversion);
});

// Listen for an event (optional)
document.addEventListener('click', (event) => {
  console.log('Clicked element:', event.target);
});