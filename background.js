let checkWindowInterval = 1; // > 0
let idleTimeout = 15; // >= 15

chrome.runtime.onMessage.addListener((message, _, __) => {
  switch(message.type) {
    case "Open File":
      openFile(message);
      break;
    default:
  }
});

function openFile(message) {
  chrome.tabs.create({
    url: message.path
  }, (tab) => {
    chrome.tabs.executeScript(tab.id, { file: "content-ln.js" });
  });
}

