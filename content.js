function attachLinkHandlers() {
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    if (!link.dataset.listenerAttached) {
      link.addEventListener("click", handleLinkClick);
      link.dataset.listenerAttached = "true";
    }
  });
}

function detachLinkHandlers() {
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    if (link.dataset.listenerAttached) {
      link.removeEventListener("click", handleLinkClick);
      link.dataset.listenerAttached = "false";
    }
  });
}

function handleLinkClick(event) {
  event.preventDefault();
  const infoBox = createInfoBox(event.target.href);
  document.body.appendChild(infoBox);

  const linkRect = event.target.getBoundingClientRect();
  const topPosition = linkRect.bottom + window.scrollY;
  const leftPosition = (window.innerWidth - infoBox.offsetWidth) / 2;

  infoBox.style.top = `${topPosition}px`;
  infoBox.style.left = `${leftPosition}px`;
}

let port = chrome.runtime.connect({ name: "morepagesinasignletab" });

port.onMessage.addListener(function (response) {
  console.log("received message", response);
  if (response.isActive) {
    attachLinkHandlers();
  } else {
    detachLinkHandlers();
  }
});
port.postMessage({ query: "isActive" });

port.onDisconnect.addListener(function () {
  console.log("Disconnected");
  port = null;
});
function createInfoBox(linkHref) {
  const infoBox = document.createElement("div");
  infoBox.id = "infoBox-linkHref";
  const addressBarContainer = document.createElement("div");
  const addressBar = createAddressBar(linkHref);
  const toolbar = createToolbar(infoBox);

  addressBarContainer.appendChild(addressBar);
  addressBarContainer.appendChild(toolbar);
  infoBox.appendChild(addressBarContainer);
  const iframe = createIframe(linkHref);

  infoBox.appendChild(iframe);

  styleInfoBox(infoBox);
  styleAddressBarContainer(addressBarContainer);
  return infoBox;
}

function createIframe(href) {
  const iframe = document.createElement("iframe");
  iframe.src = href;
  iframe.style.width = "100%";
  iframe.style.height = "calc(80vh - 50px)";
  iframe.style.border = "none";
  return iframe;
}

function createAddressBar(href) {
  const addressBar = document.createElement("input");
  addressBar.type = "text";
  addressBar.value = href;
  addressBar.readOnly = true;
  addressBar.style.width = "80%";
  addressBar.style.marginRight = "10px";
  addressBar.style.padding = "5px";
  addressBar.style.borderRadius = "5px";
  addressBar.style.border = "1px solid #ccc";
  return addressBar;
}

function createToolbar(infoBox) {
  const toolbar = document.createElement("div");
  toolbar.style.display = "flex";
  toolbar.style.gap = "10px";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", function () {
    infoBox.remove();
  });

  const openTabButton = document.createElement("button");
  openTabButton.textContent = "Open in new tab";
  openTabButton.addEventListener("click", function () {
    window.open(this.parentNode.previousElementSibling.value, "_blank");
  });

  toolbar.appendChild(closeButton);
  toolbar.appendChild(openTabButton);
  return toolbar;
}

function styleAddressBarContainer(container) {
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.padding = "10px";
}

function styleInfoBox(infoBox) {
  infoBox.style.position = "absolute";
  infoBox.style.width = "80vw";
  infoBox.style.minWidth = "1024px";
  infoBox.style.height = "80vh";
  infoBox.style.backgroundColor = "white";
  infoBox.style.border = "1px solid black";
  infoBox.style.zIndex = "1000";
  infoBox.style.overflow = "hidden";
  infoBox.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
}
