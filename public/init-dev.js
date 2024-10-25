function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}

function stackleLTIResizer(event) {
  if ((event.origin.includes("stackle.app") || event.origin.includes("stackle.test")) && event.data == "Stackle iFrame Loaded") {
    let currentIframe = detectStackleIframe(event);

    if (!currentIframe) {
      console.log("Iframe not detected, retrying...");
      return; // Exit if iframe not found
    }

    addNoCacheToIFrame(currentIframe);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');

    if ((window.frameElement && window.frameElement.classList.contains('stackle-mini')) || currentIframe.classList.contains('stackle-mini')) {
      window.frameElement.contentWindow.postMessage("applyMiniCSS", "");
      currentIframe.contentWindow.postMessage("applyMiniCSS", "");
    } else {
      console.log("No stackle-mini class found");
    }
  }
}

// Listen for iframe load to ensure it's ready before detecting
document.querySelectorAll("iframe").forEach((iframe) => {
  iframe.addEventListener('load', function() {
    console.log('Iframe loaded:', iframe.src);
    iframe.contentWindow.postMessage("iframeLoaded", "*");
  });
});

// Cache-busting function
function addNoCacheToIFrame(iframe) {
  if (iframe) {
    let src = iframe.src;
    if (!src.includes("?")) {
      iframe.src = src + "?t=" + new Date().getTime(); 
    } else {
      iframe.src = src + "&t=" + new Date().getTime();
    }
    console.log("Cache-busting added to iframe:", iframe.src);
  }
}

// Ensure listener is refreshed
window.removeEventListener("message", stackleLTIResizer);
window.addEventListener("message", stackleLTIResizer, false);
