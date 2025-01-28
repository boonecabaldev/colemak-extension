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


function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerText = message;
  popup.style.display = "block";
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

/*
function dvorakToColemakConversion(event) {
  const textArea = document.getElementById("colemakTextArea");
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;

  // Convert the key press from Dvorak to Colemak
  const colemakKey = dvorakToColemak[event.key];
  if (colemakKey) {
    textArea.setRangeText(colemakKey, start, end, "end");
    showPopup(`Converted ${event.key} to ${colemakKey}`);
    setTimeout(hidePopup, 2000);  // Hide the popup after 2 seconds
    event.preventDefault();  // Prevent the default action of the keypress
  }
}
*/
///*

// Perform the Dvorak to Colemak conversion on keydown
function dvorakToColemakConversion(event, id) {
  const textArea = document.getElementById(id);
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;

  // Convert the key press from Dvorak to Colemak
  const colemakKey = dvorakToColemak[event.key];
  if (colemakKey) {
    textArea.setRangeText(colemakKey, start, end, "end");
    event.preventDefault();  // Prevent the default action of the keypress
  }
}
//*/

export { dvorakToColemakConversion };