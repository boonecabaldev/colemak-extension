document.addEventListener("DOMContentLoaded", () => {
  // Function to highlight all text input elements
  function highlightTextInputs() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
      input.style.backgroundColor = "yellow"; // Highlight color
    });
  }

  // Call the highlight function
  highlightTextInputs();

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
  };
  // ...existing code...
});