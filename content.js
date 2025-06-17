function attachLinkHandlers() {
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    const linkOrigin = new URL(link.href).origin;
    if (!link.dataset.listenerAttached) {
      if (linkOrigin !== window.location.origin) {
        link.addEventListener("click", handleLinkClick);
      }
      link.dataset.listenerAttached = true;
    }
  });
}

function detachLinkHandlers() {
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    if (link.dataset.listenerAttached) {
      link.removeEventListener("click", handleLinkClick);
      link.dataset.listenerAttached = false;
    }
  });
}

function handleLinkClick(event) {
  let linkElement = event.target;
  while (linkElement && linkElement.tagName !== "A") {
    linkElement = linkElement.parentElement;
  }

  if (!linkElement) {
    return;
  }
  event.preventDefault();
  const infoBox = createInfoBox(linkElement.href);
  document.body.appendChild(infoBox);

  const linkRect = linkElement.getBoundingClientRect();
  const topPosition = linkRect.bottom + window.scrollY;
  const leftPosition = (window.innerWidth - infoBox.offsetWidth) / 2;

  infoBox.style.top = `${topPosition}px`;
  infoBox.style.left = `${leftPosition}px`;
}

function createInfoBox(linkHref) {
  const infoBox = document.createElement("div");
  infoBox.id = "infoBox" + linkHref;
  const addressBarContainer = document.createElement("div");
  const addressBar = createAddressBar(linkHref);
  const toolbar = createToolbar(infoBox, linkHref);
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
  iframe.id = "infoBoxIframe" + href;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  iframe.onload = () => {
    try {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;

      observeIframeContent(iframeDocument);
    } catch {}
  };
  return iframe;
}
function observeIframeContent(iframeDocument) {
  const iframeObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        attachLinkHandlers(iframeDocument);
      }
    }
  });

  iframeObserver.observe(iframeDocument.body, {
    childList: true,
    subtree: true,
  });
}
function createAddressBar(href) {
  const addressBar = document.createElement("input");
  addressBar.type = "text";
  addressBar.value = href;
  addressBar.style.width = "80%";
  addressBar.style.marginRight = "10px";
  addressBar.style.padding = "5px";
  addressBar.style.borderRadius = "5px";
  addressBar.style.border = "1px solid #ccc";
  return addressBar;
}

function createToolbar(infoBox, linkHref) {
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

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Collapse";
  toggleButton.addEventListener("click", function () {
    const iframe = document.getElementById("infoBoxIframe" + linkHref);
    if (iframe.style.display === "none") {
      iframe.style.display = "block";
      infoBox.style.height = "97vh";
      toggleButton.textContent = "Collapse";
    } else {
      iframe.style.display = "none";

      infoBox.style.height = "55px";
      toggleButton.textContent = "Expand";
    }
  });

  toolbar.appendChild(openTabButton);
  toolbar.appendChild(toggleButton);
  toolbar.appendChild(closeButton);

  return toolbar;
}

function styleAddressBarContainer(container) {
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.padding = "10px";
}

function styleInfoBox(infoBox) {
  infoBox.style.position = "absolute";
  infoBox.style.width = "97vw";
  infoBox.style.height = "97vh";
  infoBox.style.backgroundColor = "white";
  infoBox.style.border = "1px solid black";
  infoBox.style.zIndex = "1000";
  infoBox.style.overflow = "hidden";

  infoBox.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
}

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      attachLinkHandlers();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

chrome.storage.local.get(["isActive"], function (result) {
  if (result?.isActive || false) {
    attachLinkHandlers();
  }
});
