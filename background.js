function toggleState() {
  chrome.storage.local.get(["isActive"], function (result) {
    let isActive = !result.isActive;
    chrome.storage.local.set({ isActive: isActive }, function () {
      setIcon(isActive);
      notifyAllTabs(isActive);
    });
  });
}

function setIcon(isActive) {
  let iconName = isActive ? "assets/icon_active2.png" : "assets/icon.png";
  let title = isActive
    ? "Extension active: links opening in the same page"
    : "Extension inactive: no override for links opening";
  chrome.action.setIcon({ path: iconName });
  chrome.action.setTitle({ title: title });
}

function notifyAllTabs(isActive) {
  Object.keys(connections).forEach((tabId) => {
    connections[tabId].postMessage({
      action: "stateChanged",
      isActive: isActive,
    });
  });
}

let connections = {};

chrome.storage.local.get(["isActive"], function (result) {
  let isActive = result.isActive || false;
  setIcon(isActive);
  notifyAllTabs(isActive);
});

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "morepagesinasignletab") {
    let tabId = port.sender.tab.id;
    connections[tabId] = port;

    port.onDisconnect.addListener(() => {
      delete connections[tabId];
    });

    port.onMessage.addListener(function (msg) {
      if (msg.query === "isActive") {
        chrome.storage.local.get(["isActive"], function (result) {
          port.postMessage({ isActive: result.isActive || false });
        });
      }
    });
  }
});

chrome.action.onClicked.addListener(toggleState);
