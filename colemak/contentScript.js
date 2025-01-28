document.addEventListener("DOMContentLoaded", () => {
  console.log("Web page DOMContentLoaded event triggered");
  chrome.runtime.sendMessage({ type: "webPageLoaded" });
});