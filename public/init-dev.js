function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}

function stackleLTIResizer(event) {
  if ((event.origin.includes("stackle.app") || event.origin.includes("stackle.test")) && event.data == "Stackle iFrame Loaded") {
    let currentIframe = detectStackleIframe(event);
    
    // Apply cache-busting to the iframe to prevent issues with caching
    addNoCacheToIFrame(currentIframe);

    // Add the stackle_iframe class to the detected iframe
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');

    // Check if parent iframe or current iframe has the stackle-mini class
    if ((window.frameElement && window.frameElement.classList.contains('stackle-mini')) || currentIframe.classList.contains('stackle-mini')) {
      console.log(window.frameElement);
      window.frameElement.contentWindow.postMessage("applyMiniCSS", "");
      console.log("Applying mini CSS to parent iframe");
      currentIframe.contentWindow.postMessage("applyMiniCSS", "");
      console.log("Applying mini CSS");
    } else {
      console.log("No stackle-mini class found");
    }
  }
}

// Cache-busting function to reload iframe with a timestamp in the URL
function addNoCacheToIFrame(iframe) {
  if (iframe) {
    let src = iframe.src;
    if (!src.includes("?")) {
      iframe.src = src + "?t=" + new Date().getTime(); // Add timestamp to bypass cache
    } else {
      iframe.src = src + "&t=" + new Date().getTime();
    }
    console.log("Cache-busting added to iframe:", iframe.src);
  } else {
    console.log("No iframe detected for cache-busting.");
  }
}

// Ensure event listener is added freshly to avoid issues with cached listeners
window.removeEventListener("message", stackleLTIResizer);
window.addEventListener("message", stackleLTIResizer, false);

console.log("Event listener for message added successfully");
