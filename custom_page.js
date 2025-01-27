document.addEventListener("DOMContentLoaded", () => {
  function switchTabs() {
    chrome.tabs.query(
      {
        currentWindow: true
      },
      function (tabs) {
        if (tabs.length > 1) {
          var currentTab = tabs.find((tab) => tab.active);
          var nextTabIndex = (tabs.indexOf(currentTab) + 1) % tabs.length;
          chrome.tabs.update(tabs[nextTabIndex].id, {
            active: true
          });
        }
      }
    );
  }

      const dvorakToColemakMap = {
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
  
  const textArea = document.getElementById("colemakTextArea");
  textArea.focus();
  textArea.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.key === "Enter") {
      textArea.select();
      document.execCommand("copy");
      textArea.value = ""; // Clear the text area
      //textArea.focus();
      displayMessage("Content copied and cleared");
      event.preventDefault();
      //switchTabs(); // Switch to the next tab
	window.close();
    }
    if (dvorakToColemakMap.hasOwnProperty(event.key)) {
      event.preventDefault();
      const colemakKey = dvorakToColemakMap[event.key];
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      // Insert the key at the cursor position
      textArea.setRangeText(colemakKey, start, end, "end");
    }
  });
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => {
    const textContent = textArea.value;
    const blob = new Blob([textContent], {
      type: "text/plain"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "colemak_text.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", () => {
    textArea.select();
    document.execCommand("copy");
    textArea.setSelectionRange(textArea.value.length, textArea.value.length); // Move cursor to the end
    displayMessage("Content copied to clipboard");
  });
  const copyAndClearButton = document.getElementById("copyAndClearButton");

  copyAndClearButton.addEventListener("click", () => {
    textArea.select();
    document.execCommand("copy");
    textArea.value = ""; // Clear the text area
    textArea.focus();
    displayMessage("Content copied and cleared");
    switchToNextTab(); // Switch to the next tab
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "F8") {
      event.preventDefault();
      textArea.select();
      document.execCommand("copy");
      textArea.setSelectionRange(textArea.value.length, textArea.value.length); // Move cursor to the end
      displayMessage("Content copied to clipboard");
    }
    if (event.key === "F7") {
      event.preventDefault();
      textArea.select();
      document.execCommand("copy");
      textArea.value = ""; // Clear the text area
      textArea.focus();
      displayMessage("Content copied and cleared");
      switchTabs(); // Switch to the next tab
    }
  });

  function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = message;
    messageDiv.style.display = "block";
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 2000);
  }

  function switchToNextTab() {
    const switchTabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      ctrlKey: true,
      bubbles: true
    });
    document.dispatchEvent(switchTabEvent);
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      let activeElement = document.activeElement;
      if (activeElement.nextElementSibling === null && activeElement.tagName === "INPUT") {
        event.preventDefault();
        document.querySelector('[tabindex="1"]').focus();
      }
    }
  });
});
