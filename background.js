function toggleState() {
  chrome.storage.local.get(["isActive"], function (result) {
    let isActive = !result.isActive;
    chrome.storage.local.set({ isActive: isActive }, function () {
      setIcon(isActive);
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

chrome.storage.local.get(["isActive"], function (result) {
  let isActive = result?.isActive || false;
  setIcon(isActive);
});

chrome.action.onClicked.addListener(toggleState);
