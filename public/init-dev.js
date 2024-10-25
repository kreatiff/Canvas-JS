(() => {
function detectStackleIframe(message) {
  let allIFrames = Array.from(document.querySelectorAll("iframe"));
  
  allIFrames.forEach(iframe => {
    if (iframe.classList.contains('stackle-mini')) {
      console.log("Found stackle-mini class!");
      iframe.contentWindow.postMessage("applyMiniCSS", "*");
    }
    if (!iframe.contentWindow) {
      // If iframe isn't ready, wait for it to load
      iframe.addEventListener('load', () => {
        if (iframe.classList.contains('stackle-mini')) {
          console.log("Found stackle-mini class!");
          iframe.contentWindow.postMessage("applyMiniCSS", "*");
        }
      });
    } else {
      // If iframe is already loaded, process it immediately
      if (iframe.classList.contains('stackle-mini')) {
        console.log("Found stackle-mini class!");
        iframe.contentWindow.postMessage("applyMiniCSS", "*");
      }
    }
  });

  return allIFrames.find((iframe) => iframe.contentWindow == message.source);
}

function stackleLTIResizer(event) {
  if ((event.origin.includes("stackle.app") || 
      event.origin.includes("stackle.test")) &&
      event.data == "Stackle iFrame Loaded"
  ) {
    currentIframe = detectStackleIframe(event);
    currentIframe.classList.add("stackle_iframe");
    document.body.classList.add("stackle_inside");
    console.log('Stackle embed resized successfully');

    // Remove the event listener after it's fired
    window.removeEventListener("message", stackleLTIResizer, false);
  }
}

// Add the event listener
window.addEventListener("message", stackleLTIResizer, false);
})();